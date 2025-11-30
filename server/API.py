from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
from sklearn.metrics.pairwise import cosine_similarity
import random
import uvicorn
import base64
import requests
from typing import Optional
import os
import json
import re
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

app = FastAPI()

# ---------------------- CORS CONFIG ----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # you can replace "*" with specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ----------------------------------------------------------

load_dotenv()

# Load data and scaler
data = joblib.load("models/data.pkl")
scaler = joblib.load("models/scaler.pkl")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")  # put your key here
GEMINI_URL = (
    f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
)

# Features
num_features = ['Age', 'Height', 'Weight', 'BMI']
full_features = ['Sex', 'Age', 'Height', 'Weight', 'Hypertension', 'Diabetes',
                 'BMI', 'Level', 'Fitness Goal', 'Fitness Type']

class UserInput(BaseModel):
    Sex: int
    Age: float
    Height: float
    Weight: float
    Hypertension: int
    Diabetes: int
    BMI: float
    Level: int
    Fitness_Goal: int
    Fitness_Type: int

@app.get("/")
def home_route():
    return {"message": "API is Running!"}

@app.post("/recommend/")
def recommend(user: UserInput):
    input_dict = {
        'Sex': user.Sex,
        'Age': user.Age,
        'Height': user.Height,
        'Weight': user.Weight,
        'Hypertension': user.Hypertension,
        'Diabetes': user.Diabetes,
        'BMI': user.BMI,
        'Level': user.Level,
        'Fitness Goal': user.Fitness_Goal,
        'Fitness Type': user.Fitness_Type
    }

    user_df = pd.DataFrame([input_dict])
    user_df[num_features] = scaler.transform(user_df[num_features])
    user_input_scaled = user_df[full_features]

    similarity_scores = cosine_similarity(data[full_features], user_input_scaled).flatten()
    top_indices = similarity_scores.argsort()[-5:][::-1]
    similar_users = data.iloc[top_indices]

    recommendation_1 = similar_users[['Exercises', 'Diet', 'Equipment']].mode().iloc[0]

    recommendations = [recommendation_1]
    for _ in range(2):
        mod_input = input_dict.copy()
        mod_input['Age'] += random.randint(-5, 5)
        mod_input['Weight'] += random.uniform(-5, 5)
        mod_input['BMI'] += random.uniform(-1, 1)

        mod_df = pd.DataFrame([mod_input])
        mod_df[num_features] = scaler.transform(mod_df[num_features])
        mod_scaled = mod_df[full_features]

        mod_scores = cosine_similarity(data[full_features], mod_scaled).flatten()
        mod_indices = mod_scores.argsort()[-5:][::-1]
        mod_users = data.iloc[mod_indices]

        rec = mod_users[['Exercises', 'Diet', 'Equipment']].mode().iloc[0]

        if not any(
            rec['Exercises'] == r['Exercises'] and
            rec['Diet'] == r['Diet'] and
            rec['Equipment'] == r['Equipment']
            for r in recommendations
        ):
            recommendations.append(rec)

    return {
        "recommendations": [
            {
                "Exercises": rec['Exercises'],
                "Equipment": rec['Equipment'],
                "Diet": rec['Diet']
            }
            for rec in recommendations
        ]
    }

@app.post("/analyze/cloud")
async def analyze_cloud(request: Request):
    try:
        body = await request.json()
        image_base64 = body.get("image")

        if not image_base64:
            return JSONResponse(status_code=400, content={"error": "Missing base64 image data"})

        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": (
                                "Identify the recipe name, list the ingredients used to make this recipe, "
                                "and estimate the nutrition facts for the dish shown in this image. "
                                "Nutrition facts must include: calories (kcal), protein (g), fat (g), "
                                "carbs (g), fiber (g), sugar (g), sodium (mg), and cholesterol (mg). "
                                "Respond ONLY in the following JSON format with no explanation:\n\n"
                                "{\n"
                                "  \"recipe\": \"string\",\n"
                                "  \"ingredients\": [\"string\", \"string\", ...],\n"
                                "  \"nutrition\": {\n"
                                "    \"calories\": number,\n"
                                "    \"protein\": number,\n"
                                "    \"fat\": number,\n"
                                "    \"carbs\": number,\n"
                                "    \"fiber\": number,\n"
                                "    \"sugar\": number,\n"
                                "    \"sodium\": number,\n"
                                "    \"cholesterol\": number\n"
                                "  }\n"
                                "}\n"
                            )
                        },
                        {
                            "inline_data": {
                                "mime_type": "image/jpeg",
                                "data": image_base64
                            }
                        }
                    ]
                }
            ]
        }

        response = requests.post(GEMINI_URL, json=payload)
        if not response.ok:
            return JSONResponse(
                status_code=response.status_code,
                content={"error": response.text}
            )

        result = response.json()
        raw_text = result["candidates"][0]["content"]["parts"][0]["text"].strip()

        # Clean the text: remove markdown/code fences if present
        raw_text = re.sub(r"```(?:json)?\s*", "", raw_text)
        raw_text = raw_text.replace("```", "")

        # Extract JSON object from the text
        match = re.search(r"\{.*\}", raw_text, re.DOTALL)
        if not match:
            return JSONResponse(status_code=500, content={"error": "No JSON found in model response", "raw": raw_text})

        clean_json = match.group(0)

        return JSONResponse(content=json.loads(clean_json))

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


