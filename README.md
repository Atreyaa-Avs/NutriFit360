# NutriFit360

An AI-powered Diet and Fitness mobile application to help users stay healthy, track their nutrition, and reach their fitness goals.

---

## Project Structure

```
NutriFit360/
├── client/       # React Native app (Expo)
├── server/       # FastAPI backend
├── .gitignore
└── README.md
```

---

## Features

### Mobile App (client)
- Personalized diet tracking
- Fitness activity logging
- Daily nutrition and calorie summary
- Clean and intuitive UI

### Backend API (server)
- User authentication
- Diet & workout recommendation APIs
- Data storage and retrieval (e.g., meals, progress)
- AI integrations for smart suggestions (optional)

---

## 🛠️ Tech Stack

| Layer    | Technology        |
|----------|-------------------|
| Frontend | React Native (Expo) |
| Backend  | FastAPI (Python)  |
| Database | SQLite / PostgreSQL (planned) |
| Hosting  | Local / Cloud Deployment Ready |

---

## How to Run Locally

### 🔹 Client (React Native)
```bash
cd client
npm install
npx expo start
```

### 🔹 Server (FastAPI)
```bash
cd server
python -m venv venv
source venv/bin/activate  # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
uvicorn main:app --reload
```
---

## 👨‍💻 Author

**Avs Atreyaa**  
Feel free to fork, contribute, or give feedback!
