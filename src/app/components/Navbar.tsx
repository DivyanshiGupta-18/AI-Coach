"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event using useEffect for best practice
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 shadow-lg" : "bg-black/10"
      } backdrop-blur-lg py-4`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="SpeakAI Logo"
            width={36}
            height={36}
            priority
            className="rounded-full drop-shadow"
            style={{ background: "white" }}
          />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent hidden sm:inline">
            SpeakAI
          </span>
        </div>
        <ul className="hidden md:flex gap-8 text-lg font-medium items-center">
          <li>
            <a href="#features" className="hover:text-cyan-400 transition">
              Features
            </a>
          </li>
          <li>
            <a href="#gamification" className="hover:text-pink-400 transition">
              Gamification
            </a>
          </li>
          <li>
            <Link href="/VoiceCoach" className="hover:text-cyan-400 transition">
              Demo
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="hover:text-pink-400 transition">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/">
              <button className="border border-white rounded-[10px] p-[10px] hover:text-pink-400 transition">
                Login/Signin
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
