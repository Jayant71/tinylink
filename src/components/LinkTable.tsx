'use client'

import { useState } from 'react'
import { Link } from './LinkDashboard'
import { useRouter } from 'next/navigation'

interface LinkTableProps {
    links: Link[]
    onDelete: () => void
}

export default function LinkTable({ links, onDelete }: LinkTableProps) {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [copiedCode, setCopiedCode] = useState<string | null>(null)

    const handleDelete = async (code: string) => {
        if (!confirm('Are you sure you want to delete this link?')) return

        setDeletingId(code)
        try {
            await fetch(`/api/links/${code}`, { method: 'DELETE' })
            onDelete()
        } catch (error) {
            alert('Failed to delete link')
        } finally {
            setDeletingId(null)
        }
    }

    const getFullUrl = (code: string) => {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
        return `${baseUrl}/${code}`
    }

    const copyToClipboard = async (code: string) => {
        const url = getFullUrl(code)
        await navigator.clipboard.writeText(url)
        setCopiedCode(code)
        setTimeout(() => setCopiedCode(null), 2000)
    }

    const formatDate = (date: string | null) => {
        if (!date) return 'Never'
        return new Date(date).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        })
    }

    const truncateUrl = (url: string, maxLength = 40) => {
        return url.length > maxLength ? url.substring(0, maxLength) + '...' : url
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Short Code
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Short URL
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Target URL
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Clicks
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Last Clicked
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {links.map((link) => {
                            const fullUrl = getFullUrl(link.code)
                            return (
                                <tr key={link.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
                                                {link.code}
                                            </span>
                                            <button
                                                onClick={() => copyToClipboard(link.code)}
                                                className="text-gray-400 hover:text-indigo-600 transition-colors"
                                                title="Copy link"
                                            >
                                                {copiedCode === link.code ? (
                                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2v2h-6V5z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a
                                            href={fullUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-indigo-600 hover:text-indigo-900 font-medium hover:underline flex items-center gap-1"
                                        >
                                            {fullUrl}
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center max-w-xs" title={link.targetUrl}>
                                            <img
                                                src={`https://www.google.com/s2/favicons?domain=${link.targetUrl}&sz=32`}
                                                alt=""
                                                className="w-4 h-4 mr-2 flex-shrink-0"
                                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                            />
                                            <a
                                                href={link.targetUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-gray-600 hover:text-gray-900 truncate"
                                            >
                                                {truncateUrl(link.targetUrl)}
                                            </a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {link.totalClicks} clicks
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(link.lastClicked)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => router.push(`/code/${link.code}`)}
                                                className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                                title="View Stats"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(link.code)}
                                                disabled={deletingId === link.code}
                                                className="text-red-400 hover:text-red-600 disabled:text-gray-300 transition-colors"
                                                title="Delete Link"
                                            >
                                                {deletingId === link.code ? (
                                                    <div className="animate-spin h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full" />
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
