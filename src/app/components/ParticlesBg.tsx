// app/components/ParticlesBg.tsx
"use client";
import { useEffect } from "react";

export default function ParticlesBg() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = document.getElementById("particles-bg");
    if (!container || container.childElementCount) return;
    for (let i = 0; i < 50; i++) {
      const p = document.createElement("div");
      p.className = "particle-bg";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.animationDelay = Math.random() * 6 + "s";
      p.style.animationDuration = Math.random() * 4 + 4 + "s";
      container.appendChild(p);
    }
  }, []);
  return (
    <>
      <div
        id="particles-bg"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ width: "100vw", height: "100vh" }}
      />
      <style>{`
        .particle-bg {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(45deg, #00f5ff, #ff00aa);
          opacity: 0.7;
          animation: floatBg 6s ease-in-out infinite;
        }
        @keyframes floatBg {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg);}
        }
      `}</style>
    </>
  );
}
