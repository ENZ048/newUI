import { useEffect, useState } from "react";

export default function useDevice() {
  const [isMobile, setIsMobile] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  return {
    isMobile, isRecording,
    toggleMic: () => setIsRecording((v) => !v),
    startMic: () => setIsRecording(true),
    stopMic: () => setIsRecording(false),
  };
}
