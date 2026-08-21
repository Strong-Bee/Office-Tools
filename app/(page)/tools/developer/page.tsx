// app/(pages)/tools/developer/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCode,
    faArrowLeft,
    faStar,
    faArrowRight,
    faQrcode,
    faKey,
    faTextHeight,
    faHashtag,
    faFont,
    faLink,
    faBaseball,
    faCalculator,
    faPalette,
    faBarcode,
    faClock,
    faSquare,
    faCheck
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
            slug: 'qr-code-generator',
            popularity: 92,
            color: 'from-teal-500 to-teal-600',
            bg: 'bg-teal-50',
            text: 'text-teal-600'
        },
        {
            name: 'Barcode Generator',
            icon: faBarcode,
            description: 'Generate Barcode untuk produk dan inventaris',
            slug: 'barcode-generator',
            popularity: 78,
            color: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-50',
            text: 'text-blue-600'
        },
        {
            name: 'Password Generator',
            icon: faKey,
            description: 'Generate password yang aman dan kuat',
            slug: 'password-generator',
            popularity: 88,
            color: 'from-rose-500 to-rose-600',
            bg: 'bg-rose-50',
            text: 'text-rose-600'
        },
        {
            name: 'Text Formatter',
            icon: faTextHeight,
            description: 'Format teks dengan berbagai opsi',
            slug: 'text-formatter',
            popularity: 70,
            color: 'from-purple-500 to-purple-600',
            bg: 'bg-purple-50',
            text: 'text-purple-600'
        },
        {
            name: 'Word Counter',
            icon: faHashtag,
            description: 'Hitung jumlah kata, karakter, dan kalimat',
            slug: 'word-counter',
            popularity: 82,
            color: 'from-indigo-500 to-indigo-600',
            bg: 'bg-indigo-50',
            text: 'text-indigo-600'
        },
        {
            name: 'Character Counter',
            icon: faFont,
            description: 'Hitung karakter dengan dan tanpa spasi',
            slug: 'character-counter',
            popularity: 75,
            color: 'from-cyan-500 to-cyan-600',
            bg: 'bg-cyan-50',
            text: 'text-cyan-600'
        },
        {
            name: 'Case Converter',
            icon: faSquare,
            description: 'Konversi huruf besar/kecil dengan mudah',
            slug: 'case-converter',
            popularity: 68,
            color: 'from-amber-500 to-amber-600',
            bg: 'bg-amber-50',
            text: 'text-amber-600'
        },
        {
            name: 'URL Encoder/Decoder',
            icon: faLink,
            description: 'Encode dan decode URL dengan aman',
            slug: 'url-encoder-decoder',
            popularity: 80,
            color: 'from-emerald-500 to-emerald-600',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600'
        },
        {
            name: 'Base64 Encoder/Decoder',
            icon: faBaseball,
            description: 'Encode dan decode Base64',
            slug: 'base64-encoder-decoder',
            popularity: 85,
            color: 'from-fuchsia-500 to-fuchsia-600',
            bg: 'bg-fuchsia-50',
            text: 'text-fuchsia-600'
        },
        {
            name: 'JSON Formatter',
            icon: faCode,
            description: 'Format dan validasi JSON dengan mudah',
            slug: 'json-formatter',
            popularity: 90,
            color: 'from-yellow-500 to-yellow-600',
            bg: 'bg-yellow-50',
            text: 'text-yellow-600'
        },
        {
            name: 'JSON Validator',
            icon: faCheck,
            description: 'Validasi struktur JSON',
            slug: 'json-validator',
            popularity: 82,
            color: 'from-lime-500 to-lime-600',
            bg: 'bg-lime-50',
            text: 'text-lime-600'
        },
        {
            name: 'Timestamp Converter',
            icon: faClock,
            description: 'Konversi timestamp ke tanggal dan sebaliknya',
            slug: 'timestamp-converter',
            popularity: 72,
            color: 'from-sky-500 to-sky-600',
            bg: 'bg-sky-50',
            text: 'text-sky-600'
        },
        {
            name: 'Unit Converter',
            icon: faCalculator,
            description: 'Konversi berbagai satuan dengan mudah',
            slug: 'unit-converter',
            popularity: 76,
            color: 'from-violet-500 to-violet-600',
            bg: 'bg-violet-50',
            text: 'text-violet-600'
        },
        {
            name: 'Color Converter',
            icon: faPalette,
            description: 'Konversi warna antar format',
            slug: 'color-converter',
            popularity: 70,
            color: 'from-pink-500 to-pink-600',
            bg: 'bg-pink-50',
            text: 'text-pink-600'
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
                                {developerTools.length} tools untuk membantu pekerjaan coding dan development Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {developerTools.map((tool, index) => (
                            <Link
                                key={index}
                                href={`/tools/developer/${tool.slug}`}
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
                                <p className="text-sm text-gray-500">{tool.description}</p>

                                <div className="mt-4 flex items-center text-teal-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                                    Try Now
                                    <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 ml-2" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}