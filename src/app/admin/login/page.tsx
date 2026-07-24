'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'password' | 'magic'>('password');
  const [magicSent, setMagicSent] = useState(false);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Try native Supabase Auth first
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (!authError && authData.user) {
        router.push('/admin');
        router.refresh();
        return;
      }

      // 2. Fallback to API route auth (/api/admin/login)
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
        return;
      }

      const userFriendlyError =
        data.error && !data.error.includes('prisma') && !data.error.includes("Can't reach")
          ? data.error
          : authError?.message || 'Invalid email or password. Please try again.';

      setError(userFriendlyError);
      setLoading(false);
    } catch {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });

    if (authError) {
      setError('Unable to send magic link. Please check your email.');
      setLoading(false);
      return;
    }
    setMagicSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 mb-6 shadow-lg shadow-red-900/40">
            <span className="text-2xl font-serif font-black text-white">N</span>
          </div>
          <h1 className="text-3xl font-serif font-black text-white mb-2">Admin Access</h1>
          <p className="text-sm text-white/40 font-mono">Nobi Kumar · Restricted Area</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          {magicSent ? (
            <div className="text-center space-y-4">
              <div className="text-4xl">📧</div>
              <h2 className="text-xl font-semibold text-white">Check your email</h2>
              <p className="text-sm text-white/50">
                A magic link was sent to <span className="text-white/80 font-mono">{email}</span>.
                Click it to sign in.
              </p>
              <button
                onClick={() => setMagicSent(false)}
                className="text-xs text-white/30 hover:text-white/60 underline mt-4"
              >
                Send again
              </button>
            </div>
          ) : (
            <form
              onSubmit={mode === 'password' ? handlePasswordLogin : handleMagicLink}
              className="space-y-5"
            >
              {/* Mode toggle */}
              <div className="flex gap-2 p-1 bg-white/5 rounded-lg mb-6">
                {(['password', 'magic'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`flex-1 py-2 text-xs font-mono rounded-md transition-all ${
                      mode === m
                        ? 'bg-red-700 text-white shadow'
                        : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {m === 'password' ? '🔐 Password' : '✨ Magic Link'}
                  </button>
                ))}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/50 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30 transition-all"
                />
              </div>

              {/* Password with Eye Show/Hide Toggle */}
              {mode === 'password' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/50 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30 transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-mono px-2 py-1 rounded transition-all select-none"
                      aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                    >
                      {showPassword ? '👁 Hide' : '👁 Show'}
                    </button>
                  </div>
                </div>
              )}

              {/* Sanitized User-Friendly Error */}
              {error && (
                <div className="bg-red-900/30 border border-red-700/50 rounded-lg px-4 py-3 text-xs text-red-300 font-mono">
                  ⚠ {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in…' : mode === 'password' ? 'Sign In' : 'Send Magic Link'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-white/20 mt-6">
          Only authorised accounts can access this area.
        </p>
      </div>
    </div>
  );
}
