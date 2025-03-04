import numpy as np
import pickle

# Load a pre-trained ML model (replace with your own)
# You can train a model using scikit-learn and save it as fraud_model.pkl
MODEL_PATH = "app/ml_models/fraud_model.pkl"

def load_model():
    with open(MODEL_PATH, "rb") as f:
        return pickle.load(f)

model = load_model()

def predict_fraud(vote_data):
    """Takes voting data and returns a fraud score (0-1)."""
    # Example input processing
    features = np.array([vote_data["vote_time"], vote_data["location"], vote_data["voter_history"]]).reshape(1, -1)
    
    fraud_score = model.predict_proba(features)[0][1]  # Probability of fraud
    return round(fraud_score, 2)
