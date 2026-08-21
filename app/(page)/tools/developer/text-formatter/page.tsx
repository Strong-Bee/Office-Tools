// app/(pages)/tools/developer/text-formatter/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faTextHeight,
    faCopy,
    faCheck,
    faStar,
    faBolt,
    faShield,
    faClock,
    faTrash,
    faMagic,
    faMinus,
    faPlus,
    faFont,
    faQuoteRight
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TextFormatterPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [copied, setCopied] = useState(false);
    const [activeFormat, setActiveFormat] = useState<string | null>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const formatOptions = [
        {
            id: 'remove-spaces',
            label: 'Remove Extra Spaces',
            icon: faMinus,
            description: 'Remove unnecessary spaces and line breaks',
            action: (text: string) => text.replace(/\s+/g, ' ').trim()
        },
        {
            id: 'remove-empty-lines',
            label: 'Remove Empty Lines',
            icon: faMinus,
            description: 'Remove empty lines from text',
            action: (text: string) => text.split('\n').filter(line => line.trim() !== '').join('\n')
        },
        {
            id: 'capitalize',
            label: 'Capitalize Sentences',
            icon: faFont,
            description: 'Capitalize first letter of each sentence',
            action: (text: string) => text.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())
        },
        {
            id: 'title-case',
            label: 'Title Case',
            icon: faFont,
            description: 'Capitalize first letter of each word',
            action: (text: string) => text.replace(/\w\S*/g, word =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
        },
        {
            id: 'trim',
            label: 'Trim Whitespace',
            icon: faMagic,
            description: 'Remove leading and trailing whitespace',
            action: (text: string) => text.trim()
        },
        {
            id: 'remove-punctuation',
            label: 'Remove Punctuation',
            icon: faQuoteRight,
            description: 'Remove all punctuation marks',
            action: (text: string) => text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
        },
        {
            id: 'remove-numbers',
            label: 'Remove Numbers',
            icon: faMinus,
            description: 'Remove all numbers from text',
            action: (text: string) => text.replace(/[0-9]/g, '')
        },
        {
            id: 'add-line-numbers',
            label: 'Add Line Numbers',
            icon: faPlus,
            description: 'Add numbers to each line',
            action: (text: string) => text.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n')
        }
    ];

    const handleFormat = useCallback((action: (text: string) => string, id: string) => {
        if (!inputText) return;
        const result = action(inputText);
        setOutputText(result);
        setActiveFormat(id);
    }, [inputText]);

    const handleClear = useCallback(() => {
        setInputText('');
        setOutputText('');
        setActiveFormat(null);
        setCopied(false);
    }, []);

    const handleCopy = useCallback(async () => {
        if (!outputText) return;
        await navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [outputText]);

    const handleApplyAll = useCallback(() => {
        if (!inputText) return;
        let result = inputText;
        formatOptions.forEach(option => {
            result = option.action(result);
        });
        setOutputText(result);
        setActiveFormat('all');
    }, [inputText]);

    const features = [
        { icon: faBolt, title: 'Fast Formatting', desc: 'Format in seconds' },
        { icon: faShield, title: 'Secure', desc: 'Your text is safe' },
        { icon: faClock, title: 'Multiple Options', desc: 'Various formatting options' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-pink-50/50" />
                <div className="absolute top-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-64 h-64 sm:w-96 sm:h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

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
                            <div className="inline-flex items-center gap-3 bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <FontAwesomeIcon icon={faTextHeight} className="w-4 h-4" />
                                Developer Tool
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                                    Text Formatter
                                </span>
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Format teks dengan berbagai opsi. Remove extra spaces, fix line breaks, dan banyak lagi.
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
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0 sm:mx-auto sm:mb-2">
                                    <FontAwesomeIcon icon={feature.icon} className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
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
                                <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                                    <div className="flex items-center justify-between flex-wrap gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                                <FontAwesomeIcon icon={faTextHeight} className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-base sm:text-lg font-bold text-gray-800">Input Text</h2>
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    Paste your text here
                                                </p>
                                            </div>
                                        </div>
                                        {inputText && (
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
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder="Paste your text here to format..."
                                        className="w-full h-64 sm:h-80 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all text-sm sm:text-base"
                                    />
                                    <div className="mt-3 text-xs text-gray-400">
                                        {inputText.length} characters • {inputText.split(/\s+/).filter(w => w).length} words • {inputText.split('\n').filter(l => l).length} lines
                                    </div>
                                </div>
                            </div>

                            {/* Output */}
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                                    <div className="flex items-center justify-between flex-wrap gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                                <FontAwesomeIcon icon={faMagic} className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-base sm:text-lg font-bold text-gray-800">Formatted Output</h2>
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    {outputText ? 'Ready to copy' : 'Waiting for input'}
                                                </p>
                                            </div>
                                        </div>
                                        {outputText && (
                                            <button
                                                onClick={handleCopy}
                                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1"
                                            >
                                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-3 h-3" />
                                                {copied ? 'Copied!' : 'Copy'}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6">
                                    <div className="w-full h-64 sm:h-80 p-4 bg-gray-50 rounded-xl border border-gray-200 overflow-y-auto text-sm sm:text-base whitespace-pre-wrap">
                                        {outputText || 'Your formatted text will appear here...'}
                                    </div>
                                    {outputText && (
                                        <div className="mt-3 text-xs text-gray-400">
                                            {outputText.length} characters • {outputText.split(/\s+/).filter(w => w).length} words • {outputText.split('\n').filter(l => l).length} lines
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Format Options */}
                        <div className="mt-6 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-100">
                            <div className="flex flex-wrap gap-2">
                                {formatOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleFormat(option.action, option.id)}
                                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${activeFormat === option.id
                                            ? 'bg-purple-500 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        title={option.description}
                                    >
                                        <FontAwesomeIcon icon={option.icon} className="w-3 h-3" />
                                        {option.label}
                                    </button>
                                ))}
                                <button
                                    onClick={handleApplyAll}
                                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${activeFormat === 'all'
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                                        : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200'
                                        }`}
                                >
                                    <FontAwesomeIcon icon={faMagic} className="w-3 h-3" />
                                    Apply All
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-3">
                                Click any format option to apply it to your text. Hover for description.
                            </p>
                        </div>

                        {/* Tips Section */}
                        <div className="mt-8 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">💡 Tips for Text Formatting</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-purple-600">1</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Remove Extra Spaces</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Clean up text by removing unnecessary spaces</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-pink-600">2</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Capitalize Properly</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Use Title Case or Sentence Case for better readability</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-rose-600">3</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Remove Unwanted</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Remove punctuation or numbers if not needed</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-indigo-600">4</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Add Line Numbers</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Useful for code or structured text</p>
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