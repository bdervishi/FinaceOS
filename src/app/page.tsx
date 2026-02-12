import Link from 'next/link'
import { Wallet, TrendingUp, Shield, PieChart, ArrowRight, CheckCircle } from 'lucide-react'

const features = [
  {
    icon: Wallet,
    title: 'Bank Account Aggregation',
    description: 'Connect all your bank accounts in one place with Plaid integration.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Portfolio',
    description: 'Track stocks, ETFs, and crypto with real-time market data.',
  },
  {
    icon: PieChart,
    title: 'Smart Analytics',
    description: 'Visualize your spending patterns and investment performance.',
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your data is encrypted and protected with enterprise security.',
  },
]

const benefits = [
  'Real-time account balances',
  'Automatic transaction categorization',
  'Investment performance tracking',
  'Budget creation and monitoring',
  'Financial goal setting',
  'Secure data encryption',
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FinanceOS</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#benefits" className="text-slate-300 hover:text-white transition-colors">Benefits</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
            </nav>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-white hover:text-emerald-400 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Master Your{' '}
              <span className="text-emerald-400">Financial Future</span>
            </h1>
            <p className="mt-6 text-xl text-slate-300">
              All-in-one platform to track investments, manage bank accounts,
              and optimize your spending. Powered by AI and real-time data.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#features"
                className="w-full sm:w-auto border border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Learn More
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              No credit card required · 14-day free trial · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Everything You Need in One Platform
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Powerful features to manage your complete financial life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-colors group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Take Control of Your Finances
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                FinanceOS gives you the tools and insights you need to make smarter
                financial decisions and build wealth over time.
              </p>
              <ul className="mt-8 space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl p-8 border border-slate-700">
                <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-slate-400">Total Net Worth</p>
                      <p className="text-3xl font-bold text-white">$142,850.00</p>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">+12.5%</span>
                    </div>
                  </div>
                  <div className="h-32 bg-slate-700/50 rounded-lg flex items-end justify-between p-4 gap-2">
                    {[35, 45, 38, 55, 62, 58, 70, 75, 68, 82, 88, 95].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-emerald-500 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Ready to Transform Your Financial Life?
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Join thousands of users who have already taken control of their finances with FinanceOS.
          </p>
           <div className="mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">FinanceOS</span>
            </div>
            <p className="text-slate-500 text-sm">
              &copy; 2024 FinanceOS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
