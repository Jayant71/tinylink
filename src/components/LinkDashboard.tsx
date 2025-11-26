'use client'

import { useState, useEffect } from 'react'
import AddLinkForm from './AddLinkForm'
import LinkTable from './LinkTable'

export interface Link {
    id: string
    code: string
    targetUrl: string
    totalClicks: number
    lastClicked: string | null
    createdAt: string
    updatedAt: string
}

export default function LinkDashboard() {
    const [links, setLinks] = useState<Link[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    const fetchLinks = async () => {
        try {
            const response = await fetch('/api/links')
            const data = await response.json()
            setLinks(data)
        } catch (error) {
            console.error('Error fetching links:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLinks()
    }, [])

    const filteredLinks = links.filter(
        (link) =>
            link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            link.targetUrl.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <div className="sticky top-8">
                    <AddLinkForm onLinkCreated={fetchLinks} />
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4">
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search your links..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900 bg-white placeholder-gray-400"
                        />
                    </div>
                    <div className="text-sm text-gray-500 font-medium whitespace-nowrap">
                        {filteredLinks.length} Links
                    </div>
                </div>

                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-500">Loading your links...</p>
                    </div>
                ) : filteredLinks.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No links found</h3>
                        <p className="mt-1 text-gray-500">
                            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first short link.'}
                        </p>
                    </div>
                ) : (
                    <LinkTable links={filteredLinks} onDelete={fetchLinks} />
                )}
            </div>
        </div>
    )
}
