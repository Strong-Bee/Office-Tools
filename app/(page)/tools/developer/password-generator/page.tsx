// app/(pages)/tools/developer/password-generator/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faKey,
    faCopy,
    faCheck,
    faStar,
    faBolt,
    faShield,
    faClock,
    faRefresh,
    faEye,
    faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PasswordGeneratorPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        generatePassword();
    }, []);

    const generatePassword = useCallback(() => {
        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (charset === '') {
            setPassword('Please select at least one option');
            setStrength(0);
            return;
        }

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            newPassword += charset[randomIndex];
        }

        setPassword(newPassword);
        calculateStrength(newPassword);
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    const calculateStrength = useCallback((pass: string) => {
        let score = 0;
        if (pass.length >= 12) score += 20;
        if (pass.length >= 16) score += 10;
        if (/[A-Z]/.test(pass)) score += 15;
        if (/[a-z]/.test(pass)) score += 15;
        if (/[0-9]/.test(pass)) score += 15;
        if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(pass)) score += 25;
        setStrength(score);
    }, []);

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [password]);

    const getStrengthLabel = useCallback(() => {
        if (strength >= 80) return { label: 'Strong', color: 'text-green-600', bg: 'bg-green-100' };
        if (strength >= 60) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
        if (strength >= 40) return { label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
        return { label: 'Weak', color: 'text-red-600', bg: 'bg-red-100' };
    }, [strength]);

    const getStrengthColor = useCallback(() => {
        if (strength >= 80) return 'bg-green-500';
        if (strength >= 60) return 'bg-blue-500';
        if (strength >= 40) return 'bg-yellow-500';
        return 'bg-red-500';
    }, [strength]);

    const features = [
        { icon: faBolt, title: 'Fast Generation', desc: 'Generate in seconds' },
        { icon: faShield, title: 'Secure', desc: 'Cryptographically secure' },
        { icon: faClock, title: 'Customizable', desc: 'Custom length and characters' },
    ];

    const strengthInfo = getStrengthLabel();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-transparent to-pink-50/50" />
                <div className="absolute top-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-rose-400/10 rounded-full blur-3xl animate-pulse" />
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
                            <div className="inline-flex items-center gap-3 bg-rose-50 text-rose-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <FontAwesomeIcon icon={faKey} className="w-4 h-4" />
                                Developer Tool
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                <span className="bg-gradient-to-r from-rose-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                                    Password Generator
                                </span>
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Generate password yang aman dan kuat. Custom panjang, jenis karakter, dan copy dengan mudah.
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
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0 sm:mx-auto sm:mb-2">
                                    <FontAwesomeIcon icon={feature.icon} className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
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
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-rose-50 to-pink-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                                        <FontAwesomeIcon icon={faKey} className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-base sm:text-lg font-bold text-gray-800">Generate Password</h2>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Customize your password settings
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6">
                                {/* Password Display */}
                                <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1 font-mono text-lg sm:text-xl text-gray-800 break-all">
                                            {showPassword ? password : '•'.repeat(password.length)}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
                                                aria-label="Toggle password visibility"
                                            >
                                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={handleCopy}
                                                className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
                                                aria-label="Copy password"
                                            >
                                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={generatePassword}
                                                className="p-2 text-rose-500 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50"
                                                aria-label="Generate new password"
                                            >
                                                <FontAwesomeIcon icon={faRefresh} className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Strength Indicator */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">Password Strength</span>
                                        <span className={`text-sm font-semibold ${strengthInfo.color}`}>
                                            {strengthInfo.label}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className={`${getStrengthColor()} h-2.5 rounded-full transition-all duration-500`}
                                            style={{ width: `${strength}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Options */}
                                <div className="space-y-4">
                                    {/* Length */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-sm font-medium text-gray-700">Password Length</label>
                                            <span className="text-sm font-semibold text-gray-800">{length}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="6"
                                            max="64"
                                            value={length}
                                            onChange={(e) => setLength(parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                                        />
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>6</span>
                                            <span>64</span>
                                        </div>
                                    </div>

                                    {/* Character Types */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={includeUppercase}
                                                onChange={(e) => setIncludeUppercase(e.target.checked)}
                                                className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                                            />
                                            <span className="text-sm text-gray-700">A-Z (Uppercase)</span>
                                        </label>
                                        <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={includeLowercase}
                                                onChange={(e) => setIncludeLowercase(e.target.checked)}
                                                className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                                            />
                                            <span className="text-sm text-gray-700">a-z (Lowercase)</span>
                                        </label>
                                        <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={includeNumbers}
                                                onChange={(e) => setIncludeNumbers(e.target.checked)}
                                                className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                                            />
                                            <span className="text-sm text-gray-700">0-9 (Numbers)</span>
                                        </label>
                                        <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={includeSymbols}
                                                onChange={(e) => setIncludeSymbols(e.target.checked)}
                                                className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                                            />
                                            <span className="text-sm text-gray-700">!@#$ (Symbols)</span>
                                        </label>
                                    </div>

                                    {/* Generate Button */}
                                    <button
                                        onClick={generatePassword}
                                        className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 text-sm sm:text-base"
                                    >
                                        <FontAwesomeIcon icon={faKey} className="w-4 h-4 mr-2" />
                                        Generate New Password
                                    </button>

                                    {/* Quick Copy */}
                                    {password && password !== 'Please select at least one option' && (
                                        <button
                                            onClick={handleCopy}
                                            className="w-full border-2 border-gray-300 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:border-gray-400 hover:shadow-lg transition-all text-sm"
                                        >
                                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-4 h-4 mr-2" />
                                            {copied ? 'Copied!' : 'Copy to Clipboard'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tips Section */}
                        <div className="mt-8 sm:mt-12 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">💡 Tips for Strong Passwords</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-rose-600">1</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Use Long Passwords</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">At least 12-16 characters recommended</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-pink-600">2</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Mix Character Types</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Use uppercase, lowercase, numbers, and symbols</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-purple-600">3</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Avoid Common Words</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Don't use dictionary words or personal info</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-indigo-600">4</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Unique Passwords</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Use different password for each account</p>
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