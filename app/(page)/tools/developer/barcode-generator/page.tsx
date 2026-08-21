// app/(pages)/tools/developer/barcode-generator/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faBarcode,
    faDownload,
    faCopy,
    faCheck,
    faSpinner,
    faStar,
    faBolt,
    faShield,
    faClock,
    faExpand,
    faFileImage,
    faTrash,
    faRefresh
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import bwipjs from 'bwip-js';

export default function BarcodeGeneratorPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [input, setInput] = useState('');
    const [barcodeDataUrl, setBarcodeDataUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [barcodeOptions, setBarcodeOptions] = useState({
        bcid: 'code128',
        scale: 3,
        height: 50,
        includetext: true,
        textxalign: 'center',
        textsize: 10
    });
    const [copied, setCopied] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const barcodeTypes = [
        { value: 'code128', label: 'Code 128' },
        { value: 'code39', label: 'Code 39' },
        { value: 'ean13', label: 'EAN-13' },
        { value: 'ean8', label: 'EAN-8' },
        { value: 'upca', label: 'UPC-A' },
        { value: 'upce', label: 'UPC-E' },
        { value: 'isbn', label: 'ISBN' },
        { value: 'issn', label: 'ISSN' },
        { value: 'code93', label: 'Code 93' },
        { value: 'codabar', label: 'Codabar' },
    ];

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const generateBarcode = useCallback(async () => {
        if (!input.trim()) {
            setError('Please enter text or number');
            return;
        }

        setIsGenerating(true);
        setError(null);
        setBarcodeDataUrl(null);

        try {
            // Create a temporary canvas
            const tempCanvas = document.createElement('canvas');

            // Generate barcode on temp canvas
            await new Promise<void>((resolve, reject) => {
                bwipjs.toCanvas(tempCanvas, {
                    bcid: barcodeOptions.bcid,
                    text: input,
                    scale: barcodeOptions.scale,
                    height: barcodeOptions.height,
                    includetext: barcodeOptions.includetext,
                    textxalign: barcodeOptions.textxalign,
                    textsize: barcodeOptions.textsize,
                    textcolor: '#000000',
                    backgroundcolor: '#ffffff',
                }, (err: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

            // Convert to data URL
            const dataUrl = tempCanvas.toDataURL('image/png');
            setBarcodeDataUrl(dataUrl);

            // Also draw on the visible canvas if it exists
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    const img = new Image();
                    img.onload = () => {
                        canvas.width = tempCanvas.width;
                        canvas.height = tempCanvas.height;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0);
                    };
                    img.src = dataUrl;
                }
            }

            // Update image ref
            if (imgRef.current) {
                imgRef.current.src = dataUrl;
            }

        } catch (err) {
            console.error('Barcode generation error:', err);
            setError('Failed to generate Barcode. Please check your input and try again.');
        } finally {
            setIsGenerating(false);
        }
    }, [input, barcodeOptions]);

    const handleDownload = useCallback(() => {
        if (!barcodeDataUrl) return;

        const link = document.createElement('a');
        link.download = `barcode_${Date.now()}.png`;
        link.href = barcodeDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [barcodeDataUrl]);

    const handleCopy = useCallback(async () => {
        if (barcodeDataUrl) {
            try {
                const response = await fetch(barcodeDataUrl);
                const blob = await response.blob();
                await navigator.clipboard.write([
                    new ClipboardItem({
                        [blob.type]: blob
                    })
                ]);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch {
                // Fallback: copy input text
                try {
                    await navigator.clipboard.writeText(input);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                } catch {
                    setError('Failed to copy to clipboard');
                }
            }
        }
    }, [barcodeDataUrl, input]);

    const handleClear = useCallback(() => {
        setInput('');
        setBarcodeDataUrl(null);
        setError(null);
        setCopied(false);
    }, []);

    const handleExample = useCallback((text: string) => {
        setInput(text);
    }, []);

    const examples = ['123456789012', 'ABC123', '987654321', 'TEST123'];

    const features = [
        { icon: faBolt, title: 'Fast Generation', desc: 'Generate Barcode in seconds' },
        { icon: faShield, title: 'Secure', desc: 'Your data is safe and private' },
        { icon: faClock, title: 'Multiple Types', desc: 'Support various barcode types' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            <section className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50" />
                <div className="absolute top-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

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
                            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <FontAwesomeIcon icon={faBarcode} className="w-4 h-4" />
                                Developer Tool
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                                    Barcode Generator
                                </span>
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Generate Barcode untuk produk dan inventaris. Support berbagai jenis barcode.
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
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 sm:mx-auto sm:mb-2">
                                    <FontAwesomeIcon icon={feature.icon} className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
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
                            {/* Left Column - Input */}
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                                    <div className="flex items-center justify-between flex-wrap gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                                <FontAwesomeIcon icon={faBarcode} className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-base sm:text-lg font-bold text-gray-800">Generate Barcode</h2>
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    Enter text or number
                                                </p>
                                            </div>
                                        </div>
                                        {(input || barcodeDataUrl) && (
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
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Enter text or number for barcode..."
                                            className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                        />

                                        {/* Examples */}
                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-xs text-gray-500 font-medium">Examples:</span>
                                            {examples.map((example, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleExample(example)}
                                                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-lg transition-colors"
                                                >
                                                    {example}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Barcode Type */}
                                        <div>
                                            <label className="text-xs font-medium text-gray-700 block mb-1">
                                                Barcode Type
                                            </label>
                                            <select
                                                value={barcodeOptions.bcid}
                                                onChange={(e) => setBarcodeOptions(prev => ({ ...prev, bcid: e.target.value }))}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                {barcodeTypes.map((type) => (
                                                    <option key={type.value} value={type.value}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Options */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-medium text-gray-700 block mb-1">
                                                    Scale
                                                </label>
                                                <select
                                                    value={barcodeOptions.scale}
                                                    onChange={(e) => setBarcodeOptions(prev => ({ ...prev, scale: parseInt(e.target.value) }))}
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="1">1x</option>
                                                    <option value="2">2x</option>
                                                    <option value="3">3x</option>
                                                    <option value="4">4x</option>
                                                    <option value="5">5x</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-gray-700 block mb-1">
                                                    Height
                                                </label>
                                                <select
                                                    value={barcodeOptions.height}
                                                    onChange={(e) => setBarcodeOptions(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="30">30px</option>
                                                    <option value="50">50px</option>
                                                    <option value="70">70px</option>
                                                    <option value="90">90px</option>
                                                    <option value="120">120px</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={barcodeOptions.includetext}
                                                onChange={(e) => setBarcodeOptions(prev => ({ ...prev, includetext: e.target.checked }))}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                            <label className="text-sm text-gray-700">
                                                Include text below barcode
                                            </label>
                                        </div>

                                        <button
                                            onClick={generateBarcode}
                                            disabled={!input.trim() || isGenerating}
                                            className={`w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${input.trim() && !isGenerating
                                                ? 'hover:shadow-lg hover:scale-105'
                                                : 'opacity-50 cursor-not-allowed'
                                                }`}
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 mr-2 animate-spin" />
                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faBarcode} className="w-4 h-4 mr-2" />
                                                    Generate Barcode
                                                </>
                                            )}
                                        </button>

                                        {error && (
                                            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                                                {error}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Output */}
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                                    <div className="flex items-center justify-between flex-wrap gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                                <FontAwesomeIcon icon={faBarcode} className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-base sm:text-lg font-bold text-gray-800">Barcode Result</h2>
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    {barcodeDataUrl ? 'Generated successfully' : 'Waiting for input'}
                                                </p>
                                            </div>
                                        </div>
                                        {barcodeDataUrl && (
                                            <button
                                                onClick={() => generateBarcode()}
                                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                                            >
                                                <FontAwesomeIcon icon={faRefresh} className="w-3 h-3" />
                                                Regenerate
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6">
                                    {isGenerating ? (
                                        <div className="flex flex-col items-center justify-center h-64 sm:h-80">
                                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                                                <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 text-blue-500 animate-spin" />
                                            </div>
                                            <p className="text-sm text-gray-500 mt-4">Generating Barcode...</p>
                                        </div>
                                    ) : barcodeDataUrl ? (
                                        <div className="space-y-4">
                                            <div className="flex justify-center bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                                <img
                                                    ref={imgRef}
                                                    src={barcodeDataUrl}
                                                    alt="Barcode"
                                                    className="max-w-full h-auto"
                                                />
                                                <canvas
                                                    ref={canvasRef}
                                                    className="hidden"
                                                />
                                            </div>

                                            <div className="flex flex-wrap gap-2 justify-center">
                                                <button
                                                    onClick={handleCopy}
                                                    className="flex-1 min-w-[80px] bg-gray-100 text-gray-700 px-3 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm flex items-center justify-center gap-2"
                                                >
                                                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-4 h-4" />
                                                    {copied ? 'Copied!' : 'Copy'}
                                                </button>
                                                <button
                                                    onClick={handleDownload}
                                                    className="flex-1 min-w-[80px] bg-blue-500 text-white px-3 py-2 rounded-xl font-medium hover:bg-blue-600 transition-colors text-sm flex items-center justify-center gap-2"
                                                >
                                                    <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
                                                    Download
                                                </button>
                                            </div>

                                            <div className="bg-gray-50 rounded-xl p-3">
                                                <p className="text-xs text-gray-500 text-center truncate">
                                                    Data: {input}
                                                </p>
                                                <p className="text-xs text-gray-400 text-center mt-1">
                                                    Type: {barcodeOptions.bcid.toUpperCase()} • Scale: {barcodeOptions.scale}x
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-64 sm:h-80 text-center">
                                            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center">
                                                <FontAwesomeIcon icon={faBarcode} className="w-10 h-10 text-gray-300" />
                                            </div>
                                            <p className="text-sm text-gray-500 mt-4">
                                                Enter text or number and click generate
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Your Barcode will appear here
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tips Section */}
                        <div className="mt-8 sm:mt-12 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">💡 Tips for Barcode</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-blue-600">1</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Choose Correct Type</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Select barcode type that fits your need</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-indigo-600">2</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Valid Characters</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Some types only accept numbers</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-purple-600">3</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Check Size</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Adjust scale for better readability</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs sm:text-sm font-bold text-pink-600">4</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">Test Scanning</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Test barcode with a scanner app</p>
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