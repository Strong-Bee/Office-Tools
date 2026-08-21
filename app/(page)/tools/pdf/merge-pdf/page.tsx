// app/(pages)/tools/pdf/merge-pdf/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faUpload,
    faPlus,
    faTrash,
    faDownload,
    faArrowsUpDown,
    faFilePdf,
    faCheck,
    faSpinner,
    faStar,
    faClock,
    faShield,
    faBolt
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MergePDFPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [mergedFile, setMergedFile] = useState<string | null>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            file => file.type === 'application/pdf' || file.name.endsWith('.pdf')
        );
        if (droppedFiles.length > 0) {
            setFiles(prev => [...prev, ...droppedFiles]);
        }
    }, []);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files).filter(
                file => file.type === 'application/pdf' || file.name.endsWith('.pdf')
            );
            setFiles(prev => [...prev, ...selectedFiles]);
        }
    }, []);

    const handleRemoveFile = useCallback((index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }, []);

    const handleMoveFile = useCallback((index: number, direction: 'up' | 'down') => {
        setFiles(prev => {
            const newFiles = [...prev];
            if (direction === 'up' && index > 0) {
                [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
            } else if (direction === 'down' && index < newFiles.length - 1) {
                [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
            }
            return newFiles;
        });
    }, []);

    const handleMerge = useCallback(() => {
        if (files.length < 2) return;

        setIsProcessing(true);
        setProgress(0);

        // Simulate merge process with progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsProcessing(false);
                    setMergedFile('merged-file.pdf');
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    }, [files]);

    const handleClearAll = useCallback(() => {
        setFiles([]);
        setMergedFile(null);
        setProgress(0);
    }, []);

    const formatFileSize = useCallback((bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }, []);

    const features = [
        {
            icon: faBolt,
            title: 'Fast Processing',
            desc: 'Merge PDF files in seconds'
        },
        {
            icon: faShield,
            title: 'Secure',
            desc: 'Your files are safe and private'
        },
        {
            icon: faClock,
            title: 'No Limits',
            desc: 'Merge as many files as you need'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-orange-50/50" />
                <div className="absolute top-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-red-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-64 h-64 sm:w-96 sm:h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

                <div className="container mx-auto relative">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/tools/pdf"
                            className={`inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 sm:mb-6 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                            Back to PDF Tools
                        </Link>

                        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <div className="inline-flex items-center gap-3 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <FontAwesomeIcon icon={faFilePdf} className="w-4 h-4" />
                                PDF Tool
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                                    Merge PDF
                                </span>
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Gabungkan multiple PDF menjadi satu file dengan mudah.
                                Upload file PDF Anda, atur urutan, dan download hasil merge.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Highlight */}
            <section className="py-4 sm:py-6 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-sm border border-gray-100 flex items-center sm:block gap-3 sm:gap-0">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 sm:mx-auto sm:mb-2">
                                    <FontAwesomeIcon icon={feature.icon} className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                                </div>
                                <div className="text-left sm:text-center">
                                    <h4 className="text-xs sm:text-sm font-semibold text-gray-800">{feature.title}</h4>
                                    <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Tool Section */}
            <section className="py-8 sm:py-12 px-4">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            {/* Tool Header */}
                            <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50">
                                <div className="flex items-center justify-between flex-wrap gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                            <FontAwesomeIcon icon={faFilePdf} className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-base sm:text-lg font-bold text-gray-800">Merge PDF</h2>
                                            <p className="text-xs sm:text-sm text-gray-500">
                                                {files.length} file(s) uploaded
                                            </p>
                                        </div>
                                    </div>
                                    {files.length > 0 && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleClearAll}
                                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                Clear All
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Upload Area */}
                            {files.length === 0 && !mergedFile && (
                                <div className="p-6 sm:p-8 md:p-12">
                                    <div
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all ${isDragging
                                            ? 'border-red-500 bg-red-50/50 scale-[1.01]'
                                            : 'border-gray-300 hover:border-red-400 hover:bg-gray-50/50'
                                            }`}
                                    >
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <FontAwesomeIcon icon={faUpload} className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
                                        </div>
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                                            Upload PDF Files
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4">
                                            Drag and drop PDF files here, or click to select
                                        </p>
                                        <label className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 cursor-pointer text-sm sm:text-base">
                                            <FontAwesomeIcon icon={faUpload} className="w-4 h-4 mr-2" />
                                            Select Files
                                            <input
                                                type="file"
                                                accept=".pdf,application/pdf"
                                                multiple
                                                onChange={handleFileSelect}
                                                className="hidden"
                                            />
                                        </label>
                                        <p className="text-xs text-gray-400 mt-4">
                                            Supports PDF files up to 100MB each
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* File List */}
                            {files.length > 0 && !mergedFile && (
                                <div className="p-4 sm:p-6">
                                    <div className="space-y-2 sm:space-y-3">
                                        {files.map((file, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                                            >
                                                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <FontAwesomeIcon icon={faFilePdf} className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm sm:text-base font-medium text-gray-800 truncate">
                                                            {file.name}
                                                        </p>
                                                        <p className="text-xs sm:text-sm text-gray-500">
                                                            {formatFileSize(file.size)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                                    <button
                                                        onClick={() => handleMoveFile(index, 'up')}
                                                        disabled={index === 0}
                                                        className={`p-1 sm:p-1.5 rounded-lg transition-colors ${index > 0
                                                            ? 'text-gray-500 hover:bg-gray-200'
                                                            : 'text-gray-300 cursor-not-allowed'
                                                            }`}
                                                        aria-label="Move up"
                                                    >
                                                        <FontAwesomeIcon icon={faArrowsUpDown} className="w-3 h-3 sm:w-4 sm:h-4 rotate-90" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemoveFile(index)}
                                                        className="p-1 sm:p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        aria-label="Remove file"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
                                        <label className="flex-1 bg-gray-100 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors cursor-pointer text-center text-sm sm:text-base">
                                            <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                                            Add More Files
                                            <input
                                                type="file"
                                                accept=".pdf,application/pdf"
                                                multiple
                                                onChange={handleFileSelect}
                                                className="hidden"
                                            />
                                        </label>
                                        <button
                                            onClick={handleMerge}
                                            disabled={files.length < 2}
                                            className={`flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2.5 sm:py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${files.length >= 2
                                                ? 'hover:shadow-lg hover:scale-105'
                                                : 'opacity-50 cursor-not-allowed'
                                                }`}
                                        >
                                            Merge PDF
                                        </button>
                                    </div>
                                    {files.length < 2 && (
                                        <p className="text-xs sm:text-sm text-yellow-600 mt-2 text-center">
                                            Please add at least 2 PDF files to merge
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Processing State */}
                            {isProcessing && (
                                <div className="p-6 sm:p-8 text-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 animate-spin" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                                        Merging PDF Files...
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Please wait while we merge your files
                                    </p>
                                    <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-gradient-to-r from-red-500 to-orange-500 h-2.5 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">{progress}% complete</p>
                                </div>
                            )}

                            {/* Result State */}
                            {mergedFile && (
                                <div className="p-6 sm:p-8 text-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <FontAwesomeIcon icon={faCheck} className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                                        Merge Complete! 🎉
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6">
                                        {files.length} PDF files have been merged successfully
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base">
                                            <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
                                            Download Merged PDF
                                        </button>
                                        <button
                                            onClick={handleClearAll}
                                            className="bg-gray-100 text-gray-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base"
                                        >
                                            Merge More Files
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tips Section */}
                        <div className="mt-8 sm:mt-12 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">💡 Tips for Merging PDF</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-blue-600">1</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Order Matters</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Arrange files in the order you want them to appear
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-green-600">2</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">File Size</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Maximum file size is 100MB per file
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-purple-600">3</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Privacy</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Your files are processed securely and deleted after
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-orange-600">4</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Quality</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Merged PDF maintains original quality
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
