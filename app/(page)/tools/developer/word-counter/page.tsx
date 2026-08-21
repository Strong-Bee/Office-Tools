// app/(pages)/tools/developer/word-counter/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faHashtag,
    faCopy,
    faCheck,
    faStar,
    faBolt,
    faShield,
    faClock,
    faTrash,
    faClock as faClockIcon,
    faFileAlt,
    faAlignLeft,
    faFont,
    faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function WordCounterPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const stats = {
        characters: text.length,
        charactersNoSpaces: text.replace(/\s/g, '').length,
        words: text.trim() ? text.trim().split(/\s+/).length : 0,
        sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
        paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0,
        lines: text.trim() ? text.split('\n').filter(l => l.trim()).length : 0,
        readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
        speakingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 150),
    };

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [text]);

    const handleClear = useCallback(() => {
        setText('');
        setCopied(false);
    }, []);

    const features = [
        { icon: faBolt, title: 'Real-time Count', desc: 'Count as you type' },
        { icon: faShield, title: 'Secure', desc: 'Your text is safe' },
        { icon: faClock, title: 'Detailed Stats', desc: 'Words, characters, sentences' },
    ];

    const statCards = [
        { label: 'Characters', value: stats.characters, icon: faFont, color: 'from-blue-500 to-blue-600' },
        { label: 'Characters (no spaces)', value: stats.charactersNoSpaces, icon: faFont, color: 'from-indigo-500 to-indigo-600' },
        { label: 'Words', value: stats.words, icon: faFileAlt, color: 'from-purple-500 to-purple-600' },
        { label: 'Sentences', value: stats.sentences, icon: faQuoteLeft, color: 'from-pink-500 to-pink-600' },
        { label: 'Paragraphs', value: stats.paragraphs, icon: faAlignLeft, color: 'from-orange-500 to-orange-600' },
        { label: 'Lines', value: stats.lines, icon: faAlignLeft, color: 'from-teal-500 to-teal-600' },
        { label: 'Reading Time', value: `${stats.readingTime} min`, icon: faClockIcon, color: 'from-green-500 to-green-600' },
        { label: 'Speaking Time', value: `${stats.speakingTime} min`, icon: faClockIcon, color: 'from-rose-500 to-rose-600' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/50" />
                <div className="absolute top-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-64 h-64 sm:w-96 sm:h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

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
                            <div className="inline-flex items-center gap-3 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <FontAwesomeIcon icon={faHashtag} className="w-4 h-4" />
                                Developer Tool
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Word Counter
                                </span>
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Hitung jumlah kata, karakter, kalimat, dan perkiraan waktu baca dari teks Anda.
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
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0 sm:mx-auto sm:mb-2">
                                    <FontAwesomeIcon icon={feature.icon} className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
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
                            {/* Text Input */}
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                                    <div className="flex items-center justify-between flex-wrap gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                                <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-base sm:text-lg font-bold text-gray-800">Your Text</h2>
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    Paste or type your text here
                                                </p>
                                            </div>
                                        </div>
                                        {text && (
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
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Paste or type your text here to count words..."
                                        className="w-full h-64 sm:h-80 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all text-sm sm:text-base"
                                    />
                                    {text && (
                                        <div className="mt-3 flex justify-between items-center">
                                            <span className="text-xs text-gray-400">
                                                {stats.words} words • {stats.characters} characters
                                            </span>
                                            <button
                                                onClick={handleCopy}
                                                className="text-xs text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1"
                                            >
                                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-3 h-3" />
                                                {copied ? 'Copied!' : 'Copy Text'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Statistics */}
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                            <FontAwesomeIcon icon={faHashtag} className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-base sm:text-lg font-bold text-gray-800">Statistics</h2>
                                            <p className="text-xs sm:text-sm text-gray-500">
                                                {text ? 'Detailed analysis' : 'Waiting for text'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6">
                                    {text ? (
                                        <div className="grid grid-cols-2 gap-3">
                                            {statCards.map((stat, index) => (
                                                <div
                                                    key={index}
                                                    className={`bg-gradient-to-br ${stat.color} text-white rounded-xl p-3 sm:p-4 transition-all hover:scale-105`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs sm:text-sm font-medium opacity-80">{stat.label}</span>
                                                        <FontAwesomeIcon icon={stat.icon} className="w-3 h-3 sm:w-4 sm:h-4 opacity-60" />
                                                    </div>
                                                    <div className="text-lg sm:text-2xl font-bold mt-1">{stat.value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-64 text-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                                                <FontAwesomeIcon icon={faFileAlt} className="w-8 h-8 text-gray-300" />
                                            </div>
                                            <p className="text-sm text-gray-500 mt-4">
                                                Enter your text to see statistics
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Word count, character count, and more
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tips Section */}
                        <div className="mt-8 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">💡 Tips for Word Counting</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-indigo-600">1</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Check Word Count</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Know the length of your content</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-purple-600">2</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Character Limits</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Check character count for social media</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-pink-600">3</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Reading Time</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Estimate how long to read your content</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-teal-600">4</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Content Planning</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Use statistics for content optimization</p>
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