'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface LinkData {
    id: string
    code: string
    targetUrl: string
    totalClicks: number
    lastClicked: string | null
    createdAt: string
    updatedAt: string
}

export default function StatsPage() {
    const params = useParams()
    const router = useRouter()
    const [link, setLink] = useState<LinkData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchLink = async () => {
            const code = params.code as string
            if (!code) return

            try {
                const response = await fetch(`/api/links/${code}`)
                if (!response.ok) {
                    setError('Link not found')
                    setLoading(false)
                    return
                }

                const data = await response.json()
                setLink(data)
            } catch (err) {
                setError('Failed to load link')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchLink()
    }, [params.code])

    const formatDate = (date: string | null) => {
        if (!date) return 'Never'
        return new Date(date).toLocaleString(undefined, {
            dateStyle: 'long',
            timeStyle: 'medium',
        })
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </main>
        )
    }

    if (error || !link) {
        return (
            <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                    <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{error || 'Link not found'}</h2>
                    <p className="text-gray-500 mb-6">The link you are looking for does not exist or has been removed.</p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors w-full"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </main>
        )
    }

    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/${link.code}`

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8 font-medium transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-indigo-600 px-8 py-8 text-white">
                        <h1 className="text-3xl font-bold mb-2">Link Statistics</h1>
                        <p className="text-indigo-100">Detailed performance metrics for your short link.</p>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Main Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                    Short URL
                                </h2>
                                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <a
                                        href={shortUrl}
                                        className="text-lg font-mono text-indigo-600 hover:underline break-all font-medium"
                                    >
                                        {shortUrl}
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                    Target URL
                                </h2>
                                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <a
                                        href={link.targetUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-base text-gray-700 hover:text-indigo-600 hover:underline break-all truncate block"
                                    >
                                        {link.targetUrl}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100 flex items-center gap-4">
                                <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500 mb-1">
                                        Total Clicks
                                    </h2>
                                    <p className="text-3xl font-bold text-indigo-900">
                                        {link.totalClicks.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 flex items-center gap-4">
                                <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500 mb-1">
                                        Last Activity
                                    </h2>
                                    <p className="text-lg font-semibold text-emerald-900">
                                        {link.lastClicked ? new Date(link.lastClicked).toLocaleDateString() : 'Never'}
                                    </p>
                                    <p className="text-xs text-emerald-700">
                                        {link.lastClicked ? new Date(link.lastClicked).toLocaleTimeString() : ''}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm text-gray-500">
                            <div>
                                <span className="font-medium text-gray-700">Created:</span> {formatDate(link.createdAt)}
                            </div>
                            <div className="text-right">
                                <span className="font-medium text-gray-700">Last Updated:</span> {formatDate(link.updatedAt)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
