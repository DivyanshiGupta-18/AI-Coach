"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  // Effect for navbar background on scroll – optional
  if (typeof window !== "undefined") {
    window.onscroll = () =>
      setScrolled(window.scrollY > 100 ? true : false);
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 shadow-lg" : "bg-black/10"
      } backdrop-blur-lg py-4`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        {/* Logo with fallback text */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="SpeakAI Logo"
            width={36}
            height={36}
            priority
            className="rounded-full drop-shadow"
            style={{ background: "white" }} // Optional: white background for visibility
          />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent hidden sm:inline">
            SpeakAI
          </span>
        </Link>
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          <li><a href="#features" className="hover:text-cyan-400 transition">Features</a></li>
          <li><a href="#gamification" className="hover:text-pink-400 transition">Gamification</a></li>
          <li><a href="#demo" className="hover:text-cyan-400 transition">Demo</a></li>
          <li><a href="#pricing" className="hover:text-pink-400 transition">Pricing</a></li>
        </ul>
      </div>
    </nav>
  );
}
