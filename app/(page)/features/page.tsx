// app/(pages)/features/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faArrowRight,
    faRocket,
    faShield,
    faBolt,
    faMobile,
    faPalette,
    faLock,
    faFilePdf,
    faImage,
    faFileWord,
    faFileExcel,
    faFilePowerpoint,
    faQrcode,
    faCode
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FeaturesPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = {
        pdf: {
            icon: faFilePdf,
            title: 'PDF Tools',
            description: 'Kelola, konversi, dan edit file PDF dengan mudah',
            color: 'from-red-500 to-red-600',
            bg: 'bg-red-50',
            text: 'text-red-600',
            tools: [
                'Merge PDF - Gabungkan multiple PDF menjadi satu',
                'Split PDF - Pisahkan PDF menjadi beberapa file',
                'Compress PDF - Kecilkan ukuran file PDF',
                'PDF to Word - Konversi PDF ke dokumen Word',
                'PDF to Excel - Konversi PDF ke spreadsheet Excel',
                'PDF to PowerPoint - Konversi PDF ke presentasi',
                'Word to PDF - Konversi Word ke PDF',
                'Excel to PDF - Konversi Excel ke PDF',
                'PowerPoint to PDF - Konversi PowerPoint ke PDF',
                'JPG to PDF - Konversi gambar ke PDF',
                'PDF to JPG - Konversi PDF ke gambar',
                'Rotate PDF - Putar halaman PDF',
                'Delete Pages - Hapus halaman tertentu',
                'Extract Pages - Ekstrak halaman tertentu',
                'Reorder Pages - Urutkan ulang halaman',
                'Protect PDF - Tambahkan password',
                'Unlock PDF - Buka password PDF',
                'Add Watermark - Tambahkan watermark',
                'Add Page Numbers - Tambahkan nomor halaman'
            ]
        },
        documents: {
            icon: faFileWord,
            title: 'Document Tools',
            description: 'Konversi dan kelola berbagai format dokumen',
            color: 'from-green-500 to-green-600',
            bg: 'bg-green-50',
            text: 'text-green-600',
            tools: [
                'Word Converter - Konversi antar format Word',
                'Text Extraction - Ekstrak teks dari dokumen',
                'Document Compressor - Kompres dokumen',
                'Document Merger - Gabungkan dokumen',
                'Document Splitter - Pisahkan dokumen',
                'TXT Converter - Konversi ke TXT',
                'DOC/DOCX Utilities - Utilitas Word',
                'RTF Utilities - Utilitas RTF'
            ]
        },
        images: {
            icon: faImage,
            title: 'Image Tools',
            description: 'Kompres, resize, dan konversi gambar',
            color: 'from-purple-500 to-purple-600',
            bg: 'bg-purple-50',
            text: 'text-purple-600',
            tools: [
                'Image Compressor - Kompres gambar',
                'Image Resizer - Ubah ukuran gambar',
                'Image Converter - Konversi format gambar',
                'JPG to PNG - Konversi JPG ke PNG',
                'PNG to JPG - Konversi PNG ke JPG',
                'WebP Converter - Konversi ke WebP',
                'Image Cropper - Potong gambar',
                'Image Rotator - Putar gambar',
                'Metadata Viewer - Lihat metadata',
                'Image to PDF - Konversi gambar ke PDF',
                'Background Utilities - Utilitas background'
            ]
        },
        office: {
            icon: faFileExcel,
            title: 'Office Tools',
            description: 'Utilitas untuk Excel, PowerPoint, dan CSV',
            color: 'from-orange-500 to-orange-600',
            bg: 'bg-orange-50',
            text: 'text-orange-600',
            tools: [
                'Excel Utilities - Utilitas Excel',
                'CSV Utilities - Utilitas CSV',
                'Spreadsheet Converter - Konversi spreadsheet',
                'PowerPoint Utilities - Utilitas PowerPoint',
                'Presentation Converter - Konversi presentasi',
                'Document Format Converter - Konversi format dokumen'
            ]
        },
        developer: {
            icon: faCode,
            title: 'Developer Tools',
            description: 'Utilitas untuk developer dan programmer',
            color: 'from-teal-500 to-teal-600',
            bg: 'bg-teal-50',
            text: 'text-teal-600',
            tools: [
                'JSON Formatter - Format JSON',
                'JSON Validator - Validasi JSON',
                'Base64 Encoder/Decoder - Encode/decode Base64',
                'URL Encoder/Decoder - Encode/decode URL',
                'Timestamp Converter - Konversi timestamp',
                'QR Code Generator - Generate QR Code',
                'Barcode Generator - Generate Barcode',
                'Color Converter - Konversi warna'
            ]
        },
        productivity: {
            icon: faRocket,
            title: 'Productivity Tools',
            description: 'Tools untuk meningkatkan produktivitas sehari-hari',
            color: 'from-pink-500 to-pink-600',
            bg: 'bg-pink-50',
            text: 'text-pink-600',
            tools: [
                'Password Generator - Generate password',
                'Text Formatter - Format teks',
                'Word Counter - Hitung kata',
                'Character Counter - Hitung karakter',
                'Case Converter - Konversi huruf',
                'Unit Converter - Konversi satuan'
            ]
        }
    };

    const philosophy = [
        {
            icon: faBolt,
            title: 'Fast',
            description: 'Proses file cepat dan efisien. Hasil dalam hitungan detik.'
        },
        {
            icon: faShield,
            title: 'Secure',
            description: 'Keamanan data adalah prioritas utama. File Anda aman.'
        },
        {
            icon: faMobile,
            title: 'Responsive',
            description: 'Nyaman digunakan di semua perangkat, dari desktop hingga mobile.'
        },
        {
            icon: faPalette,
            title: 'Modern',
            description: 'UI/UX modern dan intuitif untuk pengalaman terbaik.'
        },
        {
            icon: faLock,
            title: 'Privacy Focused',
            description: 'Kami tidak menyimpan atau menjual data Anda.'
        }
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
                            <FontAwesomeIcon icon={faRocket} className="w-4 h-4" />
                            Features
                        </div>

                        <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Powerful Features
                            </span>
                        </h1>

                        <p className={`text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            Everything you need to manage, convert, and optimize your files in one place.
                            <br />
                            Over <strong className="text-blue-600">50+ tools</strong> available for free.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(features).map(([key, feature], index) => (
                            <div
                                key={key}
                                className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 ${isVisible ? 'animate-slideUp' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-4`}>
                                    <FontAwesomeIcon icon={feature.icon} className={`w-7 h-7 ${feature.text}`} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{feature.description}</p>
                                <ul className="space-y-1.5">
                                    {feature.tools.slice(0, 6).map((tool, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                            <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-green-500 flex-shrink-0 mt-1" />
                                            <span>{tool}</span>
                                        </li>
                                    ))}
                                    {feature.tools.length > 6 && (
                                        <li className="text-sm text-blue-600 font-medium mt-2">
                                            +{feature.tools.length - 6} more tools
                                        </li>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Design Philosophy */}
            <section className="py-16 px-4 bg-white/50">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">🎨 Design Philosophy</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Dibangun dengan prinsip untuk memberikan pengalaman terbaik
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
                        {philosophy.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                    <FontAwesomeIcon icon={item.icon} className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                                <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Try?</h2>
                        <p className="text-blue-100 mb-8 text-lg">
                            Start using Office Tools today. Free and no registration required.
                        </p>
                        <Link
                            href="/tools"
                            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:shadow-xl transition-all hover:scale-105"
                        >
                            Explore All Tools
                            <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}