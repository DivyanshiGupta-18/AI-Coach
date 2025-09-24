export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "Up to 100 minutes/month transcription",
        "Basic feedback and tips",
        "Community leaderboard access",
      ],
      cta: "Sign Up Free",
      link: "/register",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$15",
      features: [
        "Unlimited transcription",
        "Advanced feedback (emotion scoring, roleplay)",
        "Personalized challenges",
        "Priority support",
      ],
      cta: "Start 7-day Free Trial",
      link: "/register?plan=pro",
      highlight: true,
    },
    {
      name: "Gold Pro",
      price: "$25",
      features: [
        "Custom minutes & users",
        "Dedicated onboarding",
        "Integrations: API, SSO",
        "Priority enterprise support",
      ],
      cta: "Contact Sales",
      link: "/contact",
      highlight: false,
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#16213e] py-20 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-cyan-400 via-white to-pink-400 bg-clip-text text-transparent">
        Pricing
      </h1>
      <p className="text-white/80 text-center mb-10 text-lg max-w-lg">
        Choose the plan that fits your speaking, interview, and presentation needs. Upgrade anytime!
      </p>
      <div className="flex flex-col md:flex-row gap-10 justify-center">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`flex-1 bg-white/10 border border-cyan-400/40 rounded-2xl shadow-xl px-8 py-10 min-w-[260px] flex flex-col items-center
              ${plan.highlight ? "ring-2 ring-pink-400 scale-105" : ""}`}
          >
            <h2 className="text-2xl font-bold mb-2 text-cyan-200">{plan.name}</h2>
            <p className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">{plan.price}</p>
            <ul className="mb-6 text-white/90 space-y-2 text-left w-full max-w-xs mx-auto">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={plan.link}
              className={`py-3 px-8 mt-auto rounded-full font-semibold transition
                ${plan.highlight
                  ? "bg-gradient-to-r from-pink-400 to-cyan-400 text-white shadow-xl"
                  : "bg-white text-cyan-600 hover:bg-cyan-400 hover:text-white"}
              `}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
