'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const result = await signIn("resend", {
        email,
        callbackUrl: "/dashboard", // Where they go after clicking the link
        redirect: false,
      });

      if (result?.error) {
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-earth p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-t-4 border-solar">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-earth mb-2">HATUA 🦁</h1>
          <p className="text-gray-600">Enter your email to join the pride</p>
        </div>

        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center animate-pulse">
            <p className="font-bold">Check your inbox! 📧</p>
            <p className="text-sm">We sent a magic link to {email}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="johndoe@gmail.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-solar focus:border-transparent outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-solar text-earth font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending Link...' : 'Send Magic Link'}
            </button>

            {status === 'error' && (
              <p className="text-red-500 text-sm text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          By signing in, you agree to the HATUA 10km point rules.
        </div>
      </div>
    </div>
  );
}
