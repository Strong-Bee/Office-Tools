// app/(pages)/roadmap/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faClock,
    faCalendarAlt,
    faRocket,
    faArrowRight,
    faCheck,
    faSpinner,
    faCircle
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RoadmapPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const roadmap = {
        completed: [
            {
                phase: 'Phase 1 — Core Tools',
                description: 'Fondasi dasar Office Tools dengan tools PDF dan Image',
                items: [
                    'PDF: Merge, Split, Compress, Convert',
                    'Image: Compress, Resize, Convert'
                ],
                date: 'Q1 2024'
            },
            {
                phase: 'Phase 2 — Office Integration',
                description: 'Integrasi dengan format dokumen perkantoran',
                items: [
                    'Word document support',
                    'Excel spreadsheet support',
                    'PowerPoint presentation support',
                    'CSV file processing',
                    'TXT file utilities'
                ],
                date: 'Q2 2024'
            }
        ],
        inProgress: [
            {
                phase: 'Phase 3 — Productivity Tools',
                description: 'Tools untuk meningkatkan produktivitas sehari-hari',
                items: [
                    'QR Code Generator',
                    'Password Generator',
                    'Text Tools & Formatter',
                    'Developer Utilities',
                    'Unit Converter'
                ],
                date: 'Q3 2024 - In Progress'
            }
        ],
        planned: [
            {
                phase: 'Phase 4 — Platform Expansion',
                description: 'Membangun ekosistem platform yang lebih luas',
                items: [
                    'User Accounts & Profiles',
                    'Processing History',
                    'Batch Processing',
                    'Cloud Storage Integration',
                    'REST API',
                    'Admin Dashboard'
                ],
                date: 'Q4 2024'
            },
            {
                phase: 'Phase 5 — Advanced Features',
                description: 'Fitur canggih dengan teknologi AI dan otomatisasi',
                items: [
                    'AI Document Processing',
                    'OCR (Optical Character Recognition)',
                    'Document Summarization',
                    'AI PDF Assistant',
                    'Smart File Conversion',
                    'Workflow Automation'
                ],
                date: '2025'
            }
        ]
    };

    const timelineEvents = [
        { year: '2024', events: ['Launch Core Tools', 'Office Integration', 'Productivity Tools'] },
        { year: '2025', events: ['Platform Expansion', 'AI Features', 'Advanced Automation'] }
    ];

    const getStatusIcon = (status: 'completed' | 'inProgress' | 'planned') => {
        switch (status) {
            case 'completed':
                return faCheckCircle;
            case 'inProgress':
                return faSpinner;
            default:
                return faCircle;
        }
    };

    const getStatusColor = (status: 'completed' | 'inProgress' | 'planned') => {
        switch (status) {
            case 'completed':
                return 'text-green-500';
            case 'inProgress':
                return 'text-yellow-500';
            default:
                return 'text-gray-400';
        }
    };

    const getStatusBadge = (status: 'completed' | 'inProgress' | 'planned') => {
        switch (status) {
            case 'completed':
                return { label: '✅ Completed', bg: 'bg-green-100 text-green-700' };
            case 'inProgress':
                return { label: '🔄 In Progress', bg: 'bg-yellow-100 text-yellow-700' };
            default:
                return { label: '📋 Planned', bg: 'bg-gray-100 text-gray-600' };
        }
    };

    const allItems = [
        ...roadmap.completed.map(item => ({ ...item, status: 'completed' as const })),
        ...roadmap.inProgress.map(item => ({ ...item, status: 'inProgress' as const })),
        ...roadmap.planned.map(item => ({ ...item, status: 'planned' as const }))
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50" />
                <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

                <div className="container mx-auto relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className={`inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4" />
                            Product Roadmap
                        </div>

                        <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Our Journey
                            </span>
                        </h1>

                        <p className={`text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            The roadmap to build the ultimate productivity platform
                        </p>
                    </div>
                </div>
            </section>

            {/* Progress Stats */}
            <section className="py-8 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-green-600">{roadmap.completed.length}</div>
                            <div className="text-sm text-gray-500">Completed</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-yellow-600">{roadmap.inProgress.length}</div>
                            <div className="text-sm text-gray-500">In Progress</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-gray-400">{roadmap.planned.length}</div>
                            <div className="text-sm text-gray-500">Planned</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-blue-600">{allItems.length}</div>
                            <div className="text-sm text-gray-500">Total Phases</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roadmap Timeline */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto">
                        {allItems.map((item, index) => {
                            const statusBadge = getStatusBadge(item.status);
                            return (
                                <div
                                    key={index}
                                    className={`relative pl-8 pb-12 last:pb-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                                        }`}
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    {/* Timeline line */}
                                    {index < allItems.length - 1 && (
                                        <div className="absolute left-0 top-8 bottom-0 w-0.5 bg-gray-200" />
                                    )}

                                    {/* Timeline dot */}
                                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transform -translate-x-1/2" />

                                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 ml-4">
                                        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">{item.phase}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-gray-400">
                                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                                    {item.date}
                                                </span>
                                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusBadge.bg}`}>
                                                    {statusBadge.label}
                                                </span>
                                            </div>
                                        </div>

                                        <ul className="space-y-2 mt-3">
                                            {item.items.map((subItem, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                                    <FontAwesomeIcon
                                                        icon={item.status === 'completed' ? faCheck : faCircle}
                                                        className={`w-3 h-3 mt-1 ${getStatusColor(item.status)}`}
                                                    />
                                                    <span>{subItem}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline Overview */}
            <section className="py-16 px-4 bg-white/50">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">📅 Timeline Overview</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Key milestones and deliverables planned for each year
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {timelineEvents.map((event, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100">
                                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                    {event.year}
                                </div>
                                <ul className="space-y-3">
                                    {event.events.map((e, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-600">
                                            <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-500" />
                                            <span>{e}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto text-center">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <FontAwesomeIcon icon={faRocket} className="w-4 h-4" />
                            Future Vision
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">🚀 Beyond 2025</h2>
                        <p className="text-xl text-blue-100 mb-6">
                            Menjadi platform productivity terlengkap dengan teknologi AI dan otomatisasi cerdas.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">AI Powered</span>
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Smart Automation</span>
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Cloud Native</span>
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Enterprise Ready</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="max-w-2xl mx-auto text-center bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">💡 Have Suggestions?</h2>
                        <p className="text-gray-600 mb-8">
                            Help us shape the future of Office Tools. Share your ideas and feature requests.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="https://github.com"
                                target="_blank"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-xl transition-all hover:scale-105"
                            >
                                Submit Feedback
                                <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}