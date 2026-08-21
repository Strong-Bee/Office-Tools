// app/(pages)/tools/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faSearch,
    faFilePdf,
    faImage,
    faFileWord,
    faFileExcel,
    faFilePowerpoint,
    faCode,
    faWrench,
    faArrowRight,
    faClock,
    faStar,
    faDownload
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ToolsPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const tools = {
        pdf: {
            icon: faFilePdf,
            name: 'PDF Tools',
            description: 'Kelola, konversi, dan edit file PDF',
            color: 'from-red-500 to-red-600',
            bg: 'bg-red-50',
            text: 'text-red-600',
            border: 'border-red-200',
            slug: 'pdf',
            tools: [
                { name: 'Merge PDF', description: 'Gabungkan multiple PDF menjadi satu file', icon: '📄' },
                { name: 'Split PDF', description: 'Pisahkan PDF menjadi beberapa file', icon: '✂️' },
                { name: 'Compress PDF', description: 'Kecilkan ukuran file PDF', icon: '📦' },
                { name: 'PDF to Word', description: 'Konversi PDF ke dokumen Word', icon: '📝' },
                { name: 'PDF to Excel', description: 'Konversi PDF ke spreadsheet Excel', icon: '📊' },
                { name: 'PDF to PowerPoint', description: 'Konversi PDF ke presentasi', icon: '📽️' },
                { name: 'Word to PDF', description: 'Konversi Word ke PDF', icon: '📄' },
                { name: 'Excel to PDF', description: 'Konversi Excel ke PDF', icon: '📄' },
                { name: 'PowerPoint to PDF', description: 'Konversi PowerPoint ke PDF', icon: '📄' },
                { name: 'JPG to PDF', description: 'Konversi gambar ke PDF', icon: '🖼️' },
                { name: 'PDF to JPG', description: 'Konversi PDF ke gambar', icon: '🖼️' },
                { name: 'Rotate PDF', description: 'Putar halaman PDF', icon: '🔄' },
                { name: 'Delete PDF Pages', description: 'Hapus halaman tertentu dari PDF', icon: '🗑️' },
                { name: 'Extract PDF Pages', description: 'Ekstrak halaman tertentu dari PDF', icon: '📤' },
                { name: 'Reorder PDF Pages', description: 'Urutkan ulang halaman PDF', icon: '🔀' },
                { name: 'Protect PDF', description: 'Tambahkan password ke PDF', icon: '🔒' },
                { name: 'Unlock PDF', description: 'Buka password PDF', icon: '🔓' },
                { name: 'Add Watermark', description: 'Tambahkan watermark ke PDF', icon: '💧' },
                { name: 'Add Page Numbers', description: 'Tambahkan nomor halaman ke PDF', icon: '🔢' }
            ]
        },
        documents: {
            icon: faFileWord,
            name: 'Document Tools',
            description: 'Konversi dan kelola berbagai format dokumen',
            color: 'from-green-500 to-green-600',
            bg: 'bg-green-50',
            text: 'text-green-600',
            border: 'border-green-200',
            slug: 'documents',
            tools: [
                { name: 'Word Document Converter', description: 'Konversi antar format Word', icon: '📝' },
                { name: 'Text Extraction', description: 'Ekstrak teks dari dokumen', icon: '📤' },
                { name: 'Document Compressor', description: 'Kompres ukuran dokumen', icon: '📦' },
                { name: 'Document Merger', description: 'Gabungkan beberapa dokumen', icon: '📑' },
                { name: 'Document Splitter', description: 'Pisahkan dokumen menjadi beberapa file', icon: '✂️' },
                { name: 'TXT Converter', description: 'Konversi ke format TXT', icon: '📄' },
                { name: 'DOC/DOCX Utilities', description: 'Utilitas untuk file Word', icon: '🔧' },
                { name: 'RTF Utilities', description: 'Utilitas untuk file RTF', icon: '🔧' }
            ]
        },
        images: {
            icon: faImage,
            name: 'Image Tools',
            description: 'Kompres, resize, dan konversi gambar',
            color: 'from-purple-500 to-purple-600',
            bg: 'bg-purple-50',
            text: 'text-purple-600',
            border: 'border-purple-200',
            slug: 'images',
            tools: [
                { name: 'Image Compressor', description: 'Kompres ukuran gambar', icon: '📦' },
                { name: 'Image Resizer', description: 'Ubah ukuran gambar', icon: '📐' },
                { name: 'Image Converter', description: 'Konversi format gambar', icon: '🔄' },
                { name: 'JPG to PNG', description: 'Konversi JPG ke PNG', icon: '🖼️' },
                { name: 'PNG to JPG', description: 'Konversi PNG ke JPG', icon: '🖼️' },
                { name: 'WebP Converter', description: 'Konversi ke format WebP', icon: '🌐' },
                { name: 'Image Cropper', description: 'Potong gambar sesuai kebutuhan', icon: '✂️' },
                { name: 'Image Rotator', description: 'Putar gambar', icon: '🔄' },
                { name: 'Image Metadata Viewer', description: 'Lihat metadata gambar', icon: 'ℹ️' },
                { name: 'Image to PDF', description: 'Konversi gambar ke PDF', icon: '📄' },
                { name: 'Background Utilities', description: 'Utilitas background gambar', icon: '🎨' }
            ]
        },
        office: {
            icon: faFileExcel,
            name: 'Office Tools',
            description: 'Utilitas untuk Excel, PowerPoint, dan CSV',
            color: 'from-orange-500 to-orange-600',
            bg: 'bg-orange-50',
            text: 'text-orange-600',
            border: 'border-orange-200',
            slug: 'office',
            tools: [
                { name: 'Excel Utilities', description: 'Utilitas untuk file Excel', icon: '📊' },
                { name: 'CSV Utilities', description: 'Utilitas untuk file CSV', icon: '📋' },
                { name: 'Spreadsheet Converter', description: 'Konversi format spreadsheet', icon: '🔄' },
                { name: 'PowerPoint Utilities', description: 'Utilitas untuk PowerPoint', icon: '📽️' },
                { name: 'Presentation Converter', description: 'Konversi format presentasi', icon: '🔄' },
                { name: 'Document Format Converter', description: 'Konversi format dokumen', icon: '🔄' }
            ]
        },
        developer: {
            icon: faCode,
            name: 'Developer Tools',
            description: 'Utilitas untuk developer dan programmer',
            color: 'from-teal-500 to-teal-600',
            bg: 'bg-teal-50',
            text: 'text-teal-600',
            border: 'border-teal-200',
            slug: 'developer',
            tools: [
                { name: 'QR Code Generator', description: 'Generate QR Code', icon: '📱' },
                { name: 'Barcode Generator', description: 'Generate Barcode', icon: '📱' },
                { name: 'Password Generator', description: 'Generate password aman', icon: '🔑' },
                { name: 'Text Formatter', description: 'Format teks sesuai kebutuhan', icon: '📝' },
                { name: 'Word Counter', description: 'Hitung jumlah kata', icon: '🔢' },
                { name: 'Character Counter', description: 'Hitung jumlah karakter', icon: '🔢' },
                { name: 'Case Converter', description: 'Konversi huruf besar/kecil', icon: '🔤' },
                { name: 'URL Encoder/Decoder', description: 'Encode/decode URL', icon: '🔗' },
                { name: 'Base64 Encoder/Decoder', description: 'Encode/decode Base64', icon: '💻' },
                { name: 'JSON Formatter', description: 'Format JSON', icon: '📋' },
                { name: 'JSON Validator', description: 'Validasi JSON', icon: '✅' },
                { name: 'Timestamp Converter', description: 'Konversi timestamp', icon: '⏰' },
                { name: 'Unit Converter', description: 'Konversi satuan', icon: '📐' },
                { name: 'Color Converter', description: 'Konversi warna', icon: '🎨' }
            ]
        }
    };

    const categories = [
        { id: 'all', label: 'All Tools' },
        { id: 'pdf', label: '📄 PDF' },
        { id: 'documents', label: '📝 Documents' },
        { id: 'images', label: '🖼️ Images' },
        { id: 'office', label: '📊 Office' },
        { id: 'developer', label: '💻 Developer' },
    ];

    const getCategoryEmoji = (category: string) => {
        const map: Record<string, string> = {
            pdf: '📄',
            documents: '📝',
            images: '🖼️',
            office: '📊',
            developer: '💻'
        };
        return map[category] || '🛠️';
    };

    const filteredTools = Object.entries(tools).reduce((acc, [category, data]) => {
        if (selectedCategory !== 'all' && category !== selectedCategory) {
            return acc;
        }
        const filtered = data.tools.filter(tool =>
            tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length > 0) {
            acc[category] = { ...data, tools: filtered };
        }
        return acc;
    }, {} as typeof tools);

    const totalTools = Object.values(tools).reduce((sum, cat) => sum + cat.tools.length, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50" />
                <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

                <div className="container mx-auto relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className={`inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <FontAwesomeIcon icon={faWrench} className="w-4 h-4" />
                            {totalTools}+ Tools Available
                        </div>

                        <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                All Tools
                            </span>
                        </h1>

                        <p className={`text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            Choose from {totalTools}+ tools to handle all your document, image, and productivity needs
                        </p>
                    </div>
                </div>
            </section>

            {/* Search and Filter */}
            <section className="py-6 px-4 sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                        <div className="flex-1 relative">
                            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search tools..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category.id
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    {Object.keys(filteredTools).length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No tools found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(filteredTools).map(([category, data]) => (
                                <div key={category} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
                                    <Link href={`/tools/${data.slug}`} className="block">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`w-12 h-12 rounded-xl ${data.bg} flex items-center justify-center`}>
                                                <FontAwesomeIcon icon={data.icon} className={`w-6 h-6 ${data.text}`} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800">{data.name}</h3>
                                                <span className="text-xs text-gray-400">{data.tools.length} tools</span>
                                            </div>
                                            <div className="text-gray-300 group-hover:text-blue-500 transition-colors">
                                                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3">{data.description}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {data.tools.slice(0, 4).map((tool, idx) => (
                                                <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full">
                                                    {tool.icon} {tool.name.split(' ').slice(0, 2).join(' ')}
                                                </span>
                                            ))}
                                            {data.tools.length > 4 && (
                                                <span className="text-xs text-blue-600 font-medium px-2 py-1">
                                                    +{data.tools.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}

                    {searchQuery && Object.keys(filteredTools).length > 0 && (
                        <div className="text-center mt-8 text-sm text-gray-500">
                            Found {Object.values(filteredTools).reduce((sum, cat) => sum + cat.tools.length, 0)} results
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-purple-600">
                <div className="container mx-auto text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                        All tools are free to use. No registration required.
                    </p>
                    <Link
                        href="/features"
                        className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:shadow-xl transition-all hover:scale-105"
                    >
                        View All Features
                        <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}