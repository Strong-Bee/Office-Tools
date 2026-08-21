// app/(pages)/tools/documents/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileWord,
    faArrowLeft,
    faCheck,
    faStar,
    faUpload,
    faFileAlt,
    faFileLines,
    faFile,
    faCompress,
    faCopy,
    faScissors,
    faArrowsRotate,
    faFileExport,
    faFileImport,
    faTextHeight,
    faFileSignature,
    faFilePen,
    faFileArrowUp,
    faFileArrowDown,
    faBars
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DocumentToolsPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const documentTools = [
        {
            name: 'Word Document Converter',
            icon: faFileAlt,
            description: 'Konversi antar berbagai format dokumen Word',
            color: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-50',
            text: 'text-blue-600',
            features: [
                'DOC ⇄ DOCX',
                'DOCX ⇄ ODT',
                'Support RTF format',
                'Preserve formatting'
            ],
            popularity: 92
        },
        {
            name: 'Text Extraction',
            icon: faFileLines,
            description: 'Ekstrak teks dari berbagai jenis dokumen',
            color: 'from-indigo-500 to-indigo-600',
            bg: 'bg-indigo-50',
            text: 'text-indigo-600',
            features: [
                'Extract from PDF',
                'Extract from DOCX',
                'Extract from images (OCR)',
                'Copy to clipboard'
            ],
            popularity: 85
        },
        {
            name: 'Document Compressor',
            icon: faCompress,
            description: 'Kompres ukuran dokumen tanpa mengurangi kualitas',
            color: 'from-green-500 to-green-600',
            bg: 'bg-green-50',
            text: 'text-green-600',
            features: [
                'Compress DOCX files',
                'Reduce file size up to 70%',
                'Maintain quality',
                'Batch processing'
            ],
            popularity: 88
        },
        {
            name: 'Document Merger',
            icon: faCopy,
            description: 'Gabungkan beberapa dokumen menjadi satu file',
            color: 'from-purple-500 to-purple-600',
            bg: 'bg-purple-50',
            text: 'text-purple-600',
            features: [
                'Merge multiple DOCX',
                'Merge with PDF',
                'Preserve formatting',
                'Order documents'
            ],
            popularity: 82
        },
        {
            name: 'Document Splitter',
            icon: faScissors,
            description: 'Pisahkan dokumen menjadi beberapa file terpisah',
            color: 'from-orange-500 to-orange-600',
            bg: 'bg-orange-50',
            text: 'text-orange-600',
            features: [
                'Split by page count',
                'Split by sections',
                'Split by chapters',
                'Export as separate files'
            ],
            popularity: 76
        },
        {
            name: 'TXT Converter',
            icon: faFile,
            description: 'Konversi dokumen ke format TXT',
            color: 'from-gray-500 to-gray-600',
            bg: 'bg-gray-50',
            text: 'text-gray-600',
            features: [
                'DOCX to TXT',
                'PDF to TXT',
                'RTF to TXT',
                'Clean formatting'
            ],
            popularity: 78
        },
        {
            name: 'DOC/DOCX Utilities',
            icon: faFilePen,
            description: 'Utilitas lengkap untuk file Word',
            color: 'from-cyan-500 to-cyan-600',
            bg: 'bg-cyan-50',
            text: 'text-cyan-600',
            features: [
                'Repair corrupted files',
                'Extract images',
                'Remove metadata',
                'Change document properties'
            ],
            popularity: 72
        },
        {
            name: 'RTF Utilities',
            icon: faFileSignature,
            description: 'Utilitas untuk file RTF',
            color: 'from-teal-500 to-teal-600',
            bg: 'bg-teal-50',
            text: 'text-teal-600',
            features: [
                'RTF to DOCX',
                'DOCX to RTF',
                'Clean RTF formatting',
                'Batch conversion'
            ],
            popularity: 68
        }
    ];

    const categories = [
        { name: 'Convert', count: documentTools.filter(t => t.name.includes('Converter') || t.name.includes('TXT')).length },
        { name: 'Split & Merge', count: documentTools.filter(t => t.name.includes('Merger') || t.name.includes('Splitter')).length },
        { name: 'Extract', count: documentTools.filter(t => t.name.includes('Extraction') || t.name.includes('Utilities')).length },
        { name: 'Compress', count: documentTools.filter(t => t.name.includes('Compressor')).length },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50" />
                <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

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
                            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <FontAwesomeIcon icon={faFileWord} className="w-4 h-4" />
                                Document Tools
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                                    Document Tools
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Konversi, kelola, dan optimasi berbagai format dokumen dengan mudah.
                                {documentTools.length} tools tersedia untuk semua kebutuhan dokumen Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Stats */}
            <section className="py-6 px-4">
                <div className="container mx-auto">
                    <div className="flex flex-wrap gap-3 max-w-4xl mx-auto">
                        {categories.map((category, index) => (
                            <div key={index} className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
                                <span className="text-sm text-gray-600">{category.name}</span>
                                <span className="ml-2 bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                                    {category.count}
                                </span>
                            </div>
                        ))}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl px-4 py-2">
                            <span className="text-sm font-medium text-gray-700">
                                Total: <span className="text-blue-600">{documentTools.length} Tools</span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {documentTools.map((tool, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 group ${isVisible ? 'animate-slideUp' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
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
                                    {tool.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                                            <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-green-500 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">📝 Why Document Tools?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Solusi lengkap untuk semua kebutuhan dokumen Anda
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={faFileExport} className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Convert</h3>
                            <p className="text-sm text-gray-500">Konversi berbagai format dokumen</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={faCopy} className="w-7 h-7 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Merge & Split</h3>
                            <p className="text-sm text-gray-500">Gabung dan pisahkan dokumen</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={faCompress} className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Compress</h3>
                            <p className="text-sm text-gray-500">Kompres ukuran dokumen</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={faFileLines} className="w-7 h-7 text-indigo-600" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Extract</h3>
                            <p className="text-sm text-gray-500">Ekstrak teks dan data</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Document Format Support */}
            <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">📋 Supported Formats</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Kami mendukung berbagai format dokumen populer
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
                        {[
                            { icon: faFileWord, name: 'DOCX', color: 'text-blue-600', bg: 'bg-blue-50' },
                            { icon: faFileWord, name: 'DOC', color: 'text-blue-500', bg: 'bg-blue-50' },
                            { icon: faFileAlt, name: 'TXT', color: 'text-gray-600', bg: 'bg-gray-50' },
                            { icon: faFileSignature, name: 'RTF', color: 'text-cyan-600', bg: 'bg-cyan-50' },
                            { icon: faFileExport, name: 'ODT', color: 'text-green-600', bg: 'bg-green-50' },
                            { icon: faFile, name: 'PDF', color: 'text-red-600', bg: 'bg-red-50' },
                        ].map((format, index) => (
                            <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100">
                                <div className={`w-10 h-10 rounded-xl ${format.bg} flex items-center justify-center mx-auto mb-2`}>
                                    <FontAwesomeIcon icon={format.icon} className={`w-5 h-5 ${format.color}`} />
                                </div>
                                <span className="text-sm font-semibold text-gray-700">{format.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-indigo-600">
                <div className="container mx-auto text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Convert Your Documents?</h2>
                    <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                        All document tools are free to use. No registration required.
                    </p>
                    <Link
                        href="/tools"
                        className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:shadow-xl transition-all hover:scale-105"
                    >
                        Browse All Tools
                        <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5 rotate-180" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}