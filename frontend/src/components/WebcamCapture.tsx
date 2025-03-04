"use client";

import { useRef, useState, useCallback } from "react";
import Webcam, { WebcamProps } from "react-webcam"; // Import the correct types
import axios from "axios";

const WebcamCapture = () => {
  const webcamRef = useRef<Webcam | null>(null); // Explicitly typing the ref
  const [capturing, setCapturing] = useState(false);
  const [message, setMessage] = useState("");

  // Capture an image and send it to the backend
  const capture = useCallback(async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setCapturing(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/face-recognition", {
        image: imageSrc,
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error sending image:", error);
      setMessage("Recognition failed.");
    }

    setCapturing(false);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Facial Recognition</h2>
      <Webcam
        audio={false} // Disable audio capture
        ref={webcamRef}
        screenshotFormat="image/jpeg" // Correct usage of screenshot format
        className="border rounded-lg"
        videoConstraints={{
          facingMode: "user", // Default to front camera
        }}
      />
      <button
        onClick={capture}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        disabled={capturing}
      >
        {capturing ? "Processing..." : "Capture & Verify"}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default WebcamCapture;
