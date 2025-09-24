const features = [
  {
    icon: "🎤",
    title: "Smart Speech Analysis",
    text: "AI-powered analysis of your speech patterns, detecting filler words, pace, clarity, and confidence levels with instant feedback.",
  },
  {
    icon: "🧠",
    title: "Emotion & Tone Scoring",
    text: "Advanced sentiment analysis that evaluates your emotional delivery and provides tips for better audience engagement.",
  },
  {
    icon: "💡",
    title: "Personalized AI Tips",
    text: "Get actionable, personalized suggestions like 'slow down 15%' or 'reduce filler words' based on your unique speaking patterns.",
  },
  {
    icon: "🏆",
    title: "Gamified Learning",
    text: "Earn badges, maintain streaks, and track progress through an engaging dashboard that makes improvement fun.",
  },
  {
    icon: "🎭",
    title: "AI Roleplay Debates",
    text: "Practice debates against adaptive AI avatars that challenge your arguments and help you build stronger rebuttals.",
  },
  {
    icon: "⚔️",
    title: "Live Debate Rooms",
    text: "Join real-time moderated debates with instant AI feedback and compete on global leaderboards.",
  }
];

export default function Features() {
  return (
    <section id="features" className="py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-cyan-400 via-white to-cyan-300 bg-clip-text text-transparent">Powerful Features for Every Speaker</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map(({ icon, title, text }) => (
            <div key={title} className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-md hover:bg-white/20 transition shadow-xl text-center">
              <span className="text-4xl mb-2 block">{icon}</span>
              <h3 className="text-2xl font-bold mb-3 text-cyan-300">{title}</h3>
              <p className="text-white/85">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
