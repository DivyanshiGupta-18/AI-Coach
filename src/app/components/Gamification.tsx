const gameFeatures = [
  { icon: "🎯", title: "Daily Challenges", text: "30-second rebuttals with zero filler words, perfect pitch presentations, and more micro-challenges" },
  { icon: "📊", title: "Performance Analytics", text: "Track your improvement over time with detailed metrics and predictive scoring" },
  { icon: "👥", title: "Community Competition", text: "Compete with friends, bet on improvements, and climb the global leaderboard" },
  { icon: "🏅", title: "Achievement System", text: "Unlock badges for milestones like 'Debate Master' or 'Filler-Free Week'" }
];

export default function Gamification() {
  return (
    <section id="gamification" className="py-12 bg-gradient-to-r from-cyan-400/10 via-pink-400/10 to-black/10 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-cyan-300 via-white to-pink-400 bg-clip-text text-transparent">Level Up Your Speaking Game</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {gameFeatures.map(({ icon, title, text }) => (
            <div key={title} className="text-center bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-sm shadow-xl hover:bg-white/20 transition">
              <span className="text-3xl mb-2 block">{icon}</span>
              <h3 className="text-xl font-semibold text-pink-300 mb-2">{title}</h3>
              <p className="text-white/90">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
