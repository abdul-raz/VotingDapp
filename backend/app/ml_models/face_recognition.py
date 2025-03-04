# backend/app/ml_models/face_recognition.py

import cv2
import numpy as np
from PIL import Image
import io
import base64

def process_face_recognition(image_base64: str):
    try:
        # Decode the base64 image
        image_data = base64.b64decode(image_base64.split(',')[1])
        image = Image.open(io.BytesIO(image_data))

        # Convert to OpenCV format (BGR)
        open_cv_image = np.array(image)
        open_cv_image = open_cv_image[:, :, ::-1].copy()  # Convert RGB to BGR

        # Convert to grayscale
        gray = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)

        # Load OpenCV's pre-trained face detector
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

        # Detect faces
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

        if len(faces) > 0:
            return "Face detected, verification successful!"
        else:
            return "No face detected, please try again."
    except Exception as e:
        raise Exception(f"Error in facial recognition: {str(e)}")
