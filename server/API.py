from fastapi import FastAPI,Request
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

app = FastAPI()

# Load data and scaler
data = joblib.load("models/data.pkl")
scaler = joblib.load("models/scaler.pkl")

# Define features
num_features = ['Age', 'Height', 'Weight', 'BMI']
full_features = ['Sex', 'Age', 'Height', 'Weight', 'Hypertension', 'Diabetes',
                 'BMI', 'Level', 'Fitness Goal', 'Fitness Type']

# Request Body Schema
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
    return {"message":"API is Running!"}

@app.post("/recommend/")
def recommend(user: UserInput):
    # Step 1: Convert input to dict & normalize
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

    # Step 2: Cosine similarity
    similarity_scores = cosine_similarity(data[full_features], user_input_scaled).flatten()
    top_indices = similarity_scores.argsort()[-5:][::-1]
    similar_users = data.iloc[top_indices]
    recommendation_1 = similar_users[['Exercises', 'Diet', 'Equipment']].mode().iloc[0]

    # Step 3: Generate 2 simulated variations
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

    # Step 4: Return JSON
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

@app.post("/analyze/ollama")
async def analyze_image(request:Request):
    try:
        data = await request.json()
        image_base64 = data.get("image")

        if not image_base64:
            return JSONResponse(status_code=400, content={"error": "Missing base64 image data"})

        # Decode base64 to bytes
        try:
            contents = base64.b64decode(image_base64)
        except Exception as decode_err:
            return JSONResponse(status_code=400, content={"error": "Invalid base64 image", "details": str(decode_err)})

        # Send to Ollama
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llava",
                "prompt": (
                    "Identify the recipe name and list the ingredients that would be used to make this recipe and their approximate nutrition facts "
                    "(calories(kcal), protein(g), fat(g), carbs(g), fiber(g), sugar(g), sodium(mg), cholesterol(mg)) for the dish shown in this image. "
                    "Respond ONLY in the following JSON format:\n"
                    "{\n"
                    '  "recipe": "<dish name>",\n'
                    '  "ingredients": ["ingredient1", "ingredient2", "..."],\n'
                    '  "nutrition": {\n'
                    '    "calories": <number>,\n'
                    '    "protein": <number>,\n'
                    '    "carbs": <number>,\n'
                    '    "fat": <number>,\n'
                    '    "fiber": <number>,\n'
                    '    "sugar": <number>,\n'
                    '    "sodium": <number>,\n'
                    '    "cholesterol": <number>\n'
                    "  }\n"
                    "}\n"
                    "No other text or explanation is needed. Don't return the units."
                ),
                "images": [image_base64],
                "stream": False,
            }
        )

        if response.ok:
            raw = response.json().get("response", "")

            # Try to extract clean JSON inside triple backticks
            match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", raw, re.DOTALL)
            if match:
                clean_json = match.group(1)
                parsed = json.loads(clean_json)
                return parsed
            else:
                # fallback: raw json
                try:
                    return json.loads(raw)
                except:
                    return JSONResponse(status_code=500, content={"error": "Model response is not valid JSON", "raw": raw})
        else:
            return JSONResponse(status_code=response.status_code, content={"error": response.text})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


if __name__ == "__main__":
    uvicorn.run("API:app", host="0.0.0.0", port=8080, reload=True)