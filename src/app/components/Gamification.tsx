"use client";
import { useRouter } from 'next/navigation';

const gameFeatures = [
  { 
    icon: "🎯", 
    title: "Daily Challenges", 
    text: "30-second rebuttals with zero filler words, perfect pitch presentations, and more micro-challenges",
    link: "/daily-challenges" 
  },
  { 
    icon: "📊", 
    title: "Performance Analytics", 
    text: "Track your improvement over time with detailed metrics and predictive scoring",
    link: "/performance-analytics" 
  },
  { 
    icon: "👥", 
    title: "Community Competition", 
    text: "Compete with friends, bet on improvements, and climb the global leaderboard",
    link: "/community-competition" 
  },
  { 
    icon: "🏅", 
    title: "Achievement System", 
    text: "Unlock badges for milestones like 'Debate Master' or 'Filler-Free Week'",
    link: "/achievement-system" 
  }
];

export default function Gamification({ navigate }: { navigate?: (path: string) => void }) {
  const router = useRouter();

  const handleCardClick = (link: string) => {
    if (navigate) {
      navigate(link);
    } else {
      router.push(link);
    }
  };

  return (
    <section id="gamification" className="py-12 bg-gradient-to-r from-cyan-400/10 via-pink-400/10 to-black/10 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-cyan-300 via-white to-pink-400 bg-clip-text text-transparent">Level Up Your Speaking Game</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {gameFeatures.map(({ icon, title, text, link }) => (
            <div 
              key={title} 
              className="text-center bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-sm shadow-xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer hover:shadow-cyan-500/20"
              onClick={() => handleCardClick(link)}
            >
              <span className="text-3xl mb-2 block">{icon}</span>
              <h3 className="text-xl font-semibold text-pink-300 mb-2">{title}</h3>
              <p className="text-white/90">{text}</p>
              {/* <div className="mt-4 text-cyan-400 text-sm font-medium flex items-center justify-center gap-1">
                Try now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}