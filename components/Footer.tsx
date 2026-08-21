// components/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGithub,
    faTwitter,
    faLinkedin,
    faYoutube,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';
import {
    faArrowRight,
    faEnvelope,
    faLocationDot,
    faPhone
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const pathname = usePathname();

    const footerLinks = {
        product: [
            { href: '/', label: 'Home' },
            { href: '/features', label: 'Features' },
            { href: '/tools', label: 'All Tools' },
            { href: '/roadmap', label: 'Roadmap' },
        ],
        tools: [
            { href: '/tools/pdf', label: 'PDF Tools' },
            { href: '/tools/images', label: 'Image Tools' },
            { href: '/tools/documents', label: 'Document Tools' },
            { href: '/tools/office', label: 'Office Tools' },
            { href: '/tools/developer', label: 'Developer Tools' },
        ],
        company: [
            { href: '#', label: 'About Us' },
            { href: '#', label: 'Blog' },
            { href: '#', label: 'Contact' },
        ],
        legal: [
            { href: '#', label: 'Privacy Policy' },
            { href: '#', label: 'Terms of Service' },
            { href: '#', label: 'Cookie Policy' },
        ],
    };

    const socialLinks = [
        { href: 'https://github.com', icon: faGithub, label: 'GitHub', color: 'hover:text-white' },
        { href: 'https://twitter.com', icon: faTwitter, label: 'Twitter', color: 'hover:text-blue-400' },
        { href: 'https://linkedin.com', icon: faLinkedin, label: 'LinkedIn', color: 'hover:text-blue-500' },
        { href: 'https://youtube.com', icon: faYoutube, label: 'YouTube', color: 'hover:text-red-500' },
        { href: 'https://instagram.com', icon: faInstagram, label: 'Instagram', color: 'hover:text-pink-500' },
    ];

    const isActive = (path: string) => {
        if (path === '/') return pathname === path;
        return pathname?.startsWith(path);
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log('Email subscribed:', email);
            setEmail('');
            alert('Thank you for subscribing! 🎉');
        }
    };

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Newsletter Section */}
            <div className="border-b border-gray-800">
                <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-white font-bold text-lg sm:text-xl mb-1">
                                Subscribe to our newsletter
                            </h3>
                            <p className="text-gray-400 text-xs sm:text-sm">
                                Get the latest updates and new tools
                            </p>
                        </div>
                        <form onSubmit={handleSubscribe} className="flex w-full md:w-auto flex-col xs:flex-row gap-2 sm:gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 xs:w-48 sm:w-64 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap text-sm"
                            >
                                Subscribe
                                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
                    {/* Brand Section */}
                    <div className="col-span-2 sm:col-span-3 lg:col-span-2">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <Image
                                src="/logo.png"
                                alt="Office Tools"
                                width={32}
                                height={32}
                                className="rounded-xl sm:w-10 sm:h-10"
                            />
                            <div>
                                <span className="text-base sm:text-xl font-bold text-white">Office Tools</span>
                                <p className="text-[8px] sm:text-[10px] text-gray-500 font-medium tracking-wider uppercase">
                                    Simple • Fast • Useful
                                </p>
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 max-w-xs leading-relaxed">
                            Platform all-in-one productivity tools untuk membantu pekerjaan
                            perkantoran, mahasiswa, dan profesional.
                        </p>
                        <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 flex-wrap">
                            {socialLinks.slice(0, 3).map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-gray-500 transition-all duration-300 hover:scale-110 ${social.color}`}
                                    aria-label={social.label}
                                >
                                    <FontAwesomeIcon icon={social.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-3 sm:mb-4 text-[10px] sm:text-sm uppercase tracking-wider">
                            Product
                        </h4>
                        <ul className="space-y-2 sm:space-y-2.5">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className={`text-xs sm:text-sm transition-all duration-200 hover:translate-x-1 inline-block ${isActive(link.href)
                                            ? 'text-blue-400'
                                            : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tools Links */}
                    <div className="hidden sm:block">
                        <h4 className="text-white font-semibold mb-3 sm:mb-4 text-[10px] sm:text-sm uppercase tracking-wider">
                            Tools
                        </h4>
                        <ul className="space-y-2 sm:space-y-2.5">
                            {footerLinks.tools.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-3 sm:mb-4 text-[10px] sm:text-sm uppercase tracking-wider">
                            Company
                        </h4>
                        <ul className="space-y-2 sm:space-y-2.5">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-3 sm:mb-4 text-[10px] sm:text-sm uppercase tracking-wider">
                            Legal
                        </h4>
                        <ul className="space-y-2 sm:space-y-2.5">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                        <p className="text-[10px] sm:text-sm text-gray-500 text-center sm:text-left">
                            &copy; {currentYear} Office Tools. All rights reserved.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
                            <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm text-gray-500">
                                <FontAwesomeIcon icon={faEnvelope} className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden xs:inline">support@officetools.com</span>
                                <span className="xs:hidden">Email</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                                <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />
                                <span>Indonesia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2.5 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 hidden md:block group"
                aria-label="Back to top"
            >
                <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </footer>
    );
}