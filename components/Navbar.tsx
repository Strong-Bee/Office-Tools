// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/features', label: 'Features' },
        { href: '/tools', label: 'Tools' },
        { href: '/roadmap', label: 'Roadmap' },
    ];

    const dropdownItems = [
        { href: '/tools/pdf', label: 'PDF Tools' },
        { href: '/tools/documents', label: 'Document Tools' },
        { href: '/tools/images', label: 'Image Tools' },
        { href: '/tools/office', label: 'Office Tools' },
        { href: '/tools/developer', label: 'Developer Tools' },
    ];

    const isActive = (path: string) => {
        if (path === '/') return pathname === path;
        return pathname?.startsWith(path);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100/50'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
                            <Image
                                src="/logo.png"
                                alt="Office Tools"
                                width={40}
                                height={40}
                                className="rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                                priority
                            />
                        </div>
                        <div className="hidden xs:flex flex-col">
                            <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Office Tools
                            </span>
                            <span className="text-[8px] sm:text-[10px] text-gray-400 font-medium tracking-wider uppercase">
                                Simple • Fast • Useful
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative px-3 xl:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive(link.href)
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                                    }`}
                            >
                                {link.label}
                                {isActive(link.href) && (
                                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                                )}
                            </Link>
                        ))}

                        {/* Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setActiveDropdown(activeDropdown === 'tools' ? null : 'tools')}
                                className={`flex items-center gap-1 px-3 xl:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeDropdown === 'tools'
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                                    }`}
                            >
                                All Tools
                                <ChevronDown className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-300 ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} />
                            </button>
                            {activeDropdown === 'tools' && (
                                <div className="absolute top-full left-0 mt-2 w-48 xl:w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-slideDown overflow-hidden">
                                    {dropdownItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="flex items-center px-3 xl:px-4 py-2 xl:py-2.5 text-xs xl:text-sm text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="w-px h-5 xl:h-6 bg-gray-200 mx-1 xl:mx-2" />

                        <Link
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 transition-all duration-300 p-1.5 xl:p-2 rounded-full hover:bg-gray-100/80"
                            aria-label="GitHub"
                        >
                            <FontAwesomeIcon icon={faGithub} className="w-4 h-4 xl:w-5 xl:h-5" />
                        </Link>

                        <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-full font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-1 xl:gap-2 ml-1 xl:ml-2 text-sm xl:text-base">
                            <Sparkles className="w-3 h-3 xl:w-4 xl:h-4" />
                            <span className="hidden xl:inline">Get Started</span>
                            <span className="xl:hidden">Start</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-1.5 sm:p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                        ) : (
                            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-3 sm:mt-4 py-3 sm:py-4 border-t border-gray-100 animate-slideDown max-h-[80vh] overflow-y-auto">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-all duration-300 text-sm sm:text-base ${isActive(link.href)
                                        ? 'text-blue-600 bg-blue-50 font-medium'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="py-2">
                                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 sm:px-4 mb-2">
                                    All Tools
                                </p>
                                {dropdownItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="block text-gray-600 hover:text-gray-900 transition-all duration-300 py-2 sm:py-2.5 px-3 sm:px-4 hover:bg-gray-50 rounded-xl text-xs sm:text-sm"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 my-1 sm:my-2" />

                            <Link
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 sm:gap-3 text-gray-600 hover:text-gray-900 transition-all duration-300 py-2.5 sm:py-3 px-3 sm:px-4 hover:bg-gray-50 rounded-xl text-sm sm:text-base"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FontAwesomeIcon icon={faGithub} className="w-4 h-4 sm:w-5 sm:h-5" />
                                GitHub
                            </Link>

                            <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:shadow-xl transition-all duration-300 text-center text-sm sm:text-base mt-1 sm:mt-2">
                                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}