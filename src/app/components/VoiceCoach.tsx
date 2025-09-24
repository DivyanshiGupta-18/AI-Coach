"use client";
import { useState, useRef } from "react";

export default function VoiceCoach() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  async function toggleRecording() {
    if (!isRecording) {
      setTranscript("");
      // Start recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => chunks.current.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunks.current, { type: "audio/wav" });
        chunks.current = [];
        const base64 = await toBase64(blob);

        // Send audio to backend for transcription
        const res = await fetch("/api/transcribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ audioBase64: base64 }),
        });
        const data = await res.json();
        setTranscript(
          data.results?.[0]?.alternatives?.[0]?.transcript ||
            "No transcript found"
        );
      };
      recorder.start();
      mediaRecorder.current = recorder;
      setIsRecording(true);
    } else {
      // Stop recording
      mediaRecorder.current?.stop();
      setIsRecording(false);
    }
  }

  return (
    <section className="w-full max-w-2xl mx-auto my-12 px-4 py-8 bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/20">
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-cyan-300 mb-2">🗣️ AI Voice Coach</h2>
        <p className="text-base md:text-lg text-white/80 font-medium mb-4 text-center">
          Record your voice or practice live. Get instant AI-powered transcription and speaking tips.
        </p>
        <button
          onClick={toggleRecording}
          className={`px-8 py-3 rounded-full font-semibold shadow-md transition-all text-lg ${
            isRecording
              ? "bg-gradient-to-r from-rose-400 to-cyan-400 text-white animate-pulse"
              : "bg-white bg-opacity-90 text-cyan-500 hover:bg-cyan-400 hover:text-white"
          }`}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        <div className="w-full min-h-[70px] bg-black/60 border border-cyan-400/30 rounded-xl p-4 text-lg text-cyan-100 font-mono my-2">
          {transcript || "Your live transcript will appear here..."}
        </div>
        {/* AI tips section... */}
      </div>
    </section>
  );
}

async function toBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      resolve(dataUrl.split(",")[1] ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
