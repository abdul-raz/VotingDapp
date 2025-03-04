# backend/app/routes/face_recognition.py

from fastapi import APIRouter, HTTPException
from backend.app.ml_models.face_recognition import process_face_recognition
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/face-recognition")
async def face_recognition(image: str):
    try:
        message = process_face_recognition(image)
        return JSONResponse(content={"message": message})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
