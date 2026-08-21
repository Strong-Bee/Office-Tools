// app/(pages)/tools/developer/qr-code-generator/page.tsx

'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faQrcode,
    faDownload,
    faCopy,
    faCheck,
    faSpinner,
    faBolt,
    faShield,
    faClock,
    faPalette,
    faExpand,
    faFileImage,
    faTrash,
    faRefresh,
    faImage,
    faUpload,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import QRCode from 'qrcode';

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
type SizeMode = 'auto' | '128' | '256' | '512' | '1024';

interface QRCodeOptions {
    width: number;
    margin: number;
    color: {
        dark: string;
        light: string;
    };
    errorCorrectionLevel: ErrorCorrectionLevel;
    sizeMode: SizeMode;
    logoSize: number;
}

export default function QRCodeGeneratorPage() {
    const [isVisible, setIsVisible] = useState(false);

    const [input, setInput] = useState('');
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);

    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const [qrOptions, setQrOptions] = useState<QRCodeOptions>({
        width: 512,
        margin: 2,
        color: {
            dark: '#1f2937',
            light: '#ffffff',
        },
        errorCorrectionLevel: 'M',
        sizeMode: 'auto',
        logoSize: 20,
    });

    const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg'>('png');

    const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
    const [logoFileName, setLogoFileName] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    /**
     * Calculate QR size automatically.
     *
     * Auto mode:
     * - Desktop: 512px
     * - Small desktop/tablet: 420px
     * - Mobile: 320px
     *
     * The generated image can still be displayed responsively.
     */
    const getActualQRWidth = useCallback(() => {
        if (qrOptions.sizeMode !== 'auto') {
            return qrOptions.width;
        }

        if (typeof window === 'undefined') {
            return 512;
        }

        const viewportWidth = window.innerWidth;

        if (viewportWidth < 640) {
            return 320;
        }

        if (viewportWidth < 1024) {
            return 420;
        }

        return 512;
    }, [qrOptions.sizeMode, qrOptions.width]);

    /**
     * Generate base QR Code.
     */
    const generateBaseQRCode = useCallback(async () => {
        const value = input.trim();

        if (!value) {
            throw new Error('Please enter text or URL.');
        }

        const width = getActualQRWidth();

        const dataUrl = await QRCode.toDataURL(value, {
            width,
            margin: qrOptions.margin,
            color: {
                dark: qrOptions.color.dark,
                light: qrOptions.color.light,
            },
            errorCorrectionLevel:
                logoDataUrl && qrOptions.errorCorrectionLevel !== 'H'
                    ? 'H'
                    : qrOptions.errorCorrectionLevel,
        });

        return dataUrl;
    }, [
        input,
        getActualQRWidth,
        qrOptions.margin,
        qrOptions.color.dark,
        qrOptions.color.light,
        qrOptions.errorCorrectionLevel,
        logoDataUrl,
    ]);

    /**
     * Add logo to the center of QR Code using Canvas.
     *
     * The logo gets:
     * - white background
     * - rounded container
     * - padding
     * - configurable size
     */
    const addLogoToQRCode = useCallback(
        async (qrDataUrl: string) => {
            if (!logoDataUrl) {
                return qrDataUrl;
            }

            return new Promise<string>((resolve, reject) => {
                const qrImage = new Image();
                const logoImage = new Image();

                qrImage.onload = () => {
                    logoImage.onload = () => {
                        try {
                            const canvas = document.createElement('canvas');

                            canvas.width = qrImage.naturalWidth;
                            canvas.height = qrImage.naturalHeight;

                            const ctx = canvas.getContext('2d');

                            if (!ctx) {
                                reject(
                                    new Error(
                                        'Unable to create canvas context.'
                                    )
                                );
                                return;
                            }

                            // Draw QR
                            ctx.drawImage(
                                qrImage,
                                0,
                                0,
                                canvas.width,
                                canvas.height
                            );

                            const logoPercentage =
                                qrOptions.logoSize / 100;

                            const logoContainerSize =
                                canvas.width * logoPercentage;

                            const padding =
                                Math.max(
                                    8,
                                    Math.round(logoContainerSize * 0.12)
                                );

                            const logoSize =
                                logoContainerSize - padding * 2;

                            const centerX = canvas.width / 2;
                            const centerY = canvas.height / 2;

                            const containerX =
                                centerX - logoContainerSize / 2;

                            const containerY =
                                centerY - logoContainerSize / 2;

                            /**
                             * White logo background.
                             */
                            ctx.save();

                            const radius =
                                logoContainerSize * 0.18;

                            ctx.beginPath();
                            ctx.moveTo(containerX + radius, containerY);
                            ctx.lineTo(
                                containerX +
                                logoContainerSize -
                                radius,
                                containerY
                            );
                            ctx.quadraticCurveTo(
                                containerX +
                                logoContainerSize,
                                containerY,
                                containerX +
                                logoContainerSize,
                                containerY + radius
                            );
                            ctx.lineTo(
                                containerX +
                                logoContainerSize,
                                containerY +
                                logoContainerSize -
                                radius
                            );
                            ctx.quadraticCurveTo(
                                containerX +
                                logoContainerSize,
                                containerY +
                                logoContainerSize,
                                containerX +
                                logoContainerSize -
                                radius,
                                containerY +
                                logoContainerSize
                            );
                            ctx.lineTo(
                                containerX + radius,
                                containerY +
                                logoContainerSize
                            );
                            ctx.quadraticCurveTo(
                                containerX,
                                containerY +
                                logoContainerSize,
                                containerX,
                                containerY +
                                logoContainerSize -
                                radius
                            );
                            ctx.lineTo(
                                containerX,
                                containerY + radius
                            );
                            ctx.quadraticCurveTo(
                                containerX,
                                containerY,
                                containerX + radius,
                                containerY
                            );
                            ctx.closePath();

                            ctx.fillStyle = '#ffffff';
                            ctx.fill();

                            ctx.restore();

                            /**
                             * Draw logo.
                             */
                            const logoX =
                                centerX - logoSize / 2;

                            const logoY =
                                centerY - logoSize / 2;

                            ctx.save();

                            ctx.beginPath();

                            const logoRadius =
                                logoSize * 0.12;

                            ctx.moveTo(
                                logoX + logoRadius,
                                logoY
                            );

                            ctx.lineTo(
                                logoX +
                                logoSize -
                                logoRadius,
                                logoY
                            );

                            ctx.quadraticCurveTo(
                                logoX + logoSize,
                                logoY,
                                logoX + logoSize,
                                logoY + logoRadius
                            );

                            ctx.lineTo(
                                logoX + logoSize,
                                logoY +
                                logoSize -
                                logoRadius
                            );

                            ctx.quadraticCurveTo(
                                logoX + logoSize,
                                logoY + logoSize,
                                logoX +
                                logoSize -
                                logoRadius,
                                logoY + logoSize
                            );

                            ctx.lineTo(
                                logoX + logoRadius,
                                logoY + logoSize
                            );

                            ctx.quadraticCurveTo(
                                logoX,
                                logoY + logoSize,
                                logoX,
                                logoY +
                                logoSize -
                                logoRadius
                            );

                            ctx.lineTo(
                                logoX,
                                logoY + logoRadius
                            );

                            ctx.quadraticCurveTo(
                                logoX,
                                logoY,
                                logoX + logoRadius,
                                logoY
                            );

                            ctx.closePath();

                            ctx.clip();

                            /**
                             * object-fit: contain behavior
                             */
                            const imageRatio =
                                logoImage.naturalWidth /
                                logoImage.naturalHeight;

                            let drawWidth = logoSize;
                            let drawHeight = logoSize;

                            if (imageRatio > 1) {
                                drawHeight =
                                    logoSize / imageRatio;
                            } else {
                                drawWidth =
                                    logoSize * imageRatio;
                            }

                            const drawX =
                                centerX - drawWidth / 2;

                            const drawY =
                                centerY - drawHeight / 2;

                            ctx.drawImage(
                                logoImage,
                                drawX,
                                drawY,
                                drawWidth,
                                drawHeight
                            );

                            ctx.restore();

                            resolve(
                                canvas.toDataURL(
                                    'image/png',
                                    1
                                )
                            );
                        } catch (err) {
                            reject(err);
                        }
                    };

                    logoImage.onerror = () => {
                        reject(
                            new Error(
                                'Failed to load logo image.'
                            )
                        );
                    };

                    logoImage.src = logoDataUrl;
                };

                qrImage.onerror = () => {
                    reject(
                        new Error(
                            'Failed to load QR Code image.'
                        )
                    );
                };

                qrImage.src = qrDataUrl;
            });
        },
        [logoDataUrl, qrOptions.logoSize]
    );

    /**
     * Generate final QR Code.
     */
    const generateQRCode = useCallback(async () => {
        const value = input.trim();

        if (!value) {
            setQrCodeDataUrl(null);
            setError('Please enter text or URL.');
            return;
        }

        setIsGenerating(true);
        setError(null);
        setCopied(false);

        try {
            const baseQRCode = await generateBaseQRCode();

            const finalQRCode = await addLogoToQRCode(
                baseQRCode
            );

            setQrCodeDataUrl(finalQRCode);
        } catch (err) {
            console.error(
                'QR Code generation error:',
                err
            );

            setQrCodeDataUrl(null);

            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to generate QR Code.'
            );
        } finally {
            setIsGenerating(false);
        }
    }, [
        input,
        generateBaseQRCode,
        addLogoToQRCode,
    ]);

    /**
     * Upload logo.
     */
    const handleLogoUpload = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];

            if (!file) {
                return;
            }

            if (!file.type.startsWith('image/')) {
                setError(
                    'Please select a valid image file.'
                );

                event.target.value = '';
                return;
            }

            const maxSize = 5 * 1024 * 1024;

            if (file.size > maxSize) {
                setError(
                    'Logo size must be smaller than 5MB.'
                );

                event.target.value = '';
                return;
            }

            const reader = new FileReader();

            reader.onload = () => {
                const result = reader.result;

                if (typeof result !== 'string') {
                    setError(
                        'Failed to read logo image.'
                    );
                    return;
                }

                setLogoDataUrl(result);
                setLogoFileName(file.name);
                setError(null);

                /**
                 * Logo requires stronger error correction.
                 */
                setQrOptions((prev) => ({
                    ...prev,
                    errorCorrectionLevel: 'H',
                }));

                setQrCodeDataUrl(null);
            };

            reader.onerror = () => {
                setError(
                    'Failed to read logo image.'
                );
            };

            reader.readAsDataURL(file);

            event.target.value = '';
        },
        []
    );

    /**
     * Remove logo.
     */
    const handleRemoveLogo = useCallback(() => {
        setLogoDataUrl(null);
        setLogoFileName(null);
        setQrCodeDataUrl(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    /**
     * Download PNG or SVG.
     */
    const handleDownload = useCallback(
        async (format: 'png' | 'svg') => {
            if (!input.trim()) {
                setError(
                    'Please generate a QR Code first.'
                );
                return;
            }

            try {
                setError(null);

                /**
                 * PNG
                 */
                if (format === 'png') {
                    if (!qrCodeDataUrl) {
                        await generateQRCode();
                        return;
                    }

                    const link =
                        document.createElement('a');

                    link.href = qrCodeDataUrl;

                    link.download = `qrcode-${Date.now()}.png`;

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    return;
                }

                /**
                 * SVG without logo.
                 */
                if (!logoDataUrl) {
                    const svgString =
                        await QRCode.toString(
                            input.trim(),
                            {
                                type: 'svg',
                                width: getActualQRWidth(),
                                margin: qrOptions.margin,
                                color: {
                                    dark:
                                        qrOptions.color
                                            .dark,
                                    light:
                                        qrOptions.color
                                            .light,
                                },
                                errorCorrectionLevel:
                                    qrOptions.errorCorrectionLevel,
                            }
                        );

                    const blob = new Blob(
                        [svgString],
                        {
                            type: 'image/svg+xml;charset=utf-8',
                        }
                    );

                    const url =
                        URL.createObjectURL(blob);

                    const link =
                        document.createElement('a');

                    link.href = url;

                    link.download = `qrcode-${Date.now()}.svg`;

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    URL.revokeObjectURL(url);

                    return;
                }

                /**
                 * SVG with logo.
                 *
                 * We use the generated PNG as an
                 * embedded base64 image inside SVG.
                 */
                if (!qrCodeDataUrl) {
                    await generateQRCode();
                    return;
                }

                const width = getActualQRWidth();

                const svg = `
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${width}"
    height="${width}"
    viewBox="0 0 ${width} ${width}"
>
    <image
        href="${qrCodeDataUrl}"
        width="${width}"
        height="${width}"
        preserveAspectRatio="none"
    />
</svg>`.trim();

                const blob = new Blob([svg], {
                    type: 'image/svg+xml;charset=utf-8',
                });

                const url =
                    URL.createObjectURL(blob);

                const link =
                    document.createElement('a');

                link.href = url;

                link.download = `qrcode-${Date.now()}.svg`;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                URL.revokeObjectURL(url);
            } catch (err) {
                console.error(
                    'QR Code download error:',
                    err
                );

                setError(
                    'Failed to download QR Code.'
                );
            }
        },
        [
            input,
            qrCodeDataUrl,
            logoDataUrl,
            generateQRCode,
            getActualQRWidth,
            qrOptions.margin,
            qrOptions.color.dark,
            qrOptions.color.light,
            qrOptions.errorCorrectionLevel,
        ]
    );

    /**
     * Copy QR Code image.
     */
    const handleCopy = useCallback(async () => {
        if (!qrCodeDataUrl) {
            return;
        }

        try {
            const response =
                await fetch(qrCodeDataUrl);

            const blob =
                await response.blob();

            if (
                navigator.clipboard &&
                typeof ClipboardItem !==
                'undefined' &&
                navigator.clipboard.write
            ) {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        [blob.type]: blob,
                    }),
                ]);
            } else {
                await navigator.clipboard.writeText(
                    input
                );
            }

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error(
                'Copy error:',
                err
            );

            try {
                await navigator.clipboard.writeText(
                    input
                );

                setCopied(true);

                window.setTimeout(() => {
                    setCopied(false);
                }, 2000);
            } catch {
                setError(
                    'Unable to copy QR Code.'
                );
            }
        }
    }, [qrCodeDataUrl, input]);

    /**
     * Clear everything.
     */
    const handleClear = useCallback(() => {
        setInput('');
        setQrCodeDataUrl(null);
        setError(null);
        setCopied(false);
        setLogoDataUrl(null);
        setLogoFileName(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    /**
     * Example.
     */
    const handleExample = useCallback(
        (text: string) => {
            setInput(text);
            setQrCodeDataUrl(null);
            setError(null);
            setCopied(false);
        },
        []
    );

    /**
     * Automatically clear generated QR
     * when input becomes empty.
     */
    useEffect(() => {
        if (!input.trim()) {
            setQrCodeDataUrl(null);
            setError(null);
        }
    }, [input]);

    /**
     * Regenerate automatically when
     * configuration changes.
     */
    useEffect(() => {
        if (!input.trim()) {
            return;
        }

        setQrCodeDataUrl(null);
    }, [
        qrOptions,
        logoDataUrl,
        input,
    ]);

    /**
     * Re-generate automatic size on resize.
     */
    useEffect(() => {
        if (
            qrOptions.sizeMode !== 'auto' ||
            !input.trim()
        ) {
            return;
        }

        const handleResize = () => {
            setQrCodeDataUrl(null);
        };

        window.addEventListener(
            'resize',
            handleResize
        );

        return () => {
            window.removeEventListener(
                'resize',
                handleResize
            );
        };
    }, [
        qrOptions.sizeMode,
        input,
    ]);

    const examples = [
        'https://officetools.com',
        'Hello, World!',
        'https://github.com',
        'https://linkedin.com',
    ];

    const features = [
        {
            icon: faBolt,
            title: 'Fast Generation',
            desc: 'Generate QR Code in seconds',
        },
        {
            icon: faShield,
            title: 'Secure',
            desc: 'Your data is safe and private',
        },
        {
            icon: faClock,
            title: 'Customizable',
            desc: 'Size, colors, and logo',
        },
    ];

    const actualQRWidth =
        getActualQRWidth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            {/* Hero */}
            <section className="relative overflow-hidden px-4 pb-8 pt-24 sm:pb-12 sm:pt-28 md:pt-32">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-transparent to-cyan-50/50" />

                <div className="absolute right-20 top-20 h-64 w-64 animate-pulse rounded-full bg-teal-400/10 blur-3xl sm:h-96 sm:w-96" />

                <div className="absolute bottom-20 left-20 h-64 w-64 animate-pulse rounded-full bg-cyan-400/10 blur-3xl [animation-delay:1000ms] sm:h-96 sm:w-96" />

                <div className="container relative mx-auto">
                    <div className="mx-auto max-w-4xl">
                        <Link
                            href="/tools/developer"
                            className={`mb-4 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 sm:mb-6 ${isVisible
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-4 opacity-0'
                                }`}
                        >
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                className="h-4 w-4"
                            />

                            Back to Developer Tools
                        </Link>

                        <div
                            className={`transition-all duration-700 ${isVisible
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-4 opacity-0'
                                }`}
                        >
                            <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-600">
                                <FontAwesomeIcon
                                    icon={faQrcode}
                                    className="h-4 w-4"
                                />

                                Developer Tool
                            </div>

                            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                                <span className="bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                                    QR Code Generator
                                </span>
                            </h1>

                            <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
                                Generate QR Code dengan
                                ukuran otomatis,
                                custom color, dan
                                logo di tengah QR.
                                Download dalam PNG
                                atau SVG.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="px-4 py-4 sm:py-6">
                <div className="container mx-auto">
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                        {features.map(
                            (feature) => (
                                <div
                                    key={
                                        feature.title
                                    }
                                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 text-center shadow-sm sm:block sm:p-4"
                                >
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-50 sm:mx-auto sm:mb-2 sm:h-10 sm:w-10">
                                        <FontAwesomeIcon
                                            icon={
                                                feature.icon
                                            }
                                            className="h-4 w-4 text-teal-600 sm:h-5 sm:w-5"
                                        />
                                    </div>

                                    <div className="text-left sm:text-center">
                                        <h4 className="text-xs font-semibold text-gray-800 sm:text-sm">
                                            {
                                                feature.title
                                            }
                                        </h4>

                                        <p className="hidden text-[10px] text-gray-500 sm:block sm:text-xs">
                                            {
                                                feature.desc
                                            }
                                        </p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Main Tool */}
            <section className="px-4 py-8 sm:py-12">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-5xl">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* INPUT */}
                            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl sm:rounded-3xl">
                                <div className="border-b border-gray-100 bg-gradient-to-r from-teal-50 to-cyan-50 p-4 sm:p-6">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 sm:h-12 sm:w-12">
                                                <FontAwesomeIcon
                                                    icon={
                                                        faQrcode
                                                    }
                                                    className="h-5 w-5 text-teal-600 sm:h-6 sm:w-6"
                                                />
                                            </div>

                                            <div>
                                                <h2 className="text-base font-bold text-gray-800 sm:text-lg">
                                                    Generate QR
                                                    Code
                                                </h2>

                                                <p className="text-xs text-gray-500 sm:text-sm">
                                                    Enter text
                                                    or URL
                                                </p>
                                            </div>
                                        </div>

                                        {(input ||
                                            qrCodeDataUrl ||
                                            logoDataUrl) && (
                                                <button
                                                    type="button"
                                                    onClick={
                                                        handleClear
                                                    }
                                                    className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-red-600 transition-colors hover:bg-red-50 sm:px-4 sm:py-2 sm:text-sm"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faTrash
                                                        }
                                                        className="h-3 w-3"
                                                    />

                                                    Clear
                                                </button>
                                            )}
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6">
                                    <div className="space-y-4">
                                        <textarea
                                            value={
                                                input
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                setInput(
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="Enter text or URL to generate QR Code..."
                                            className="h-32 w-full resize-none rounded-xl border border-gray-200 p-4 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 sm:h-40 sm:text-base"
                                        />

                                        {/* Examples */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-xs font-medium text-gray-500">
                                                Examples:
                                            </span>

                                            {examples.map(
                                                (
                                                    example
                                                ) => (
                                                    <button
                                                        type="button"
                                                        key={
                                                            example
                                                        }
                                                        onClick={() =>
                                                            handleExample(
                                                                example
                                                            )
                                                        }
                                                        className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200"
                                                    >
                                                        {
                                                            example
                                                        }
                                                    </button>
                                                )
                                            )}
                                        </div>

                                        {/* SIZE */}
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-gray-700">
                                                <FontAwesomeIcon
                                                    icon={
                                                        faExpand
                                                    }
                                                    className="mr-1 h-3 w-3"
                                                />

                                                QR Code
                                                Size
                                            </label>

                                            <select
                                                value={
                                                    qrOptions.sizeMode
                                                }
                                                onChange={(
                                                    e
                                                ) => {
                                                    const value =
                                                        e
                                                            .target
                                                            .value as SizeMode;

                                                    setQrOptions(
                                                        (
                                                            prev
                                                        ) => ({
                                                            ...prev,
                                                            sizeMode:
                                                                value,
                                                            width:
                                                                value ===
                                                                    'auto'
                                                                    ? prev.width
                                                                    : Number(
                                                                        value
                                                                    ),
                                                        })
                                                    );
                                                }}
                                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            >
                                                <option value="auto">
                                                    Auto -
                                                    Responsive
                                                </option>

                                                <option value="128">
                                                    128px
                                                </option>

                                                <option value="256">
                                                    256px
                                                </option>

                                                <option value="512">
                                                    512px
                                                </option>

                                                <option value="1024">
                                                    1024px
                                                </option>
                                            </select>

                                            <p className="mt-1 text-[11px] text-gray-400">
                                                Auto:
                                                {actualQRWidth}
                                                px
                                                pada
                                                perangkat
                                                ini
                                            </p>
                                        </div>

                                        {/* ERROR CORRECTION */}
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-gray-700">
                                                Error
                                                Correction
                                            </label>

                                            <select
                                                value={
                                                    qrOptions.errorCorrectionLevel
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    setQrOptions(
                                                        (
                                                            prev
                                                        ) => ({
                                                            ...prev,
                                                            errorCorrectionLevel:
                                                                e
                                                                    .target
                                                                    .value as ErrorCorrectionLevel,
                                                        })
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            >
                                                <option value="L">
                                                    Low (7%)
                                                </option>

                                                <option value="M">
                                                    Medium (15%)
                                                </option>

                                                <option value="Q">
                                                    Quartile
                                                    (25%)
                                                </option>

                                                <option value="H">
                                                    High (30%)
                                                </option>
                                            </select>

                                            {logoDataUrl && (
                                                <p className="mt-1 text-[11px] text-teal-600">
                                                    Logo aktif:
                                                    level H
                                                    digunakan
                                                    agar QR
                                                    lebih
                                                    mudah
                                                    dipindai.
                                                </p>
                                            )}
                                        </div>

                                        {/* COLORS */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faPalette
                                                        }
                                                        className="mr-1 h-3 w-3"
                                                    />

                                                    Foreground
                                                </label>

                                                <input
                                                    type="color"
                                                    value={
                                                        qrOptions
                                                            .color
                                                            .dark
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        setQrOptions(
                                                            (
                                                                prev
                                                            ) => ({
                                                                ...prev,
                                                                color: {
                                                                    ...prev.color,
                                                                    dark: e
                                                                        .target
                                                                        .value,
                                                                },
                                                            })
                                                        )
                                                    }
                                                    className="h-10 w-full cursor-pointer rounded-lg border border-gray-200"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faPalette
                                                        }
                                                        className="mr-1 h-3 w-3"
                                                    />

                                                    Background
                                                </label>

                                                <input
                                                    type="color"
                                                    value={
                                                        qrOptions
                                                            .color
                                                            .light
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        setQrOptions(
                                                            (
                                                                prev
                                                            ) => ({
                                                                ...prev,
                                                                color: {
                                                                    ...prev.color,
                                                                    light: e
                                                                        .target
                                                                        .value,
                                                                },
                                                            })
                                                        )
                                                    }
                                                    className="h-10 w-full cursor-pointer rounded-lg border border-gray-200"
                                                />
                                            </div>
                                        </div>

                                        {/* LOGO */}
                                        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
                                            <div className="mb-3 flex items-center justify-between gap-2">
                                                <div>
                                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faImage
                                                            }
                                                            className="h-4 w-4 text-teal-600"
                                                        />

                                                        Logo
                                                        Tengah
                                                    </label>

                                                    <p className="mt-1 text-[11px] text-gray-500">
                                                        Tambahkan
                                                        logo ke
                                                        tengah
                                                        QR Code
                                                    </p>
                                                </div>

                                                {logoDataUrl && (
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            handleRemoveLogo
                                                        }
                                                        className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-red-600 hover:bg-red-100"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faXmark
                                                            }
                                                            className="h-3 w-3"
                                                        />

                                                        Remove
                                                    </button>
                                                )}
                                            </div>

                                            <input
                                                ref={
                                                    fileInputRef
                                                }
                                                type="file"
                                                accept="image/png,image/jpeg,image/webp"
                                                onChange={
                                                    handleLogoUpload
                                                }
                                                className="hidden"
                                            />

                                            {logoDataUrl ? (
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                                                        <img
                                                            src={
                                                                logoDataUrl
                                                            }
                                                            alt="QR Logo"
                                                            className="h-12 w-12 rounded-lg border object-contain"
                                                        />

                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate text-xs font-medium text-gray-700">
                                                                {
                                                                    logoFileName
                                                                }
                                                            </p>

                                                            <p className="text-[11px] text-green-600">
                                                                Logo
                                                                siap
                                                                digunakan
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="mb-1 flex items-center justify-between">
                                                            <label className="text-xs font-medium text-gray-700">
                                                                Logo
                                                                Size
                                                            </label>

                                                            <span className="text-xs font-semibold text-teal-600">
                                                                {
                                                                    qrOptions.logoSize
                                                                }
                                                                %
                                                            </span>
                                                        </div>

                                                        <input
                                                            type="range"
                                                            min="12"
                                                            max="30"
                                                            step="1"
                                                            value={
                                                                qrOptions.logoSize
                                                            }
                                                            onChange={(
                                                                e
                                                            ) =>
                                                                setQrOptions(
                                                                    (
                                                                        prev
                                                                    ) => ({
                                                                        ...prev,
                                                                        logoSize:
                                                                            Number(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            ),
                                                                    })
                                                                )
                                                            }
                                                            className="w-full accent-teal-500"
                                                        />

                                                        <div className="mt-1 flex justify-between text-[10px] text-gray-400">
                                                            <span>
                                                                12%
                                                            </span>

                                                            <span>
                                                                20%
                                                            </span>

                                                            <span>
                                                                30%
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        fileInputRef.current?.click()
                                                    }
                                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faUpload
                                                        }
                                                        className="h-4 w-4"
                                                    />

                                                    Upload
                                                    Logo
                                                </button>
                                            )}

                                            <p className="mt-2 text-[10px] text-gray-400">
                                                PNG, JPG,
                                                atau WEBP
                                                • Maks.
                                                5MB
                                            </p>
                                        </div>

                                        {/* GENERATE */}
                                        <button
                                            type="button"
                                            onClick={
                                                generateQRCode
                                            }
                                            disabled={
                                                !input.trim() ||
                                                isGenerating
                                            }
                                            className={`w-full rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 text-sm font-medium text-white transition-all sm:text-base ${input.trim() &&
                                                !isGenerating
                                                ? 'hover:scale-[1.02] hover:shadow-lg'
                                                : 'cursor-not-allowed opacity-50'
                                                }`}
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faSpinner
                                                        }
                                                        className="mr-2 h-4 w-4 animate-spin"
                                                    />

                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faQrcode
                                                        }
                                                        className="mr-2 h-4 w-4"
                                                    />

                                                    Generate
                                                    QR Code
                                                </>
                                            )}
                                        </button>

                                        {error && (
                                            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                                                {
                                                    error
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* OUTPUT */}
                            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl sm:rounded-3xl">
                                <div className="border-b border-gray-100 bg-gradient-to-r from-teal-50 to-cyan-50 p-4 sm:p-6">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 sm:h-12 sm:w-12">
                                                <FontAwesomeIcon
                                                    icon={
                                                        faQrcode
                                                    }
                                                    className="h-5 w-5 text-teal-600 sm:h-6 sm:w-6"
                                                />
                                            </div>

                                            <div>
                                                <h2 className="text-base font-bold text-gray-800 sm:text-lg">
                                                    QR Code
                                                    Result
                                                </h2>

                                                <p className="text-xs text-gray-500 sm:text-sm">
                                                    {qrCodeDataUrl
                                                        ? 'Generated successfully'
                                                        : 'Waiting for input'}
                                                </p>
                                            </div>
                                        </div>

                                        {qrCodeDataUrl && (
                                            <button
                                                type="button"
                                                onClick={
                                                    generateQRCode
                                                }
                                                disabled={
                                                    isGenerating
                                                }
                                                className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-teal-600 transition-colors hover:bg-teal-50 sm:px-4 sm:py-2 sm:text-sm"
                                            >
                                                <FontAwesomeIcon
                                                    icon={
                                                        faRefresh
                                                    }
                                                    className={`h-3 w-3 ${isGenerating
                                                        ? 'animate-spin'
                                                        : ''
                                                        }`}
                                                />

                                                Regenerate
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6">
                                    {isGenerating ? (
                                        <div className="flex h-64 flex-col items-center justify-center sm:h-80">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50">
                                                <FontAwesomeIcon
                                                    icon={
                                                        faSpinner
                                                    }
                                                    className="h-8 w-8 animate-spin text-teal-500"
                                                />
                                            </div>

                                            <p className="mt-4 text-sm text-gray-500">
                                                Generating
                                                QR Code...
                                            </p>
                                        </div>
                                    ) : qrCodeDataUrl ? (
                                        <div className="space-y-4">
                                            {/* QR */}
                                            <div className="flex justify-center">
                                                <div className="w-full max-w-[512px] rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                                                    <img
                                                        src={
                                                            qrCodeDataUrl
                                                        }
                                                        alt="Generated QR Code"
                                                        width={
                                                            actualQRWidth
                                                        }
                                                        height={
                                                            actualQRWidth
                                                        }
                                                        className="mx-auto block h-auto w-full max-w-[512px]"
                                                        style={{
                                                            aspectRatio:
                                                                '1 / 1',
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Logo indicator */}
                                            {logoDataUrl && (
                                                <div className="flex items-center justify-center gap-2 text-xs text-teal-600">
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faImage
                                                        }
                                                        className="h-3 w-3"
                                                    />

                                                    Logo berada
                                                    di tengah
                                                    QR Code
                                                </div>
                                            )}

                                            {/* Actions */}
                                            <div className="flex flex-wrap justify-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={
                                                        handleCopy
                                                    }
                                                    className="flex min-w-[80px] flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            copied
                                                                ? faCheck
                                                                : faCopy
                                                        }
                                                        className="h-4 w-4"
                                                    />

                                                    {copied
                                                        ? 'Copied!'
                                                        : 'Copy'}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setDownloadFormat(
                                                            'png'
                                                        );

                                                        handleDownload(
                                                            'png'
                                                        );
                                                    }}
                                                    className={`flex min-w-[80px] flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white transition-colors ${downloadFormat ===
                                                        'png'
                                                        ? 'bg-teal-500 hover:bg-teal-600'
                                                        : 'bg-teal-400'
                                                        }`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faDownload
                                                        }
                                                        className="h-4 w-4"
                                                    />

                                                    PNG
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setDownloadFormat(
                                                            'svg'
                                                        );

                                                        handleDownload(
                                                            'svg'
                                                        );
                                                    }}
                                                    className={`flex min-w-[80px] flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white transition-colors ${downloadFormat ===
                                                        'svg'
                                                        ? 'bg-cyan-500 hover:bg-cyan-600'
                                                        : 'bg-cyan-400'
                                                        }`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faFileImage
                                                        }
                                                        className="h-4 w-4"
                                                    />

                                                    SVG
                                                </button>
                                            </div>

                                            {/* Information */}
                                            <div className="rounded-xl bg-gray-50 p-3">
                                                <p className="truncate text-center text-xs text-gray-500">
                                                    Data:{' '}
                                                    {
                                                        input
                                                    }
                                                </p>

                                                <p className="mt-1 text-center text-xs text-gray-400">
                                                    Size:{' '}
                                                    {
                                                        actualQRWidth
                                                    }
                                                    px
                                                    {' • '}
                                                    Error:{' '}
                                                    {
                                                        logoDataUrl
                                                            ? 'H'
                                                            : qrOptions.errorCorrectionLevel
                                                    }

                                                    {logoDataUrl && (
                                                        <>
                                                            {' • '}
                                                            Logo:{' '}
                                                            {
                                                                qrOptions.logoSize
                                                            }
                                                            %
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex h-64 flex-col items-center justify-center text-center sm:h-80">
                                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
                                                <FontAwesomeIcon
                                                    icon={
                                                        faQrcode
                                                    }
                                                    className="h-10 w-10 text-gray-300"
                                                />
                                            </div>

                                            <p className="mt-4 text-sm text-gray-500">
                                                Enter text or
                                                URL and click
                                                generate
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                Your QR Code
                                                will appear
                                                here
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:mt-12 sm:rounded-3xl sm:p-8">
                            <h3 className="mb-4 text-base font-bold text-gray-800 sm:text-lg">
                                💡 Tips for QR Code
                            </h3>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    {
                                        number: '1',
                                        title: 'Use Auto Size',
                                        desc: 'QR Code otomatis menyesuaikan ukuran perangkat.',
                                    },
                                    {
                                        number: '2',
                                        title: 'Add Your Logo',
                                        desc: 'Gunakan logo dengan ukuran maksimal sekitar 30%.',
                                    },
                                    {
                                        number: '3',
                                        title: 'Keep Good Contrast',
                                        desc: 'Pastikan warna QR dan background memiliki kontras tinggi.',
                                    },
                                    {
                                        number: '4',
                                        title: 'Use High Error Correction',
                                        desc: 'Logo otomatis menggunakan level H agar QR lebih tahan terhadap kerusakan.',
                                    },
                                ].map(
                                    (tip) => (
                                        <div
                                            key={
                                                tip.number
                                            }
                                            className="flex items-start gap-3"
                                        >
                                            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-50">
                                                <span className="text-sm font-bold text-teal-600">
                                                    {
                                                        tip.number
                                                    }
                                                </span>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-800">
                                                    {
                                                        tip.title
                                                    }
                                                </h4>

                                                <p className="text-xs text-gray-500 sm:text-sm">
                                                    {
                                                        tip.desc
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}