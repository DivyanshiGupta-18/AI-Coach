"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ChallengeScore {
  date: string;
  challengeTitle: string;
  score: number;
  feedback: string;
}

interface PerformanceData {
  date: string;
  totalScore: number;
  averageScore: number;
  challenges: ChallengeScore[];
}

export default function PerformanceAnalytics({ navigate }: { navigate: (path: string) => void }) {
  const router = useRouter();
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load performance data from localStorage
    const savedData = localStorage.getItem('performanceData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setPerformanceData(parsedData);
      } catch (error) {
        console.error('Error parsing performance data:', error);
      }
    }
    setLoading(false);
  }, []);

  // Calculate statistics
  const calculateStats = () => {
    if (performanceData.length === 0) return null;
    
    const totalSessions = performanceData.length;
    const allScores = performanceData.flatMap(day => day.challenges.map(c => c.score));
    const highestScore = Math.max(...allScores);
    const lowestScore = Math.min(...allScores);
    const averageScore = allScores.reduce((sum, score) => sum + score, 0) / allScores.length;
    
    // Calculate improvement trend
    const firstDay = performanceData[0].averageScore;
    const lastDay = performanceData[performanceData.length - 1].averageScore;
    const improvement = lastDay - firstDay;
    
    return {
      totalSessions,
      highestScore,
      lowestScore,
      averageScore: parseFloat(averageScore.toFixed(1)),
      improvement: parseFloat(improvement.toFixed(1))
    };
  };

  const stats = calculateStats();

  // Prepare chart data
  const chartData = performanceData.map(day => ({
    date: day.date,
    totalScore: day.totalScore,
    averageScore: day.averageScore
  }));

  // Prepare challenge type data for bar chart
  const challengeTypes = [
    '30-Second Rebuttal',
    'Perfect Pitch Presentation',
    'Impromptu Storytelling',
    'Technical Explanation',
    'Motivational Speech'
  ];

  const challengeTypeData = challengeTypes.map(type => {
    const scores = performanceData
      .flatMap(day => day.challenges)
      .filter(challenge => challenge.challengeTitle === type)
      .map(challenge => challenge.score);
    
    const average = scores.length > 0 
      ? scores.reduce((sum, score) => sum + score, 0) / scores.length 
      : 0;
    
    return {
      name: type,
      average: parseFloat(average.toFixed(1))
    };
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#16213e] flex items-center justify-center">
        <div className="text-white text-xl">Loading performance data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#16213e] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </button>

        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4">
            Performance Analytics
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Track your improvement over time with detailed metrics and predictive scoring
          </p>
        </header>

        {performanceData.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-6">📊</div>
            <h2 className="text-2xl font-bold text-white mb-4">No Performance Data Yet</h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Complete your daily challenges to start tracking your speaking progress and see detailed analytics.
            </p>
            <button 
              onClick={() => router.push('/daily-challenges')}
              className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
            ><a href='/daily-challenges'>
              Start Daily Challenges
              </a>
            </button>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-3xl font-bold text-cyan-400">{stats.totalSessions}</div>
                  <div className="text-white/80 text-sm">Sessions</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-3xl font-bold text-green-400">{stats.averageScore}/10</div>
                  <div className="text-white/80 text-sm">Avg. Score</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-3xl font-bold text-yellow-400">{stats.highestScore}/10</div>
                  <div className="text-white/80 text-sm">Highest</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-3xl font-bold text-pink-400">{stats.lowestScore}/10</div>
                  <div className="text-white/80 text-sm">Lowest</div>
                </div>
                <div className={`bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center ${stats.improvement >= 0 ? 'border-green-400/30' : 'border-red-400/30'}`}>
                  <div className={`text-3xl font-bold ${stats.improvement >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stats.improvement >= 0 ? '+' : ''}{stats.improvement}
                  </div>
                  <div className="text-white/80 text-sm">Improvement</div>
                </div>
              </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
                <h2 className="text-2xl font-bold text-cyan-300 mb-4">Score Progression</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" domain={[0, 50]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)' }}
                        itemStyle={{ color: 'white' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="totalScore" stroke="#22d3ee" strokeWidth={2} activeDot={{ r: 8 }} name="Total Score" />
                      <Line type="monotone" dataKey="averageScore" stroke="#f472b6" strokeWidth={2} name="Average Score" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
                <h2 className="text-2xl font-bold text-pink-300 mb-4">Challenge Performance</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={challengeTypeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" domain={[0, 10]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)' }}
                        itemStyle={{ color: 'white' }}
                      />
                      <Legend />
                      <Bar dataKey="average" fill="#f472b6" name="Average Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Performance History */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-12">
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">Performance History</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Total Score</th>
                      <th className="py-3 px-4 text-left">Average</th>
                      <th className="py-3 px-4 text-left">30-Second Rebuttal</th>
                      <th className="py-3 px-4 text-left">Perfect Pitch</th>
                      <th className="py-3 px-4 text-left">Storytelling</th>
                      <th className="py-3 px-4 text-left">Technical</th>
                      <th className="py-3 px-4 text-left">Motivational</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.map((day, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-3 px-4">{day.date}</td>
                        <td className="py-3 px-4 font-bold">{day.totalScore}/50</td>
                        <td className="py-3 px-4">{day.averageScore.toFixed(1)}/10</td>
                        {day.challenges.map((challenge, idx) => (
                          <td key={idx} className="py-3 px-4">{challenge.score}/10</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
              <h2 className="text-2xl font-bold text-pink-300 mb-4">AI Recommendations</h2>
              <div className="space-y-4">
                <div className="bg-black/40 p-4 rounded-lg border-l-4 border-cyan-400">
                  <h3 className="font-bold text-cyan-300 mb-2">Focus Area</h3>
                  <p className="text-white/80">
                    Based on your performance, we recommend focusing on improving your "Technical Explanation" skills, 
                    which shows the most room for improvement.
                  </p>
                </div>
                <div className="bg-black/40 p-4 rounded-lg border-l-4 border-green-400">
                  <h3 className="font-bold text-green-300 mb-2">Strength</h3>
                  <p className="text-white/80">
                    Your "Motivational Speech" skills are consistently strong. Consider leveraging this strength 
                    in other challenge types.
                  </p>
                </div>
                <div className="bg-black/40 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h3 className="font-bold text-yellow-300 mb-2">Practice Schedule</h3>
                  <p className="text-white/80">
                    To maintain your improvement trajectory, aim to complete daily challenges at least 4 times per week.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}