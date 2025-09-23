"use client";
import { useState } from "react";

export default function VoiceCoach() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [tips, setTips] = useState([
    // Example tips - replace with real AI feedback
    "Start speaking to see live feedback.",
  ]);
  // --- Place microphone logic & server connection here ---

  function toggleRecording() {
    // Connect/disconnect mic and streaming logic here
    setIsRecording(v => !v);
    setTips([
      isRecording
        ? "Recording stopped. See results below."
        : "Listening... You can start speaking!"
    ]);
    // For demo, resets transcript
    setTranscript(isRecording ? transcript : "");
  }

  return (
    <section className="w-full max-w-2xl mx-auto my-12 px-4 py-8 bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/20">
      <div className="flex flex-col items-center gap-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-cyan-300 mb-2 drop-shadow-[0_2px_4px_rgba(0,245,255,0.3)]">
          🗣️ AI Voice Coach
        </h2>
        <p className="text-base md:text-lg text-white/80 font-medium mb-4 text-center">
          Record your voice or practice live. Get instant AI-powered transcription and speaking tips.
        </p>

        {/* Recording controls */}
        <button
          onClick={toggleRecording}
          className={`px-8 py-3 rounded-full transition-all text-lg font-semibold shadow-md
            ${
              isRecording
                ? "bg-gradient-to-r from-rose-400 to-cyan-400 text-white animate-pulse"
                : "bg-white bg-opacity-90 text-cyan-500 hover:bg-cyan-400 hover:text-white"
            }`}
        >
          {isRecording ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500 animate-ping" />
              Stop Recording
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-cyan-400" />
              Start Recording
            </span>
          )}
        </button>

        {/* Live transcript area */}
        <div className="w-full min-h-[70px] bg-black/60 border border-cyan-400/30 rounded-xl p-4 text-lg text-cyan-100 font-mono my-2">
          {transcript
            ? transcript
            : "Your live transcript will appear here..."}
        </div>

        {/* AI Feedback / Coaching Tips */}
        <div className="w-full rounded-lg p-4 mt-2 bg-cyan-900/30 border-l-4 border-cyan-400 space-y-2">
          <h4 className="font-semibold text-cyan-200 mb-1">Live AI Tips:</h4>
          <ul className="ml-4 list-disc marker:text-cyan-400 space-y-1">
            {tips.map((tip, idx) => (
              <li key={idx} className="text-white/85">{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
