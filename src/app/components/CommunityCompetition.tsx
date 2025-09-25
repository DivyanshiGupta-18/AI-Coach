"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  avatar: string;
  score: number;
  improvement: number;
  bets: number;
  friends: boolean;
}

interface Bet {
  id: string;
  title: string;
  description: string;
  prizePool: number;
  participants: number;
  timeLeft: string;
  joined: boolean;
}

export default function CommunityCompetition({ navigate }: { navigate: (path: string) => void }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'global' | 'friends'>('global');
  const [bets, setBets] = useState<Bet[]>([
    {
      id: '1',
      title: 'Weekly Improvement Challenge',
      description: 'Bet on improving your average score by 1 point this week',
      prizePool: 500,
      participants: 24,
      timeLeft: '2 days 14 hours',
      joined: true
    },
    {
      id: '2',
      title: 'Filler-Free Week',
      description: 'Go a full week without using any filler words in challenges',
      prizePool: 750,
      participants: 18,
      timeLeft: '5 days 3 hours',
      joined: false
    },
    {
      id: '3',
      title: 'Perfect Presentation',
      description: 'Score 10/10 on the Perfect Pitch Presentation challenge',
      prizePool: 1000,
      participants: 32,
      timeLeft: '1 day 8 hours',
      joined: false
    }
  ]);

  const globalLeaderboard: User[] = [
    { id: '1', name: 'Alex Johnson', avatar: 'AJ', score: 2450, improvement: 3.2, bets: 12, friends: false },
    { id: '2', name: 'Maria Garcia', avatar: 'MG', score: 2380, improvement: 2.8, bets: 9, friends: false },
    { id: '3', name: 'You', avatar: 'ME', score: 2290, improvement: 2.5, bets: 7, friends: true },
    { id: '4', name: 'David Kim', avatar: 'DK', score: 2150, improvement: 2.1, bets: 5, friends: true },
    { id: '5', name: 'Sarah Williams', avatar: 'SW', score: 2080, improvement: 1.9, bets: 8, friends: false },
    { id: '6', name: 'James Wilson', avatar: 'JW', score: 1950, improvement: 1.7, bets: 6, friends: true },
    { id: '7', name: 'Emma Thompson', avatar: 'ET', score: 1890, improvement: 1.5, bets: 4, friends: false },
    { id: '8', name: 'Michael Brown', avatar: 'MB', score: 1820, improvement: 1.3, bets: 3, friends: true }
  ];

  const friendsLeaderboard = globalLeaderboard.filter(user => user.friends);

  const toggleBetJoin = (id: string) => {
    setBets(bets.map(bet => 
      bet.id === id ? { ...bet, joined: !bet.joined } : bet
    ));
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500 to-yellow-300';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400 to-gray-200';
    if (rank === 3) return 'bg-gradient-to-r from-amber-700 to-amber-500';
    return 'bg-gray-700';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

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
            Community Competition
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Compete with friends, bet on improvements, and climb the global leaderboard
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leaderboard Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-cyan-300">Leaderboard</h2>
                <div className="flex bg-black/30 rounded-lg p-1">
                  <button 
                    onClick={() => setActiveTab('global')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'global' 
                        ? 'bg-cyan-600 text-white' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Global
                  </button>
                  <button 
                    onClick={() => setActiveTab('friends')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'friends' 
                        ? 'bg-cyan-600 text-white' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Friends
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {(activeTab === 'global' ? globalLeaderboard : friendsLeaderboard).map((user, index) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center p-4 rounded-xl ${
                      user.name === 'You' ? 'bg-cyan-900/30 border border-cyan-500/30' : 'bg-black/30'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getRankBadge(index + 1)}`}>
                      {getRankIcon(index + 1)}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center text-white font-bold">
                          {user.avatar}
                        </div>
                        <div className="ml-3">
                          <div className={`font-bold ${user.name === 'You' ? 'text-cyan-300' : 'text-white'}`}>
                            {user.name} {user.name === 'You' && '(You)'}
                          </div>
                          <div className="text-sm text-white/60 flex items-center gap-2">
                            <span>Score: {user.score}</span>
                            <span>•</span>
                            <span className="text-green-400">+{user.improvement} improvement</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-pink-400 font-bold">{user.bets} bets</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bets Section */}
          <div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
              <h2 className="text-2xl font-bold text-pink-300 mb-6">Active Bets</h2>
              <div className="space-y-4">
                {bets.map(bet => (
                  <div key={bet.id} className="bg-black/30 rounded-xl p-4 border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white">{bet.title}</h3>
                      <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black text-xs font-bold px-2 py-1 rounded-full">
                        ${bet.prizePool}
                      </div>
                    </div>
                    <p className="text-white/70 text-sm mb-3">{bet.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-xs text-white/60">
                        {bet.participants} participants • {bet.timeLeft} left
                      </div>
                    </div>
                    <button
                      onClick={() => toggleBetJoin(bet.id)}
                      className={`w-full py-2 rounded-lg font-medium ${
                        bet.joined 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' 
                          : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
                      }`}
                    >
                      {bet.joined ? 'Leave Bet' : 'Join Bet'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Stats */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
              <h2 className="text-2xl font-bold text-cyan-300 mb-6">Your Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-white/80">Global Rank</div>
                  <div className="text-xl font-bold text-cyan-400">#3</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-white/80">Friends Rank</div>
                  <div className="text-xl font-bold text-pink-400">#2</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-white/80">Total Bets Won</div>
                  <div className="text-xl font-bold text-green-400">8</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-white/80">Prize Money Earned</div>
                  <div className="text-xl font-bold text-yellow-400">$1,250</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-white/80">Active Bets</div>
                  <div className="text-xl font-bold text-purple-400">3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}