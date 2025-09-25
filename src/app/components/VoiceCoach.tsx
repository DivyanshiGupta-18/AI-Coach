"use client";
import { useState, useRef } from "react";

export default function VoiceCoach() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiTips, setAiTips] = useState("");
  const [loading, setLoading] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  async function toggleRecording() {
    if (!isRecording) {
      try {
        setTranscript("");
        setAiTips("");
        // Start recording
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => chunks.current.push(e.data);
        recorder.onstop = async () => {
          const blob = new Blob(chunks.current, { type: "audio/wav" });
          chunks.current = [];
          const base64 = await toBase64(blob);
          
          setLoading(true);
          
          try {
            // Send audio to Gemini API for transcription
            const response = await fetch(
              "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-goog-api-key": "AIzaSyAC3TovZwqUEW9lrvYuXLBjIiZY2sqXBpE",
                },
                body: JSON.stringify({
                  contents: [
                    {
                      parts: [
                        {
                          inline_data: {
                            mime_type: "audio/wav",
                            data: base64,
                          },
                        },
                        {
                          text: "Transcribe the audio and provide speaking tips to improve clarity, pronunciation, and pacing.",
                        },
                      ],
                    },
                  ],
                }),
              }
            );

            const data = await response.json();
            
            if (data.candidates && data.candidates.length > 0) {
              const content = data.candidates[0].content;
              if (content.parts && content.parts.length > 0) {
                const text = content.parts[0].text;
                
                // Try to separate transcript and tips
                const parts = text.split(/\n\n|\n/);
                if (parts.length > 1) {
                  setTranscript(parts[0]);
                  setAiTips(parts.slice(1).join("\n\n"));
                } else {
                  setTranscript(text);
                  setAiTips("Great job! Keep practicing to improve your speaking skills.");
                }
              }
            } else {
              setTranscript("No transcript found");
              setAiTips("Please try recording again with clearer audio.");
            }
          } catch (error) {
            console.error("Error processing audio:", error);
            setTranscript("Error processing audio");
            setAiTips("Please check your internet connection and try again.");
          } finally {
            setLoading(false);
          }
        };
        recorder.start();
        mediaRecorder.current = recorder;
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        setTranscript("Microphone access denied");
        setAiTips("Please allow microphone access to use this feature.");
      }
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
          disabled={loading}
          className={`px-8 py-3 rounded-full font-semibold shadow-md transition-all text-lg ${
            isRecording
              ? "bg-gradient-to-r from-rose-400 to-cyan-400 text-white animate-pulse"
              : loading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-white bg-opacity-90 text-cyan-500 hover:bg-cyan-400 hover:text-white"
          }`}
        >
          {isRecording ? "Stop Recording" : loading ? "Processing..." : "Start Recording"}
        </button>
        
        <div className="w-full min-h-[70px] bg-black/60 border border-cyan-400/30 rounded-xl p-4 text-lg text-cyan-100 font-mono my-2">
          {transcript || "Your live transcript will appear here..."}
        </div>
        
        {aiTips && (
          <div className="w-full bg-black/60 border border-pink-400/30 rounded-xl p-4 text-lg text-pink-100 my-2">
            <h3 className="text-xl font-bold text-pink-300 mb-2">💡 AI Speaking Tips</h3>
            <p className="whitespace-pre-line">{aiTips}</p>
          </div>
        )}
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
