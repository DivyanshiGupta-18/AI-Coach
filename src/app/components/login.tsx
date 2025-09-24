"use client";
import { useState } from "react";

export default function login() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    let route = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    // Don't send name on login
    let body =
      mode === "login"
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

    const res = await fetch(route, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      setError(data.error || "Invalid credentials or something went wrong.");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#16213e]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/20 backdrop-blur p-8 rounded-xl shadow-xl border border-white/30 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
          {mode === "login" ? "Sign In to SpeakAI" : "Create Your SpeakAI Account"}
        </h1>
        {error && (
          <div className="text-red-500 bg-red-100 my-2 p-2 rounded">{error}</div>
        )}
        {mode === "signup" && (
          <div>
            <label className="block mb-1 font-medium text-white/80">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 rounded bg-white/40 border border-cyan-400/50 focus:border-cyan-500 focus:outline-none text-black"
              placeholder="Your Name"
            />
          </div>
        )}
        <div>
          <label className="block mb-1 font-medium text-white/80">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 rounded bg-white/40 border border-cyan-400/50 focus:border-cyan-500 focus:outline-none text-black"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-white/80">Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 rounded bg-white/40 border border-cyan-400/50 focus:border-cyan-500 focus:outline-none text-black"
            placeholder="Enter your password"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full py-3 text-lg font-bold rounded bg-gradient-to-r from-cyan-400 to-pink-400 text-white hover:from-pink-400 hover:to-cyan-400 transition"
        >
          {loading
            ? mode === "login"
              ? "Signing In..."
              : "Signing Up..."
            : mode === "login"
            ? "Sign In"
            : "Sign Up"}
        </button>
        <div className="text-center mt-3 text-white/80">
          {mode === "login" ? (
            <span>
              New user?{" "}
              <button
                type="button"
                className="text-cyan-400 underline hover:text-pink-400 transition"
                onClick={() => setMode("signup")}
              >
                Create Account
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                className="text-cyan-400 underline hover:text-pink-400 transition"
                onClick={() => setMode("login")}
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </form>
    </main>
  );
}
