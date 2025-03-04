# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routes.face_recognition import router as face_recognition_router

app = FastAPI()

# Add CORS middleware to allow frontend to interact with the backend
origins = [
    "http://localhost:3000",  # Allowing frontend on port 3000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the face recognition route
app.include_router(face_recognition_router)
