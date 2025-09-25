"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

// export default function DailyChallenges() {
  export default function DailyChallenges({ navigate }: { navigate: (path: string) => void }) {
  const router = useRouter();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [scores, setScores] = useState<number[]>(Array(5).fill(0));
  const [feedback, setFeedback] = useState<string[]>(Array(5).fill(""));
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const dailyChallenges = [
    {
      title: "30-Second Rebuttal",
      description: "Argue against this statement: 'Social media does more harm than good.'",
      tips: "Focus on clear arguments, avoid filler words, and maintain a confident tone."
    },
    {
      title: "Perfect Pitch Presentation",
      description: "Sell a fictional product called 'EcoWater' - a smart water bottle in 30 seconds.",
      tips: "Emphasize key benefits, use persuasive language, and maintain enthusiastic energy."
    },
    {
      title: "Impromptu Storytelling",
      description: "Tell a compelling story that includes these words: 'mountain', 'key', and 'secret'.",
      tips: "Structure with beginning, middle, end; use descriptive language; vary your tone."
    },
    {
      title: "Technical Explanation",
      description: "Explain blockchain technology to a 10-year-old in simple terms in 30 seconds.",
      tips: "Use analogies, avoid jargon, check for understanding with simple language."
    },
    {
      title: "Motivational Speech",
      description: "Deliver a 30-second pep talk to someone who just failed at something important.",
      tips: "Show empathy, offer encouragement, end with an inspiring call to action."
    }
  ];

  async function toggleRecording() {
    if (!isRecording) {
      try {
        setTranscript("");
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
            // Send audio to Gemini API for analysis
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
                          text: `Analyze this speech for the challenge: "${dailyChallenges[currentChallenge].description}". 
                          Provide:
                          1. A transcript of what was said
                          2. A score out of 10 based on clarity, pacing, filler words, and relevance to the challenge
                          3. Specific feedback on what was done well and what could be improved
                          4. 2-3 concrete suggestions for improvement
                          Format your response as JSON with keys: transcript, score, feedback, suggestions`
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
                
                try {
                  // Try to parse JSON response
                  const jsonMatch = text.match(/\{[\s\S]*\}/);
                  if (jsonMatch) {
                    const result = JSON.parse(jsonMatch[0]);
                    setTranscript(result.transcript || "Transcription not available");
                    
                    // Update scores and feedback
                    const newScores = [...scores];
                    newScores[currentChallenge] = result.score || 0;
                    setScores(newScores);
                    
                    const newFeedback = [...feedback];
                    newFeedback[currentChallenge] = `${result.feedback}\n\nSuggestions: ${result.suggestions}`;
                    setFeedback(newFeedback);
                  } else {
                    // Fallback if JSON parsing fails
                    setTranscript("Transcription available but analysis incomplete");
                    const newScores = [...scores];
                    newScores[currentChallenge] = 5; // Default score
                    setScores(newScores);
                    
                    const newFeedback = [...feedback];
                    newFeedback[currentChallenge] = "Analysis incomplete. Please try again.";
                    setFeedback(newFeedback);
                  }
                } catch (e) {
                  console.error("Error parsing response:", e);
                  setTranscript("Error processing response");
                }
              }
            }
          } catch (error) {
            console.error("Error processing audio:", error);
            setTranscript("Error processing audio");
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
      }
    } else {
      // Stop recording
      mediaRecorder.current?.stop();
      setIsRecording(false);
    }
  }

   function goBack() {
    router.push("/");
  }

  function nextChallenge() {
    if (currentChallenge < dailyChallenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setTranscript("");
    } else {
      setCompleted(true);
    }
  }

  function resetChallenges() {
    setCurrentChallenge(0);
    setScores(Array(5).fill(0));
    setFeedback(Array(5).fill(""));
    setTranscript("");
    setCompleted(false);
  }

  function calculateTotalScore() {
    return scores.reduce((total, score) => total + score, 0);
  }

  // Add this function to the DailyChallenges component