@app.post("/analyze/ollama")
async def analyze_image(request: Request):
    try:
        data = await request.json()
        image_base64 = data.get("image")

        if not image_base64:
            return JSONResponse(status_code=400, content={"error": "Missing base64 image data"})

        try:
            contents = base64.b64decode(image_base64)
        except Exception as decode_err:
            return JSONResponse(status_code=400, content={"error": "Invalid base64 image", "details": str(decode_err)})

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llava",
                "prompt": (
                    "Identify the recipe name and list the ingredients that would be used to make this recipe and their approximate nutrition facts "
                    "(calories(kcal), protein(g), fat(g), carbs(g), fiber(g), sugar(g), sodium(mg), cholesterol(mg)) for the dish shown in this image. "
                    "Respond ONLY in JSON.\n"
                ),
                "images": [image_base64],
                "stream": False,
            }
        )

        if response.ok:
            raw = response.json().get("response", "")
            match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", raw, re.DOTALL)

            if match:
                clean_json = match.group(1)
                return JSONResponse(content=json.loads(clean_json))
            else:
                try:
                    return JSONResponse(content=json.loads(raw))
                except:
                    return JSONResponse(status_code=500, content={"error": "Model response invalid", "raw": raw})
        else:
            return JSONResponse(status_code=response.status_code, content={"error": response.text})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.post("/ai/workout-plan")
async def ai_workout_plan(request: Request):
    """
    Generate a 3-day detailed workout plan in JSON format using Gemini API.
    Each day has morning, afternoon, evening slots with focus, summary, duration,
    intensity, calories, and exercises.
    """
    try:
        body = await request.json()
        workoutRecommendation = body.get("workoutRecommendation")
        if not workoutRecommendation:
            return JSONResponse(status_code=400, content={"error": "Missing workoutRecommendation"})

        # ---------------------- Gemini Prompt ----------------------
        llm_prompt = f"""
You are a professional fitness coach. Based on this user recommended exercises: "{workoutRecommendation}",
generate a 3-day workout plan for a beginner-to-intermediate user.

Each day should have:
- day: "Day 1", "Day 2", "Day 3"
- focus: one line
- summary: one line
- morning, afternoon, evening slots:
    - summary
    - focus
    - duration (minutes, e.g., "20 minutes")
    - intensity ("Light", "Moderate", "High")
    - calories (approximate)
    - exercises (array of exercise names) should not be empty for any entry

Return ONLY JSON with the following structure (no explanations):

{{
  "days": [
    {{
      "day": "Day 1",
      "focus": "...",
      "summary": "...",
      "morning": {{ ... }},
      "afternoon": {{ ... }},
      "evening": {{ ... }}
    }},
    ...
  ]
}}
        """

        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": llm_prompt}
                    ]
                }
            ]
        }

        # ---------------------- Call Gemini ----------------------
        response = requests.post(GEMINI_URL, json=payload)
        if not response.ok:
            return JSONResponse(status_code=response.status_code, content={"error": response.text})

        result = response.json()
        raw_text = result["candidates"][0]["content"]["parts"][0]["text"].strip()

        # ---------------------- Clean JSON ----------------------
        raw_text = re.sub(r"```(?:json)?\s*", "", raw_text)
        raw_text = raw_text.replace("```", "")
        match = re.search(r"\{.*\}", raw_text, re.DOTALL)
        if not match:
            return JSONResponse(status_code=500, content={"error": "No JSON found in model response", "raw": raw_text})

        clean_json = match.group(0)
        plan = json.loads(clean_json)
        return JSONResponse(content=plan)

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

if __name__ == "__main__":
    uvicorn.run("API:app", host="0.0.0.0", port=8080, reload=True)
