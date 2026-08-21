// app/(pages)/tools/pdf/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilePdf,
    faArrowLeft,
    faCheck,
    faStar,
    faArrowRight,
    faUpload,
    faDownload,
    faLock,
    faUnlock,
    faWater,
    faSort,
    faTrash,
    faArrowsRotate,
    faScissors,
    faFileWord,
    faFileExcel,
    faFilePowerpoint,
    faImage,
    faPlus,
    faGrip
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PDFToolsPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const pdfTools = [
        { name: 'Merge PDF', icon: faPlus, description: 'Gabungkan multiple PDF menjadi satu file', slug: 'merge-pdf', popularity: 95, color: 'from-red-500 to-red-600', bg: 'bg-red-50', text: 'text-red-600' },
        { name: 'Split PDF', icon: faScissors, description: 'Pisahkan PDF menjadi beberapa file', slug: 'split-pdf', popularity: 90, color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', text: 'text-orange-600' },
        { name: 'Compress PDF', icon: faDownload, description: 'Kecilkan ukuran file PDF', slug: 'compress-pdf', popularity: 92, color: 'from-green-500 to-green-600', bg: 'bg-green-50', text: 'text-green-600' },
        { name: 'PDF to Word', icon: faFileWord, description: 'Konversi PDF ke dokumen Word', slug: 'pdf-to-word', popularity: 88, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-600' },
        { name: 'PDF to Excel', icon: faFileExcel, description: 'Konversi PDF ke spreadsheet Excel', slug: 'pdf-to-excel', popularity: 80, color: 'from-green-500 to-green-600', bg: 'bg-green-50', text: 'text-green-600' },
        { name: 'PDF to PowerPoint', icon: faFilePowerpoint, description: 'Konversi PDF ke presentasi', slug: 'pdf-to-powerpoint', popularity: 75, color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', text: 'text-orange-600' },
        { name: 'Word to PDF', icon: faFileWord, description: 'Konversi Word ke PDF', slug: 'word-to-pdf', popularity: 85, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-600' },
        { name: 'Excel to PDF', icon: faFileExcel, description: 'Konversi Excel ke PDF', slug: 'excel-to-pdf', popularity: 78, color: 'from-green-500 to-green-600', bg: 'bg-green-50', text: 'text-green-600' },
        { name: 'PowerPoint to PDF', icon: faFilePowerpoint, description: 'Konversi PowerPoint ke PDF', slug: 'powerpoint-to-pdf', popularity: 72, color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', text: 'text-orange-600' },
        { name: 'JPG to PDF', icon: faImage, description: 'Konversi gambar ke PDF', slug: 'jpg-to-pdf', popularity: 82, color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', text: 'text-purple-600' },
        { name: 'PDF to JPG', icon: faImage, description: 'Konversi PDF ke gambar', slug: 'pdf-to-jpg', popularity: 70, color: 'from-pink-500 to-pink-600', bg: 'bg-pink-50', text: 'text-pink-600' },
        { name: 'Rotate PDF', icon: faArrowsRotate, description: 'Putar halaman PDF', slug: 'rotate-pdf', popularity: 68, color: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50', text: 'text-indigo-600' },
        { name: 'Delete PDF Pages', icon: faTrash, description: 'Hapus halaman tertentu dari PDF', slug: 'delete-pdf-pages', popularity: 65, color: 'from-red-500 to-red-600', bg: 'bg-red-50', text: 'text-red-600' },
        { name: 'Extract PDF Pages', icon: faUpload, description: 'Ekstrak halaman tertentu dari PDF', slug: 'extract-pdf-pages', popularity: 62, color: 'from-teal-500 to-teal-600', bg: 'bg-teal-50', text: 'text-teal-600' },
        { name: 'Reorder PDF Pages', icon: faSort, description: 'Urutkan ulang halaman PDF', slug: 'reorder-pdf-pages', popularity: 60, color: 'from-cyan-500 to-cyan-600', bg: 'bg-cyan-50', text: 'text-cyan-600' },
        { name: 'Protect PDF', icon: faLock, description: 'Tambahkan password ke PDF', slug: 'protect-pdf', popularity: 78, color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', text: 'text-amber-600' },
        { name: 'Unlock PDF', icon: faUnlock, description: 'Buka password PDF', slug: 'unlock-pdf', popularity: 72, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', text: 'text-emerald-600' },
        { name: 'Add Watermark', icon: faWater, description: 'Tambahkan watermark ke PDF', slug: 'add-watermark', popularity: 66, color: 'from-sky-500 to-sky-600', bg: 'bg-sky-50', text: 'text-sky-600' },
        { name: 'Add Page Numbers', icon: faGrip, description: 'Tambahkan nomor halaman ke PDF', slug: 'add-page-numbers', popularity: 58, color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50', text: 'text-violet-600' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-purple-50/50" />
                <div className="absolute top-20 right-20 w-96 h-96 bg-red-400/10 rounded-full blur-3xl animate-pulse" />
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
                            <div className="inline-flex items-center gap-3 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <FontAwesomeIcon icon={faFilePdf} className="w-4 h-4" />
                                PDF Tools
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                                    PDF Tools
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                                {pdfTools.length} tools untuk mengelola, mengkonversi, dan mengedit file PDF Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {pdfTools.map((tool, index) => (
                            <Link
                                key={index}
                                href={`/tools/pdf/${tool.slug}`}
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

                                <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
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