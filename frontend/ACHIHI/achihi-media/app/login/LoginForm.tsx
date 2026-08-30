"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Globe, Zap } from "lucide-react";
import AchihiLogo from "@/components/AchihiLogo";
import { useAppStore } from "@/lib/store";
import { AUTHORS } from "@/lib/mock-data";

type Mode = "login" | "signup" | "forgot";

const inputCls = `
  w-full py-3 rounded-xl text-sm transition-all
  border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400
  focus:outline-none focus:ring-2 focus:ring-[#1E88C7]/40 focus:border-[#1E88C7]/40
  dark:border-[#1a2744] dark:bg-[#08101c] dark:text-[#b8d4ec] dark:placeholder-[#2e4a68]
  dark:focus:ring-[#38bdf8]/20 dark:focus:border-[#38bdf8]/30
  dark:font-mono dark:tracking-wide
`;

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAppStore();
  const [mode, setMode] = useState<Mode>("login");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    if (mode === "forgot") {
      setSuccess("If an account exists with that email, you'll receive a reset link shortly.");
      setLoading(false);
      return;
    }
    if (mode === "signup") {
      if (!name.trim()) { setError("Please enter your name."); setLoading(false); return; }
      if (password.length < 8) { setError("Password must be at least 8 characters."); setLoading(false); return; }
      login({ ...AUTHORS[0], name, email });
      router.push("/");
      return;
    }
    if (!email.includes("@")) { setError("Enter a valid email address."); setLoading(false); return; }
    if (password.length < 6) { setError("Incorrect email or password."); setLoading(false); return; }
    const demoUser = email.includes("admin") ? AUTHORS[3] : AUTHORS[0];
    login({ ...demoUser, email });
    router.push("/");
  };

  const handleDemoLogin = (role: "contributor" | "admin") => {
    const user = role === "admin" ? AUTHORS[3] : AUTHORS[0];
    login({ ...user, email: `${role}@achihi.com` });
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[var(--background)]">
      {/* Dark mode: subtle grid backdrop */}
      <div className="absolute inset-0 hidden dark:block pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(30,136,199,0.08) 0%, transparent 70%)`,
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/"><AchihiLogo size={48} /></Link>
        </div>

        {/* Card */}
        <div className="
          rounded-2xl overflow-hidden shadow-xl
          bg-white border border-gray-100
          dark:bg-[#090d16] dark:border-[#1a2744]
          dark:shadow-[0_0_0_1px_rgba(56,189,248,0.06),0_24px_48px_rgba(0,0,0,0.6)]
        ">
          {/* Futuristic top bar (dark only) */}
          <div className="hidden dark:block h-px bg-gradient-to-r from-transparent via-[#38bdf8]/40 to-transparent" />

          {/* Mode tabs */}
          {mode !== "forgot" && (
            <div className="flex border-b border-gray-100 dark:border-[#111c2e]">
              {(["login", "signup"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
                    mode === m
                      ? "text-[#1E88C7] dark:text-[#38bdf8]"
                      : "text-gray-400 dark:text-[#2e4a68] hover:text-gray-600 dark:hover:text-[#6888a8]"
                  }`}
                >
                  {m === "login" ? "Sign In" : "Create Account"}
                  {mode === m && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-full
                      bg-[#1E88C7] dark:bg-gradient-to-r dark:from-[#38bdf8] dark:to-[#2E8B57]
                      dark:shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="p-6">
            {mode === "forgot" && (
              <div className="mb-6">
                <h2 className="text-xl font-black text-gray-900 dark:text-[#c8ddf0] mb-1">Reset password</h2>
                <p className="text-sm text-gray-500 dark:text-[#3a5878]">Enter your email and we&apos;ll send a reset link.</p>
              </div>
            )}

            {/* Google Sign In */}
            {mode !== "forgot" && (
              <>
                <button className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl mb-5 text-sm font-medium transition-all
                  border border-gray-200 text-gray-700 hover:bg-gray-50
                  dark:border-[#1a2744] dark:text-[#6888a8] dark:hover:bg-[#0d1520] dark:hover:text-[#a8c8e8]
                  dark:hover:border-[#38bdf8]/20">
                  <Globe size={16} className="dark:text-[#38bdf8]/50" />
                  Continue with Google
                </button>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-gray-100 dark:bg-[#111c2e]" />
                  <span className="text-xs text-gray-400 dark:text-[#2e4a68]">or</span>
                  <div className="flex-1 h-px bg-gray-100 dark:bg-[#111c2e]" />
                </div>
              </>
            )}

            {/* Alerts */}
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm
                bg-red-50 border border-red-200 text-red-700
                dark:bg-red-900/10 dark:border-red-800/50 dark:text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm
                bg-green-50 border border-green-200 text-green-700
                dark:bg-[#0a1e14] dark:border-[#34d399]/30 dark:text-[#34d399]">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name (signup) */}
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-[#3a5878] uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#2e4a68]" />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name" required
                      className={`${inputCls} pl-10 pr-4`} />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-[#3a5878] uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#2e4a68]" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" required
                    className={`${inputCls} pl-10 pr-4`} />
                </div>
              </div>

              {/* Password */}
              {mode !== "forgot" && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-gray-600 dark:text-[#3a5878] uppercase tracking-wider">Password</label>
                    {mode === "login" && (
                      <button type="button" onClick={() => setMode("forgot")}
                        className="text-xs text-[#1E88C7] dark:text-[#38bdf8]/70 hover:underline">
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#2e4a68]" />
                    <input type={showPass ? "text" : "password"} value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === "signup" ? "Min. 8 characters" : "Your password"} required
                      className={`${inputCls} pl-10 pr-12`} />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#2e4a68] hover:text-gray-600 dark:hover:text-[#38bdf8]">
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
                  bg-[#0F2A4A] text-white hover:bg-[#1a3a5c]
                  dark:bg-transparent dark:text-[#38bdf8] dark:border dark:border-[#38bdf8]/30
                  dark:hover:bg-[#38bdf8]/8 dark:hover:border-[#38bdf8]/60
                  dark:shadow-[0_0_16px_rgba(56,189,248,0.08)]
                  dark:hover:shadow-[0_0_20px_rgba(56,189,248,0.18)]
                  disabled:opacity-50">
                {loading
                  ? <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                  : mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
              </button>

              {mode === "forgot" && (
                <button type="button" onClick={() => setMode("login")}
                  className="w-full text-center text-sm text-[#1E88C7] dark:text-[#38bdf8]/60 hover:underline">
                  ← Back to sign in
                </button>
              )}
            </form>

            {/* Demo shortcuts */}
            {mode === "login" && (
              <div className="mt-5 pt-5 border-t border-gray-100 dark:border-[#111c2e]">
                <p className="text-[11px] text-center mb-3 text-gray-400 dark:text-[#2e4a68] uppercase tracking-widest font-bold">
                  <Zap size={10} className="inline mr-1" />Demo shortcuts
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleDemoLogin("contributor")}
                    className="py-2 rounded-lg text-xs font-semibold transition-all
                      bg-[#2E8B57]/8 text-[#2E8B57] border border-[#2E8B57]/20
                      hover:bg-[#2E8B57]/15 hover:border-[#2E8B57]/40
                      dark:bg-transparent dark:text-[#34d399] dark:border-[#34d399]/25
                      dark:hover:bg-[#34d399]/8 dark:hover:border-[#34d399]/50
                      dark:hover:shadow-[0_0_10px_rgba(52,211,153,0.12)]">
                    Contributor
                  </button>
                  <button onClick={() => handleDemoLogin("admin")}
                    className="py-2 rounded-lg text-xs font-semibold transition-all
                      bg-[#1E88C7]/8 text-[#1E88C7] border border-[#1E88C7]/20
                      hover:bg-[#1E88C7]/15 hover:border-[#1E88C7]/40
                      dark:bg-transparent dark:text-[#38bdf8] dark:border-[#38bdf8]/25
                      dark:hover:bg-[#38bdf8]/8 dark:hover:border-[#38bdf8]/50
                      dark:hover:shadow-[0_0_10px_rgba(56,189,248,0.12)]">
                    Admin
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-[#2e4a68] mt-6">
          By continuing you agree to our{" "}
          <Link href="#" className="text-[#1E88C7] dark:text-[#38bdf8]/60 hover:underline">Terms</Link>
          {" & "}
          <Link href="#" className="text-[#1E88C7] dark:text-[#38bdf8]/60 hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
