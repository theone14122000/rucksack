"use client";

import React, { useState } from "react";
import { Lock, LogIn, User } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Sign-in failed. Please try again.");
        setBusy(false);
        return;
      }
      const next = new URLSearchParams(window.location.search).get("next");
      window.location.href = next && next.startsWith("/") && !next.startsWith("//") ? next : "/admin";
    } catch {
      setError("Network error — please try again.");
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.07]" />
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes cta-shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `,
        }}
      />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden border border-white/15 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.jpeg" alt="Rucksack Adventures" className="w-full h-full object-contain" />
            </div>
            <div className="text-left">
              <span className="font-editorial text-2xl font-bold text-white leading-none block">
                Rucksack Adventures
              </span>
              <span className="font-hand text-brand-turquoise-bright text-sm">Admin Panel</span>
            </div>
          </div>
          <p className="text-xs text-white/40 font-mono uppercase tracking-[0.22em]">
            Content Management System
          </p>
        </div>

        <form
          onSubmit={submit}
          className="bg-white rounded-card-2xl p-7 shadow-luxury border border-white/10 space-y-5"
        >
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark/70 mb-1.5">
              Email
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-taupe" />
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@rucksackadventures.com"
                required
                className="w-full rounded-card border border-brand-turquoise/15 bg-white pl-10 pr-3.5 py-3 text-sm focus:outline-none focus:border-brand-turquoise focus:ring-2 focus:ring-brand-turquoise/15 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark/70 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-taupe" />
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full rounded-card border border-brand-turquoise/15 bg-white pl-10 pr-3.5 py-3 text-sm focus:outline-none focus:border-brand-turquoise focus:ring-2 focus:ring-brand-turquoise/15 transition-all"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-card px-3 py-2.5">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brand-turquoise to-brand-turquoise-bright text-white text-xs font-bold uppercase tracking-wider rounded-full btn-premium disabled:opacity-60 transition-all"
          >
            <LogIn className="w-4 h-4" /> {busy ? "Signing in…" : "Sign In"}
          </button>

          <p className="text-[11px] text-brand-taupe text-center leading-relaxed">
            Authorised administrators only. Sessions expire after 7 days.
          </p>
        </form>

        <p className="text-center text-[11px] text-white/30 mt-6">
          &copy; {new Date().getFullYear()} Rucksack Adventures &bull; Shimla
        </p>
      </div>
    </div>
  );
}
