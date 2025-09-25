"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export default function AchievementSystem({ navigate }: { navigate: (path: string) => void }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const badges: Badge[] = [
    {
      id: "1",
      title: "First Steps",
      description: "Complete your first daily challenge",
      icon: "👣",
      category: "progression",
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      rarity: "common"
    },
    {
      id: "2",
      title: "Week Streak",
      description: "Complete daily challenges for 7 days in a row",
      icon: "🔥",
      category: "consistency",
      unlocked: true,
      progress: 7,
      maxProgress: 7,
      rarity: "rare"
    },
    {
      id: "3",
      title: "Debate Master",
      description: "Score 9/10 or higher on 5 rebuttal challenges",
      icon: "🎤",
      category: "skill",
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      rarity: "epic"
    },
    {
      id: "4",
      title: "Filler-Free Week",
      description: "Complete a week of challenges without using filler words",
      icon: "🚫",
      category: "skill",
      unlocked: false,
      progress: 4,
      maxProgress: 7,
      rarity: "rare"
    },
    {
      id: "5",
      title: "Perfect Pitch",
      description: "Score 10/10 on the Perfect Pitch Presentation challenge",
      icon: "🎯",
      category: "skill",
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      rarity: "epic"
    },
    {
      id: "6",
      title: "Social Butterfly",
      description: "Invite 5 friends to join SpeakAI",
      icon: "🦋",
      category: "social",
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      rarity: "common"
    },
    {
      id: "7",
      title: "Top Performer",
      description: "Reach the top 10 on the global leaderboard",
      icon: "🏆",
      category: "competition",
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      rarity: "legendary"
    },
    {
      id: "8",
      title: "Storyteller",
      description: "Complete 10 storytelling challenges with a score of 8+",
      icon: "📚",
      category: "skill",
      unlocked: false,
      progress: 6,
      maxProgress: 10,
      rarity: "rare"
    },
    {
      id: "9",
      title: "Month Streak",
      description: "Complete daily challenges for 30 days in a row",
      icon: "🌟",
      category: "consistency",
      unlocked: false,
      progress: 14,
      maxProgress: 30,
      rarity: "epic"
    },
    {
      id: "10",
      title: "Betting Pro",
      description: "Win 10 improvement bets",
      icon: "💰",
      category: "competition",
      unlocked: false,
      progress: 7,
      maxProgress: 10,
      rarity: "rare"
    },
    {
      id: "11",
      title: "Mentor",
      description: "Help 3 friends improve their scores by 2+ points",
      icon: "🤝",
      category: "social",
      unlocked: false,
      progress: 1,
      maxProgress: 3,
      rarity: "epic"
    },
    {
      id: "12",
      title: "Polyglot",
      description: "Complete challenges in 3 different languages",
      icon: "🌍",
      category: "skill",
      unlocked: false,
      progress: 1,
      maxProgress: 3,
      rarity: "legendary"
    }
  ];

  const categories = ["all", "progression", "consistency", "skill", "social", "competition"];
  
  const filteredBadges = activeCategory === "all" 
    ? badges 
    : badges.filter(badge => badge.category === activeCategory);

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case "common": return "border-gray-400";
      case "rare": return "border-blue-400";
      case "epic": return "border-purple-400";
      case "legendary": return "border-yellow-400";
      default: return "border-gray-400";
    }
  };

  const getRarityBackground = (rarity: string) => {
    switch(rarity) {
      case "common": return "bg-gray-900/50";
      case "rare": return "bg-blue-900/30";
      case "epic": return "bg-purple-900/30";
      case "legendary": return "bg-gradient-to-br from-yellow-900/30 to-amber-900/30";
      default: return "bg-gray-900/50";
    }
  };

  const getRarityText = (rarity: string) => {
    switch(rarity) {
      case "common": return "text-gray-300";
      case "rare": return "text-blue-300";
      case "epic": return "text-purple-300";
      case "legendary": return "text-yellow-300";
      default: return "text-gray-300";
    }
  };

  const unlockedCount = badges.filter(badge => badge.unlocked).length;
  const totalCount = badges.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#16213e] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </button>

        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4">
            Achievement System
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
                 Unlock badges for milestones like &apos;Debate Master&apos; or &apos;Filler-Free Week&apos;
</p>
        </header>

        {/* Progress Overview */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-cyan-300">Your Progress</h2>
            <div className="text-xl font-bold text-white">
              <span className="text-cyan-400">{unlockedCount}</span>/{totalCount} Badges
            </div>
          </div>
          <div className="w-full bg-black/40 rounded-full h-4 mb-4">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-pink-500 h-4 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-white/70">
            <span>Beginner</span>
            <span>{progressPercentage}% Complete</span>
            <span>Master</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                activeCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-pink-500 text-white"
                  : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBadges.map(badge => (
            <div 
              key={badge.id} 
              className={`rounded-2xl p-6 border-2 ${getRarityColor(badge.rarity)} ${getRarityBackground(badge.rarity)} ${
                badge.unlocked ? "" : "opacity-70"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{badge.icon}</div>
                <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                  badge.unlocked 
                    ? getRarityText(badge.rarity) + " bg-black/30" 
                    : "text-gray-500 bg-black/20"
                }`}>
                  {badge.rarity}
                </div>
              </div>
              
              <h3 className={`text-lg font-bold mb-2 ${
                badge.unlocked ? "text-white" : "text-gray-400"
              }`}>
                {badge.title}
              </h3>
              
              <p className={`text-sm mb-4 ${
                badge.unlocked ? "text-white/80" : "text-gray-500"
              }`}>
                {badge.description}
              </p>
              
              {!badge.unlocked && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-white/60 mb-1">
                    <span>Progress</span>
                    <span>{badge.progress}/{badge.maxProgress}</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-pink-500 h-2 rounded-full" 
                      style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {badge.unlocked && (
                <div className="mt-4 text-xs font-bold text-green-400 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Unlocked
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Rarity Legend */}
        <div className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
          <h3 className="text-xl font-bold text-cyan-300 mb-4">Badge Rarity</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-gray-400 bg-gray-900/50"></div>
              <div>
                <div className="font-medium text-gray-300">Common</div>
                <div className="text-xs text-gray-500">Basic achievements</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-blue-400 bg-blue-900/30"></div>
              <div>
                <div className="font-medium text-blue-300">Rare</div>
                <div className="text-xs text-blue-500/70">Challenging tasks</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-purple-400 bg-purple-900/30"></div>
              <div>
                <div className="font-medium text-purple-300">Epic</div>
                <div className="text-xs text-purple-500/70">Difficult feats</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-yellow-400 bg-gradient-to-br from-yellow-900/30 to-amber-900/30"></div>
              <div>
                <div className="font-medium text-yellow-300">Legendary</div>
                <div className="text-xs text-yellow-500/70">Extraordinary challenges</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}