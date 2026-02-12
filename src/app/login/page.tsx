'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Wallet, ArrowRight, Mail, Lock, User, Github, Chrome } from 'lucide-react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to Auth0
    window.location.href = '/api/auth/login'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">FinanceOS</span>
          </Link>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-slate-500 mb-8">
              {isLogin ? 'Sign in to access your financial dashboard' : 'Start your journey to financial freedom'}
            </p>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => window.location.href = '/api/auth/login'}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Chrome className="h-5 w-5" />
                Continue with Google
              </button>
              <button
                onClick={() => window.location.href = '/api/auth/login'}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Github className="h-5 w-5" />
                Continue with GitHub
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-sm text-slate-500">or continue with email</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500" />
                    <span className="text-sm text-slate-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            {/* Toggle */}
            <p className="text-center text-slate-500 mt-6">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Terms */}
          <p className="text-center text-slate-500 text-sm mt-6">
            By continuing, you agree to our{' '}
            <a href="#" className="text-emerald-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Gradient */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-emerald-500/10">
        <div className="text-center px-12">
          <div className="w-64 h-64 mx-auto mb-8 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
            <Wallet className="h-32 w-32 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Take Control of Your Finances
          </h2>
          <p className="text-slate-300 text-lg">
            Track investments, manage accounts, and achieve your financial goals with AI-powered insights.
          </p>
        </div>
      </div>
    </div>
  )
}
