import { useState, useRef, useEffect, useCallback } from "react";
import { speechToTextApi } from "../services/api";
import { toast } from "react-toastify";

export const useVoice = (onTranscriptionComplete) => {
  // --- STATE MANAGEMENT ---
  const [isRecording, setIsRecording] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingTimeoutRef = useRef(null);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  // --- CORE RECORDING LOGIC ---
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      clearTimeout(recordingTimeoutRef.current);
    }
  }, []);

  const startRecording = useCallback(async () => {
    if (isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      audioChunksRef.current = []; // Clear previous audio chunks

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((track) => track.stop()); // Stop mic access
        setIsRecording(false);
        
        try {
          if (audioBlob.size < 1000) { // Don't send if too small
             toast.error("No speech detected.");
             return;
          }
          toast.info("Transcribing your voice...");
          const res = await speechToTextApi(audioBlob);
          if (res.data.text) {
            onTranscriptionComplete(res.data.text);
          } else {
            toast.error("Could not transcribe audio.");
          }
        } catch (error) {
          console.error("Speech-to-text error:", error);
          toast.error("Failed to convert speech to text.");
        }
      };
      
      recorder.start();
      
      // Automatically stop recording after 30 seconds
      recordingTimeoutRef.current = setTimeout(stopRecording, 30000);

    } catch (error) {
      console.error("Microphone access denied:", error);
      toast.error("Microphone access is required for voice input.");
      setIsRecording(false);
    }
  }, [isRecording, onTranscriptionComplete, stopRecording]);


  // --- EVENT HANDLERS FOR UI ---
  const handleMicClick = () => {
    if (!isMobile) {
      isRecording ? stopRecording() : startRecording();
    }
  };
  const handleMicTouchStart = () => isMobile && startRecording();
  const handleMicTouchEnd = () => isMobile && stopRecording();


  // --- CLEANUP EFFECT ---
  useEffect(() => {
    // Ensure recording is stopped and resources are released on unmount
    return () => {
      clearTimeout(recordingTimeoutRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // --- RETURN VALUE ---
  return {
    isRecording,
    isMobile,
    startRecording,
    stopRecording,
    handleMicClick,
    handleMicTouchStart,
    handleMicTouchEnd,
  };
};