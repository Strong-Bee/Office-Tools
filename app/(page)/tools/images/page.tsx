// app/(pages)/tools/images/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faImage,
    faArrowLeft,
    faCheck,
    faStar,
    faUpload,
    faCompress,
    faArrowsUpDown,
    faArrowsRotate,
    faCrop,
    faInfoCircle,
    faPalette,
    faFilePdf,
    faExpand
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ImageToolsPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const imageTools = [
        {
            name: 'Image Compressor',
            icon: faCompress,
            description: 'Kompres ukuran gambar tanpa mengurangi kualitas',
            color: 'from-purple-500 to-purple-600',
            bg: 'bg-purple-50',
            text: 'text-purple-600',
            features: ['Kompres hingga 80%', 'Pertahankan kualitas', 'Support JPG/PNG/WebP'],
            popularity: 95
        },
        {
            name: 'Image Resizer',
            icon: faExpand,
            description: 'Ubah ukuran gambar sesuai kebutuhan',
            color: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-50',
            text: 'text-blue-600',
            features: ['Ubah dimensi', 'Pertahankan aspect ratio', 'Batch processing'],
            popularity: 92
        },
        {
            name: 'Image Converter',
            icon: faArrowsUpDown,
            description: 'Konversi antar format gambar',
            color: 'from-green-500 to-green-600',
            bg: 'bg-green-50',
            text: 'text-green-600',
            features: ['JPG ⇄ PNG', 'Support WebP', 'Kualitas tinggi'],
            popularity: 88
        },
        {
            name: 'JPG to PNG',
            icon: faImage,
            description: 'Konversi JPG ke PNG dengan transparansi',
            color: 'from-cyan-500 to-cyan-600',
            bg: 'bg-cyan-50',
            text: 'text-cyan-600',
            features: ['Background transparan', 'Kualitas lossless', 'Resolusi tinggi'],
            popularity: 78
        },
        {
            name: 'PNG to JPG',
            icon: faImage,
            description: 'Konversi PNG ke JPG dengan ukuran lebih kecil',
            color: 'from-orange-500 to-orange-600',
            bg: 'bg-orange-50',
            text: 'text-orange-600',
            features: ['Ukuran lebih kecil', 'Kualitas adjustable', 'Cepat & efisien'],
            popularity: 82
        },
        {
            name: 'WebP Converter',
            icon: faImage,
            description: 'Konversi gambar ke format WebP modern',
            color: 'from-teal-500 to-teal-600',
            bg: 'bg-teal-50',
            text: 'text-teal-600',
            features: ['Ukuran lebih kecil', 'Kualitas tinggi', 'Support modern browser'],
            popularity: 75
        },
        {
            name: 'Image Cropper',
            icon: faCrop,
            description: 'Potong gambar sesuai kebutuhan',
            color: 'from-pink-500 to-pink-600',
            bg: 'bg-pink-50',
            text: 'text-pink-600',
            features: ['Custom crop area', 'Preset ratio', 'Preview real-time'],
            popularity: 70
        },
        {
            name: 'Image Rotator',
            icon: faArrowsRotate,
            description: 'Putar dan flip gambar',
            color: 'from-indigo-500 to-indigo-600',
            bg: 'bg-indigo-50',
            text: 'text-indigo-600',
            features: ['Rotate 90°/180°/270°', 'Flip horizontal/vertikal', 'Preview hasil'],
            popularity: 65
        },
        {
            name: 'Image Metadata Viewer',
            icon: faInfoCircle,
            description: 'Lihat metadata dan EXIF gambar',
            color: 'from-gray-500 to-gray-600',
            bg: 'bg-gray-50',
            text: 'text-gray-600',
            features: ['Informasi EXIF', 'Data kamera', 'Informasi file'],
            popularity: 55
        },
        {
            name: 'Image to PDF',
            icon: faFilePdf,
            description: 'Konversi gambar ke PDF',
            color: 'from-red-500 to-red-600',
            bg: 'bg-red-50',
            text: 'text-red-600',
            features: ['Multiple images', 'Atur urutan', 'PDF berkualitas'],
            popularity: 80
        },
        {
            name: 'Background Utilities',
            icon: faPalette,
            description: 'Utilitas untuk background gambar',
            color: 'from-amber-500 to-amber-600',
            bg: 'bg-amber-50',
            text: 'text-amber-600',
            features: ['Hapus background', 'Ganti background', 'Transparansi'],
            popularity: 60
        }
    ];

    const categories = [
        { name: 'All', count: imageTools.length },
        { name: 'Compress & Resize', count: imageTools.filter(t => ['Image Compressor', 'Image Resizer'].includes(t.name)).length },
        { name: 'Convert', count: imageTools.filter(t => t.name.includes('Converter') || t.name.includes('to')).length },
        { name: 'Edit', count: imageTools.filter(t => ['Image Cropper', 'Image Rotator', 'Background Utilities'].includes(t.name)).length },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-pink-50/50" />
                <div className="absolute top-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

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
                            <div className="inline-flex items-center gap-3 bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <FontAwesomeIcon icon={faImage} className="w-4 h-4" />
                                Image Tools
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                                    Image Tools
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Kompres, resize, konversi, dan edit gambar dengan mudah. {imageTools.length} tools tersedia untuk semua kebutuhan gambar Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {imageTools.map((tool, index) => (
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

                                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
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