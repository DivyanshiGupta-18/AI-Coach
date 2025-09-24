export default function Hero() {
  return (
    <section className="hero min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-10">
      <div className="max-w-2xl w-full mx-auto py-24">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-cyan-400 via-white to-pink-400 bg-clip-text text-transparent leading-tight">
          Master Your Voice, Win Every Debate
        </h1>
        <p className="text-xl mb-8 opacity-90 leading-relaxed">
          Transform your speaking skills with AI-powered coaching, real-time feedback, and gamified learning. From presentations to debates, become the confident speaker you always wanted to be.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="border border-white rounded-[10px] p-[15px]"> <a href="#voicecoach" className="btn-primary">Start Free Trial</a> </button>
          <button className="border border-white rounded-[10px] p-[15px]"> <a href="#features" className="btn-secondary">Watch Demo</a> </button>
        </div>
      </div>
    </section>
  );
}
