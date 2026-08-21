// app/(pages)/tools/developer/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCode,
    faArrowLeft,
    faCheck,
    faStar,
    faUpload,
    faQrcode,
    faKey,
    faTextHeight,
    faHashtag,
    faFont,
    faLink,
    faBaseball,
    faCode as faCodeIcon,
    faCalculator,
    faPalette,
    faBarcode,
    faClock,
    faSquare
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DeveloperToolsPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const developerTools = [
        {
            name: 'QR Code Generator',
            icon: faQrcode,
            description: 'Generate QR Code untuk berbagai keperluan',
            color: 'from-teal-500 to-teal-600',
            bg: 'bg-teal-50',
            text: 'text-teal-600',
            features: [
                'Custom size & color',
                'Multiple formats',
                'Download as PNG/SVG',
                'Batch generation'
            ],
            popularity: 92
        },
        {
            name: 'Barcode Generator',
            icon: faBarcode,
            description: 'Generate Barcode untuk produk dan inventaris',
            color: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-50',
            text: 'text-blue-600',
            features: [
                'Multiple barcode types',
                'Custom size',
                'Export as image',
                'Batch processing'
            ],
            popularity: 78
        },
        {
            name: 'Password Generator',
            icon: faKey,
            description: 'Generate password yang aman dan kuat',
            color: 'from-rose-500 to-rose-600',
            bg: 'bg-rose-50',
            text: 'text-rose-600',
            features: [
                'Custom length',
                'Include symbols & numbers',
                'Copy to clipboard',
                'Password strength indicator'
            ],
            popularity: 88
        },
        {
            name: 'Text Formatter',
            icon: faTextHeight,
            description: 'Format teks dengan berbagai opsi',
            color: 'from-purple-500 to-purple-600',
            bg: 'bg-purple-50',
            text: 'text-purple-600',
            features: [
                'Remove extra spaces',
                'Fix line breaks',
                'Capitalize text',
                'Clean formatting'
            ],
            popularity: 70
        },
        {
            name: 'Word Counter',
            icon: faHashtag,
            description: 'Hitung jumlah kata, karakter, dan kalimat',
            color: 'from-indigo-500 to-indigo-600',
            bg: 'bg-indigo-50',
            text: 'text-indigo-600',
            features: [
                'Word count',
                'Character count',
                'Sentence count',
                'Reading time estimate'
            ],
            popularity: 82
        },
        {
            name: 'Character Counter',
            icon: faFont,
            description: 'Hitung karakter dengan dan tanpa spasi',
            color: 'from-cyan-500 to-cyan-600',
            bg: 'bg-cyan-50',
            text: 'text-cyan-600',
            features: [
                'With & without spaces',
                'Count letters & numbers',
                'Count special characters',
                'Real-time counting'
            ],
            popularity: 75
        },
        {
            name: 'Case Converter',
            icon: faSquare,
            description: 'Konversi huruf besar/kecil dengan mudah',
            color: 'from-amber-500 to-amber-600',
            bg: 'bg-amber-50',
            text: 'text-amber-600',
            features: [
                'UPPER CASE',
                'lower case',
                'Title Case',
                'sentence case'
            ],
            popularity: 68
        },
        {
            name: 'URL Encoder/Decoder',
            icon: faLink,
            description: 'Encode dan decode URL dengan aman',
            color: 'from-emerald-500 to-emerald-600',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            features: [
                'Encode URLs',
                'Decode URLs',
                'Handle special characters',
                'Batch processing'
            ],
            popularity: 80
        },
        {
            name: 'Base64 Encoder/Decoder',
            icon: faBaseball,
            description: 'Encode dan decode Base64',
            color: 'from-fuchsia-500 to-fuchsia-600',
            bg: 'bg-fuchsia-50',
            text: 'text-fuchsia-600',
            features: [
                'Encode text/file',
                'Decode Base64',
                'Copy to clipboard',
                'Download result'
            ],
            popularity: 85
        },
        {
            name: 'JSON Formatter',
            icon: faCodeIcon,
            description: 'Format dan validasi JSON dengan mudah',
            color: 'from-yellow-500 to-yellow-600',
            bg: 'bg-yellow-50',
            text: 'text-yellow-600',
            features: [
                'Pretty print JSON',
                'Minify JSON',
                'JSON validation',
                'Syntax highlighting'
            ],
            popularity: 90
        },
        {
            name: 'JSON Validator',
            icon: faCheck,
            description: 'Validasi struktur JSON',
            color: 'from-lime-500 to-lime-600',
            bg: 'bg-lime-50',
            text: 'text-lime-600',
            features: [
                'Validate JSON syntax',
                'Show error location',
                'Fix common issues',
                'Schema validation'
            ],
            popularity: 82
        },
        {
            name: 'Timestamp Converter',
            icon: faClock,
            description: 'Konversi timestamp ke tanggal dan sebaliknya',
            color: 'from-sky-500 to-sky-600',
            bg: 'bg-sky-50',
            text: 'text-sky-600',
            features: [
                'Unix timestamp',
                'Date to timestamp',
                'Multiple timezone',
                'Copy to clipboard'
            ],
            popularity: 72
        },
        {
            name: 'Unit Converter',
            icon: faCalculator,
            description: 'Konversi berbagai satuan dengan mudah',
            color: 'from-violet-500 to-violet-600',
            bg: 'bg-violet-50',
            text: 'text-violet-600',
            features: [
                'Length conversion',
                'Weight conversion',
                'Temperature conversion',
                'Area conversion'
            ],
            popularity: 76
        },
        {
            name: 'Color Converter',
            icon: faPalette,
            description: 'Konversi warna antar format',
            color: 'from-pink-500 to-pink-600',
            bg: 'bg-pink-50',
            text: 'text-pink-600',
            features: [
                'HEX ⇄ RGB',
                'HEX ⇄ HSL',
                'Color preview',
                'Copy color code'
            ],
            popularity: 70
        }
    ];

    const categories = [
        {
            name: 'Code & Data', count: developerTools.filter(t =>
                t.name.includes('JSON') || t.name.includes('Base64') || t.name.includes('URL')
            ).length
        },
        {
            name: 'Text & Format', count: developerTools.filter(t =>
                t.name.includes('Text') || t.name.includes('Case') || t.name.includes('Word') || t.name.includes('Character')
            ).length
        },
        {
            name: 'Generate', count: developerTools.filter(t =>
                t.name.includes('Generator') || t.name.includes('QR') || t.name.includes('Barcode') || t.name.includes('Password')
            ).length
        },
        {
            name: 'Convert', count: developerTools.filter(t =>
                t.name.includes('Converter')
            ).length
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-transparent to-purple-50/50" />
                <div className="absolute top-20 right-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

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
                            <div className="inline-flex items-center gap-3 bg-teal-50 text-teal-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
                                Developer Tools
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                <span className="bg-gradient-to-r from-teal-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                                    Developer Tools
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Utilitas lengkap untuk developer dan programmer. {developerTools.length} tools tersedia
                                untuk membantu pekerjaan coding dan development Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {developerTools.map((tool, index) => (
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

                                <button className="w-full bg-gradient-to-r from-teal-500 to-purple-600 text-white px-4 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">💻 Developer Essentials</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Tools yang wajib dimiliki oleh setiap developer
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={faCodeIcon} className="w-7 h-7 text-yellow-600" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">JSON & Data</h3>
                            <p className="text-sm text-gray-500">Format, validasi, dan manipulasikan data</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={faKey} className="w-7 h-7 text-rose-600" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Security</h3>
                            <p className="text-sm text-gray-500">Generate password dan encode data</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={faQrcode} className="w-7 h-7 text-teal-600" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Generation</h3>
                            <p className="text-sm text-gray-500">QR Code, Barcode, dan berbagai generator</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}