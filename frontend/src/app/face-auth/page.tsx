// src/app/face-auth/page.tsx
import WebcamCapture from "@/components/WebcamCapture";

export default function FaceAuth() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <WebcamCapture />
    </div>
  );
}
