// app/(pages)/tools/developer/json-formatter/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faCode,
    faCopy,
    faCheck,
    faStar,
    faBolt,
    faShield,
    faClock,
    faTrash,
    faMagic,
    faMinimize,
    faExpand,
    faFileCode
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function JSONFormatterPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [inputJSON, setInputJSON] = useState('');
    const [outputJSON, setOutputJSON] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const formatJSON = useCallback((minify: boolean = false) => {
        if (!inputJSON.trim()) {
            setError('Please enter JSON to format');
            return;
        }

        try {
            const parsed = JSON.parse(inputJSON);
            const formatted = minify
                ? JSON.stringify(parsed)
                : JSON.stringify(parsed, null, 2);
            setOutputJSON(formatted);
            setError(null);
            setIsValid(true);
        } catch (err) {
            setError('Invalid JSON: ' + (err as Error).message);
            setIsValid(false);
            setOutputJSON('');
        }
    }, [inputJSON]);

    const handleClear = useCallback(() => {
        setInputJSON('');
        setOutputJSON('');
        setError(null);
        setIsValid(null);
        setCopied(false);
    }, []);

    const handleCopy = useCallback(async () => {
        if (!outputJSON) return;
        await navigator.clipboard.writeText(outputJSON);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [outputJSON]);

    const features = [
        { icon: faBolt, title: 'Fast Formatting', desc: 'Format in seconds' },
        { icon: faShield, title: 'Secure', desc: 'Your data is safe' },
        { icon: faClock, title: 'Validation', desc: 'Validate JSON structure' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-transparent to-amber-50/50" />
                <div className="absolute top-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-64 h-64 sm:w-96 sm:h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

                <div className="container mx-auto relative">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/tools/developer"
                            className={`inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 sm:mb-6 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                            Back to Developer Tools
                        </Link>

                        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <div className="inline-flex items-center gap-3 bg-yellow-50 text-yellow-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
                                Developer Tool
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                                    JSON Formatter
                                </span>
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Format dan validasi JSON dengan mudah. Pretty print, minify, dan syntax highlighting.
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
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-50 rounded-full flex items-center justify-center flex-shrink-0 sm:mx-auto sm:mb-2">
                                    <FontAwesomeIcon icon={feature.icon} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
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
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Input */}
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-amber-50">
                                    <div className="flex items-center justify-between flex-wrap gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                                <FontAwesomeIcon icon={faFileCode} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-base sm:text-lg font-bold text-gray-800">Input JSON</h2>
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    Paste your JSON here
                                                </p>
                                            </div>
                                        </div>
                                        {inputJSON && (
                                            <button
                                                onClick={handleClear}
                                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                                            >
                                                <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6">
                                    <textarea
                                        value={inputJSON}
                                        onChange={(e) => setInputJSON(e.target.value)}
                                        placeholder='{"key": "value", "array": [1, 2, 3]}'
                                        className={`w-full h-64 sm:h-80 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none transition-all font-mono text-sm ${isValid === true ? 'border-green-400' :
                                            isValid === false ? 'border-red-400' :
                                                'border-gray-200'
                                            }`}
                                    />
                                    {isValid === true && (
                                        <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                                            <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                                            Valid JSON
                                        </div>
                                    )}
                                    {isValid === false && error && (
                                        <div className="mt-2 text-xs text-red-600 flex items-start gap-1">
                                            <span>⚠️</span>
                                            <span className="break-all">{error}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Output */}
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-amber-50">
                                    <div className="flex items-center justify-between flex-wrap gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                                <FontAwesomeIcon icon={faMagic} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-base sm:text-lg font-bold text-gray-800">Formatted JSON</h2>
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    {outputJSON ? 'Ready to copy' : 'Waiting for input'}
                                                </p>
                                            </div>
                                        </div>
                                        {outputJSON && (
                                            <button
                                                onClick={handleCopy}
                                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors flex items-center gap-1"
                                            >
                                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-3 h-3" />
                                                {copied ? 'Copied!' : 'Copy'}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6">
                                    <pre className={`w-full h-64 sm:h-80 p-4 bg-gray-50 rounded-xl border border-gray-200 overflow-y-auto font-mono text-sm whitespace-pre-wrap ${outputJSON ? 'text-gray-800' : 'text-gray-400'
                                        }`}>
                                        {outputJSON || 'Formatted JSON will appear here...'}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-100">
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => formatJSON(false)}
                                    className="flex-1 min-w-[120px] bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 text-sm flex items-center justify-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faExpand} className="w-4 h-4" />
                                    Pretty Print
                                </button>
                                <button
                                    onClick={() => formatJSON(true)}
                                    className="flex-1 min-w-[120px] bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 text-sm flex items-center justify-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faMinimize} className="w-4 h-4" />
                                    Minify
                                </button>
                                <button
                                    onClick={() => {
                                        try {
                                            const parsed = JSON.parse(inputJSON);
                                            setInputJSON(JSON.stringify(parsed, null, 2));
                                        } catch {
                                            // ignore
                                        }
                                    }}
                                    className="flex-1 min-w-[120px] bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm flex items-center justify-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faMagic} className="w-4 h-4" />
                                    Clean & Format
                                </button>
                            </div>
                        </div>

                        {/* Tips Section */}
                        <div className="mt-8 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">💡 Tips for JSON</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-yellow-600">1</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Use Valid JSON</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Ensure proper syntax: quotes, commas, brackets</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-amber-600">2</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Pretty Print</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Format for better readability</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-orange-600">3</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Minify for Production</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Reduce size for API responses</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-red-600">4</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Validate First</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Always validate before using</p>
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