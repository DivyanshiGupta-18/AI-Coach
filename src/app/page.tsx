// import NavBar from "../app/components/Navbar"
// import Hero from "../app/components/Hero"
// import Features from "../app/components/Features"
// import VoiceCoach from "./components/VoiceCoach"
// import Gamefication from "./components/Gamification"
// import Footer from "../app/components/Footer"
// import ParticlesBg from "../app/components/ParticlesBg"
// import Pricing from "./components/pricing"

// export default function Home() {
//   return (
//     <>
//       <ParticlesBg />
//       <NavBar />
//       <main>
//         <Hero />
//         <Features />
//         <VoiceCoach />
//         <Gamefication />
//         <Pricing />
//       </main>
//       <Footer />
//     </>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NavBar from "../app/components/Navbar";
import Hero from "../app/components/Hero";
import Features from "../app/components/Features";
import VoiceCoach from "./components/VoiceCoach";
import Gamification from "./components/Gamification";
import Footer from "../app/components/Footer";
import ParticlesBg from "../app/components/ParticlesBg";
import Pricing from "./components/pricing";
// import Login from "./components/Login";
import DailyChallenges from "./components/DailyChallenges";
import PerformanceAnalytics from "./components/PerformanceAnalytics";
import CommunityCompetition from "./components/CommunityCompetition";
import AchievementSystem from "./components/AchievementSystem";

// Define routes
const routes = {
  "/": {
    component: (
      <>
        <ParticlesBg />
        <Hero />
        <Features />
        <VoiceCoach />
        <Gamification navigate={Gamification} /> 
        <Pricing />
      </>
    ),
    title: "SpeakAI - AI Voice Coach"
  },
  // "/login": {
  //   component: <Login />,
  //   title: "Login - SpeakAI"
  // },
  "/daily-challenges": {
    component: <DailyChallenges navigate={DailyChallenges} />, 
    title: "Daily Challenges - SpeakAI"
  },
  "/performance-analytics": {
    component: <PerformanceAnalytics navigate={PerformanceAnalytics} />, 
    title: "Performance Analytics - SpeakAI"
  },
  "/community-competition": {
    component: <CommunityCompetition navigate={CommunityCompetition} />, 
    title: "Community Competition - SpeakAI"
  },
  "/achievement-system": {
    component: <AchievementSystem navigate={AchievementSystem} />, 
    title: "Achievement System - SpeakAI"
  }
};

export default function Home() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Update document title based on route
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = routes[currentPath as keyof typeof routes]?.title || routes["/"].title;
    }
  }, [currentPath]);

  // Handle navigation
  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, "", path);
  };

  // Handle login modal
  const handleLoginClick = () => {
    if (currentPath === "/login") {
      // Already on login page, do nothing
      return;
    }
    setShowLoginModal(true);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
  };

  // Get current route component
  const currentRoute = routes[currentPath as keyof typeof routes] || routes["/"];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#16213e]">
      <NavBar 
        onLoginClick={handleLoginClick} 
        navigate={navigate} 
        currentPath={currentPath} 
      />
      <main className="flex-grow">
        {currentRoute.component}
      </main>
      <Footer />
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4">
            <button 
              onClick={handleCloseLogin}
              className="absolute -top-10 right-0 text-white hover:text-cyan-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#16213e] rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-cyan-500 to-pink-500">
                <div className="bg-[#0c0c0c] p-8 rounded-xl">
                  <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                    Sign In to SpeakAI
                  </h2>
                  <form className="space-y-6">
                    <div>
                      <label className="block mb-2 font-medium text-white/80">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-cyan-400 focus:outline-none text-white placeholder-white/50"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium text-white/80">Password</label>
                      <input
                        type="password"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-cyan-400 focus:outline-none text-white placeholder-white/50"
                        placeholder="Enter your password"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 rounded border-white/20 bg-white/10 text-cyan-400 focus:ring-cyan-400"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-white/80">
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <a href="#" className="font-medium text-cyan-400 hover:text-cyan-300">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-lg font-bold bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:from-cyan-600 hover:to-pink-600 transition-all"
                    >
                      Sign In
                    </button>
                  </form>
                  <div className="mt-6 text-center">
                    <p className="text-sm text-white/70">
                      Don"t have an account?{" "}
                      <a href="#" className="font-medium text-cyan-400 hover:text-cyan-300">
                        Sign up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}