from fastapi import APIRouter
from app.services.fraud_model import predict_fraud

router = APIRouter(prefix="/fraud", tags=["Fraud Detection"])

@router.post("/detect")
def detect_fraud(vote_data: dict):
    prediction = predict_fraud(vote_data)
    return {"fraud_score": prediction, "message": "Fraud likelihood calculated"}
