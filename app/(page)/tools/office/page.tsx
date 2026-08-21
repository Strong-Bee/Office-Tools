// app/(pages)/tools/office/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileExcel,
    faArrowLeft,
    faCheck,
    faStar,
    faUpload,
    faTable,
    faFileCsv,
    faFilePowerpoint,
    faFileWord,
    faArrowsRotate,
    faDownload,
    faUpload as faUploadIcon,
    faChartSimple,
    faSliders,
    faGear
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function OfficeToolsPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const officeTools = [
        {
            name: 'Excel Utilities',
            icon: faTable,
            description: 'Utilitas lengkap untuk file Excel',
            color: 'from-green-500 to-green-600',
            bg: 'bg-green-50',
            text: 'text-green-600',
            features: [
                'Merge Excel files',
                'Split Excel sheets',
                'Convert Excel formats',
                'Data validation'
            ],
            popularity: 88
        },
        {
            name: 'CSV Utilities',
            icon: faFileCsv,
            description: 'Utilitas untuk file CSV',
            color: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-50',
            text: 'text-blue-600',
            features: [
                'CSV to Excel',
                'Excel to CSV',
                'CSV validation',
                'Batch processing'
            ],
            popularity: 82
        },
        {
            name: 'Spreadsheet Converter',
            icon: faArrowsRotate,
            description: 'Konversi antar format spreadsheet',
            color: 'from-emerald-500 to-emerald-600',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            features: [
                'XLS ⇄ XLSX',
                'ODS support',
                'Preserve formatting',
                'Batch convert'
            ],
            popularity: 78
        },
        {
            name: 'PowerPoint Utilities',
            icon: faFilePowerpoint,
            description: 'Utilitas untuk presentasi PowerPoint',
            color: 'from-orange-500 to-orange-600',
            bg: 'bg-orange-50',
            text: 'text-orange-600',
            features: [
                'PPT to PDF',
                'PDF to PPT',
                'Slide extraction',
                'Format preserving'
            ],
            popularity: 75
        },
        {
            name: 'Presentation Converter',
            icon: faSliders,
            description: 'Konversi format presentasi',
            color: 'from-amber-500 to-amber-600',
            bg: 'bg-amber-50',
            text: 'text-amber-600',
            features: [
                'PPT ⇄ PPTX',
                'Keynote support',
                'Google Slides support',
                'Format compatibility'
            ],
            popularity: 70
        },
        {
            name: 'Document Format Converter',
            icon: faGear,
            description: 'Konversi berbagai format dokumen',
            color: 'from-indigo-500 to-indigo-600',
            bg: 'bg-indigo-50',
            text: 'text-indigo-600',
            features: [
                'DOC ⇄ DOCX',
                'ODT support',
                'RTF conversion',
                'Batch processing'
            ],
            popularity: 72
        }
    ];

    const categories = [
        { name: 'Excel', count: officeTools.filter(t => t.name.includes('Excel') || t.name.includes('Spreadsheet')).length },
        { name: 'PowerPoint', count: officeTools.filter(t => t.name.includes('PowerPoint') || t.name.includes('Presentation')).length },
        { name: 'Convert', count: officeTools.filter(t => t.name.includes('Converter')).length },
        { name: 'Utilities', count: officeTools.filter(t => t.name.includes('Utilities')).length },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-orange-50/50" />
                <div className="absolute top-20 right-20 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

                <div className="container mx-auto relative">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/tools"
                            className={`inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                            Back to All Tools
                        </Link>

                        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <div className="inline-flex items-center gap-3 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <FontAwesomeIcon icon={faFileExcel} className="w-4 h-4" />
                                Office Tools
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-orange-500 bg-clip-text text-transparent">
                                    Office Tools
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Utilitas lengkap untuk Excel, PowerPoint, CSV, dan berbagai format dokumen perkantoran.
                                {officeTools.length} tools tersedia untuk kebutuhan office Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {officeTools.map((tool, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 group ${isVisible ? 'animate-slideUp' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center`}>
                                        <FontAwesomeIcon icon={tool.icon} className={`w-6 h-6 ${tool.text}`} />
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-400">
                                        <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-yellow-400" />
                                        <span>{tool.popularity}%</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-800 mb-2">{tool.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{tool.description}</p>

                                <div className="space-y-1.5 mb-4">
                                    {tool.features.slice(0, 4).map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                                            <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-green-500 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                                    <FontAwesomeIcon icon={faUpload} className="w-4 h-4" />
                                    Try Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Highlight */}
            <section className="py-16 px-4 bg-white/50">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">💼 Why Office Tools?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Solusi lengkap untuk semua kebutuhan dokumen perkantoran Anda
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={faFileExcel} className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Excel & CSV</h3>
                            <p className="text-sm text-gray-500">Kelola spreadsheet dan data dengan mudah</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={faFilePowerpoint} className="w-7 h-7 text-orange-600" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">PowerPoint</h3>
                            <p className="text-sm text-gray-500">Konversi dan kelola presentasi</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={faFileWord} className="w-7 h-7 text-indigo-600" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Document Converter</h3>
                            <p className="text-sm text-gray-500">Konversi berbagai format dokumen</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}