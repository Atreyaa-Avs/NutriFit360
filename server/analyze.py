import base64
import requests

with open("image.jpg", "rb") as image_file:
    image_bytes = image_file.read()
    image_base64 = base64.b64encode(image_bytes).decode("utf-8")


response = requests.post(
    "http://localhost:11434/api/generate",
    json={
        "model": "llava",
        "prompt": "List the ingredients and provide approximate nutrition facts (calories, protein, carbs, fat, fiber) for the dish shown in this image. IN JSON format give only the numerical vals with their titles in an object. No other TEXT is required.",
        "images": [image_base64],
        "stream": False,
    },
)

# Print the result
if response.ok:
    result = response.json()
    print(result.get("response", "No 'response' key found."))
else:
    print(f"Error {response.status_code}: {response.text}")
