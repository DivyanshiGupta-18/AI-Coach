// app/components/Stats.tsx
const stats = [
  { value: "92%", label: "Improvement in confidence" },
  { value: "10K+", label: "Active speakers" },
  { value: "50M+", label: "Words analyzed" },
  { value: "4.9/5", label: "User rating" },
];

export default function Stats() {
  return (
    <section className="py-16 bg-black/40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/10 border border-white/20 rounded-xl p-8 shadow-md">
              <h3 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                {s.value}
              </h3>
              <p className="text-white/80 text-lg">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