function savePerformanceData() {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
  const performanceEntry = {
    date: today,
    totalScore: calculateTotalScore(),
    averageScore: calculateTotalScore() / 5,
    challenges: dailyChallenges.map((challenge, index) => ({
      challengeTitle: challenge.title,
      score: scores[index],
      feedback: feedback[index]
    }))
  };

  // Get existing data
  const existingData = JSON.parse(localStorage.getItem('performanceData') || '[]');
  
  // Check if we already have data for today
  const todayIndex = existingData.findIndex((entry: any) => entry.date === today);
  
  if (todayIndex !== -1) {
    // Update today's data
    existingData[todayIndex] = performanceEntry;
  } else {
    // Add new data
    existingData.push(performanceEntry);
  }
  
  // Save back to localStorage
  localStorage.setItem('performanceData', JSON.stringify(existingData));
}

// Call this function when challenges are completed
function nextChallenge() {
  if (currentChallenge < dailyChallenges.length - 1) {
    setCurrentChallenge(currentChallenge + 1);
    setTranscript("");
  } else {
    // Save performance data when all challenges are completed
    savePerformanceData();
    setCompleted(true);
  }
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#16213e] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={goBack}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </button>
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4">
            Daily Speaking Challenges
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Complete 5 daily speaking challenges to improve your communication skills. 
            Each challenge is scored out of 10 with personalized feedback.
          </p>
        </header>

        {!completed ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cyan-300">
                Challenge {currentChallenge + 1} of {dailyChallenges.length}
              </h2>
              <div className="text-lg font-semibold text-pink-400">
                Score: {scores[currentChallenge]}/10
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">
                {dailyChallenges[currentChallenge].title}
              </h3>
              <p className="text-lg text-white/90 mb-4">
                {dailyChallenges[currentChallenge].description}
              </p>
              <div className="bg-cyan-900/30 border-l-4 border-cyan-400 p-4 rounded">
                <p className="text-cyan-200">
                  <span className="font-bold">Tip:</span> {dailyChallenges[currentChallenge].tips}
                </p>
              </div>
            </div>

            <div className="flex justify-center mb-8">
              <button
                onClick={toggleRecording}
                disabled={loading}
                className={`px-8 py-4 rounded-full font-semibold shadow-md transition-all text-lg ${
                  isRecording
                    ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white animate-pulse"
                    : loading
                    ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
                }`}
              >
                {isRecording ? "Stop Recording" : loading ? "Processing..." : "Start Recording"}
              </button>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-2">Your Response:</h3>
              <div className="bg-black/60 border border-cyan-400/30 rounded-xl p-4 min-h-[120px] text-cyan-100">
                {transcript || "Your transcript will appear here after recording..."}
              </div>
            </div>

            {feedback[currentChallenge] && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-2">Feedback:</h3>
                <div className="bg-black/60 border border-pink-400/30 rounded-xl p-4 text-pink-100 whitespace-pre-line">
                  {feedback[currentChallenge]}
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={nextChallenge}
                disabled={!feedback[currentChallenge]}
                className={`px-6 py-3 rounded-lg font-semibold ${
                  feedback[currentChallenge]
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                }`}
              >
                {currentChallenge < dailyChallenges.length - 1 ? "Next Challenge" : "See Results"}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
            <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-8">
              Your Daily Challenge Results
            </h2>
            
            <div className="mb-8 text-center">
              <div className="text-5xl font-bold text-white mb-2">
                {calculateTotalScore()}/50
              </div>
              <div className="text-xl text-white/80">Total Score</div>
            </div>

            <div className="space-y-6 mb-10">
              {dailyChallenges.map((challenge, index) => (
                <div key={index} className="bg-black/40 rounded-xl p-5 border border-white/10">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">
                      {index + 1}. {challenge.title}
                    </h3>
                    <div className="text-2xl font-bold text-cyan-400">
                      {scores[index]}/10
                    </div>
                  </div>
                  <p className="text-white/80 mb-3">{challenge.description}</p>
                  <div className="text-pink-200 whitespace-pre-line">
                    {feedback[index]}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={resetChallenges}
                className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
              >
                Try Again Tomorrow
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
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