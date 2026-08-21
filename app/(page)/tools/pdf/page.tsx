// app/(pages)/tools/pdf/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilePdf,
    faArrowLeft,
    faCheck,
    faClock,
    faStar,
    faDownload,
    faUpload,
    faLock,
    faUnlock,
    faWater,
    faSort,
    faTrash,
    faArrowsRotate,
    faFileWord,
    faFileExcel,
    faFilePowerpoint,
    faImage,
    faPlus,
    faMinus,
    faGrip,
    faCopy,
    faScissors
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
        {
            name: 'Merge PDF',
            icon: faPlus,
            description: 'Gabungkan multiple PDF menjadi satu file',
            color: 'from-red-500 to-red-600',
            bg: 'bg-red-50',
            text: 'text-red-600',
            features: ['Gabungkan 2+ file PDF', 'Urutkan file sesuai keinginan', 'Hasil merge berkualitas tinggi'],
            popularity: 95
        },
        {
            name: 'Split PDF',
            icon: faScissors,
            description: 'Pisahkan PDF menjadi beberapa file',
            color: 'from-orange-500 to-orange-600',
            bg: 'bg-orange-50',
            text: 'text-orange-600',
            features: ['Pisahkan per halaman', 'Pisahkan per range halaman', 'Ekstrak halaman tertentu'],
            popularity: 90
        },
        {
            name: 'Compress PDF',
            icon: faDownload,
            description: 'Kecilkan ukuran file PDF',
            color: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-50',
            text: 'text-blue-600',
            features: ['Kompres hingga 70%', 'Pilihan kualitas', 'Pertahankan kualitas optimal'],
            popularity: 92
        },
        {
            name: 'PDF to Word',
            icon: faFileWord,
            description: 'Konversi PDF ke dokumen Word',
            color: 'from-blue-600 to-blue-700',
            bg: 'bg-blue-50',
            text: 'text-blue-600',
            features: ['Konversi akurat', 'Pertahankan format', 'Edit langsung di Word'],
            popularity: 88
        },
        {
            name: 'PDF to Excel',
            icon: faFileExcel,
            description: 'Konversi PDF ke spreadsheet Excel',
            color: 'from-green-500 to-green-600',
            bg: 'bg-green-50',
            text: 'text-green-600',
            features: ['Ekstrak tabel', 'Konversi data', 'Format excel siap pakai'],
            popularity: 80
        },
        {
            name: 'PDF to PowerPoint',
            icon: faFilePowerpoint,
            description: 'Konversi PDF ke presentasi',
            color: 'from-orange-600 to-orange-700',
            bg: 'bg-orange-50',
            text: 'text-orange-600',
            features: ['Setiap halaman jadi slide', 'Pertahankan layout', 'Edit presentasi'],
            popularity: 75
        },
        {
            name: 'Word to PDF',
            icon: faFilePdf,
            description: 'Konversi Word ke PDF',
            color: 'from-red-500 to-red-600',
            bg: 'bg-red-50',
            text: 'text-red-600',
            features: ['Konversi DOC/DOCX', 'Pertahankan format', 'Hasil PDF profesional'],
            popularity: 85
        },
        {
            name: 'Excel to PDF',
            icon: faFilePdf,
            description: 'Konversi Excel ke PDF',
            color: 'from-green-500 to-green-600',
            bg: 'bg-green-50',
            text: 'text-green-600',
            features: ['Konversi XLS/XLSX', 'Pertahankan tabel', 'Hasil PDF rapi'],
            popularity: 78
        },
        {
            name: 'PowerPoint to PDF',
            icon: faFilePdf,
            description: 'Konversi PowerPoint ke PDF',
            color: 'from-orange-500 to-orange-600',
            bg: 'bg-orange-50',
            text: 'text-orange-600',
            features: ['Konversi PPT/PPTX', 'Pertahankan slide', 'Hasil PDF berkualitas'],
            popularity: 72
        },
        {
            name: 'JPG to PDF',
            icon: faImage,
            description: 'Konversi gambar ke PDF',
            color: 'from-purple-500 to-purple-600',
            bg: 'bg-purple-50',
            text: 'text-purple-600',
            features: ['Support JPG/PNG', 'Multiple gambar', 'Atur ukuran halaman'],
            popularity: 82
        },
        {
            name: 'PDF to JPG',
            icon: faImage,
            description: 'Konversi PDF ke gambar',
            color: 'from-pink-500 to-pink-600',
            bg: 'bg-pink-50',
            text: 'text-pink-600',
            features: ['Export per halaman', 'Kualitas tinggi', 'Format JPG/PNG'],
            popularity: 70
        },
        {
            name: 'Rotate PDF',
            icon: faArrowsRotate,
            description: 'Putar halaman PDF',
            color: 'from-indigo-500 to-indigo-600',
            bg: 'bg-indigo-50',
            text: 'text-indigo-600',
            features: ['Putar 90°/180°/270°', 'Putar per halaman', 'Putar semua halaman'],
            popularity: 68
        },
        {
            name: 'Delete PDF Pages',
            icon: faTrash,
            description: 'Hapus halaman tertentu dari PDF',
            color: 'from-red-600 to-red-700',
            bg: 'bg-red-50',
            text: 'text-red-600',
            features: ['Hapus halaman tertentu', 'Hapus range halaman', 'Preview hasil'],
            popularity: 65
        },
        {
            name: 'Extract PDF Pages',
            icon: faCopy,
            description: 'Ekstrak halaman tertentu dari PDF',
            color: 'from-teal-500 to-teal-600',
            bg: 'bg-teal-50',
            text: 'text-teal-600',
            features: ['Ekstrak halaman tertentu', 'Ekstrak range halaman', 'Buat PDF baru'],
            popularity: 62
        },
        {
            name: 'Reorder PDF Pages',
            icon: faSort,
            description: 'Urutkan ulang halaman PDF',
            color: 'from-cyan-500 to-cyan-600',
            bg: 'bg-cyan-50',
            text: 'text-cyan-600',
            features: ['Drag & drop pages', 'Urutkan manual', 'Preview hasil'],
            popularity: 60
        },
        {
            name: 'Protect PDF',
            icon: faLock,
            description: 'Tambahkan password ke PDF',
            color: 'from-amber-500 to-amber-600',
            bg: 'bg-amber-50',
            text: 'text-amber-600',
            features: ['Password protection', 'Enkripsi kuat', 'Batasi akses'],
            popularity: 78
        },
        {
            name: 'Unlock PDF',
            icon: faUnlock,
            description: 'Buka password PDF',
            color: 'from-emerald-500 to-emerald-600',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            features: ['Hapus password', 'Akses full PDF', 'Proses cepat'],
            popularity: 72
        },
        {
            name: 'Add Watermark',
            icon: faWater,
            description: 'Tambahkan watermark ke PDF',
            color: 'from-sky-500 to-sky-600',
            bg: 'bg-sky-50',
            text: 'text-sky-600',
            features: ['Text watermark', 'Image watermark', 'Atur posisi & opacity'],
            popularity: 66
        },
        {
            name: 'Add Page Numbers',
            icon: faGrip,
            description: 'Tambahkan nomor halaman ke PDF',
            color: 'from-violet-500 to-violet-600',
            bg: 'bg-violet-50',
            text: 'text-violet-600',
            features: ['Nomor otomatis', 'Atur posisi', 'Custom format'],
            popularity: 58
        }
    ];

    const categories = [
        { name: 'All', count: pdfTools.length },
        { name: 'Merge & Split', count: pdfTools.filter(t => ['Merge PDF', 'Split PDF'].includes(t.name)).length },
        { name: 'Convert', count: pdfTools.filter(t => t.name.includes('to') || t.name.includes('to')).length },
        { name: 'Edit', count: pdfTools.filter(t => ['Rotate PDF', 'Delete PDF Pages', 'Extract PDF Pages', 'Reorder PDF Pages'].includes(t.name)).length },
        { name: 'Security', count: pdfTools.filter(t => ['Protect PDF', 'Unlock PDF'].includes(t.name)).length },
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
                                <span className="bg-gradient-to-r from-red-600 via-orange-500 to-purple-600 bg-clip-text text-transparent">
                                    PDF Tools
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Kelola, konversi, dan edit file PDF dengan mudah. {pdfTools.length} tools tersedia untuk semua kebutuhan PDF Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pdfTools.map((tool, index) => (
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
                                    {tool.features.slice(0, 3).map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                                            <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-green-500 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full bg-gradient-to-r from-red-500 to-purple-600 text-white px-4 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                                    <FontAwesomeIcon icon={faUpload} className="w-4 h-4" />
                                    Try Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}