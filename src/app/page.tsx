import LinkDashboard from '@/components/LinkDashboard'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-indigo-50 to-transparent opacity-60" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-2 bg-white rounded-2xl shadow-sm mb-6 border border-indigo-50">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold uppercase tracking-wide">New</span>
            <span className="ml-3 text-sm text-gray-600 font-medium pr-2">Simple, fast, and secure link shortening</span>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Tiny<span className="text-indigo-600">Link</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Transform your long URLs into manageable, trackable short links.
            Monitor clicks and optimize your sharing strategy.
          </p>
        </header>

        <Suspense fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        }>
          <LinkDashboard />
        </Suspense>

        <footer className="mt-20 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} TinyLink. Built with Next.js & Prisma.</p>
        </footer>
      </div>
    </main>
  )
}
