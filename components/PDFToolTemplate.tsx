// components/PDFToolTemplate.tsx

'use client';

import {
    faArrowLeft,
    faCheck,
    faDownload,
    faFilePdf,
    faSpinner,
    faTrash,
    faUpload,
    type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PDFToolFeature {
    icon: IconDefinition;
    title: string;
    desc: string;
}

interface PDFToolTip {
    title: string;
    desc: string;
}

interface ProcessResult {
    success: boolean;
    result?: string;
    error?: string;
}

interface PDFToolTemplateProps {
    title: string;
    description: string;

    /**
     * FontAwesome icon.
     */
    icon: IconDefinition;

    /**
     * Tailwind-compatible classes.
     *
     * Example:
     * colorClass="text-red-500"
     */
    colorClass?: string;

    /**
     * Tailwind background class.
     *
     * Example:
     * bgColor="bg-red-50"
     */
    bgColor?: string;

    /**
     * Tailwind gradient classes.
     *
     * Example:
     * gradient="from-red-500 to-orange-500"
     */
    gradient?: string;

    features: PDFToolFeature[];

    tips: PDFToolTip[];

    /**
     * Accepted file types.
     *
     * Example:
     * ".pdf"
     * ".pdf,image/*"
     * "application/pdf"
     */
    accept?: string;

    /**
     * Allow multiple files.
     */
    multiple?: boolean;

    /**
     * Maximum file size in MB.
     */
    maxSize?: number;

    /**
     * Process uploaded files.
     *
     * The returned result should be a downloadable URL.
     */
    onProcess?: (files: File[]) => Promise<ProcessResult>;
}

const DEFAULT_MAX_SIZE = 100;

export default function PDFToolTemplate({
    title,
    description,
    icon,
    colorClass = 'text-red-500',
    gradient = 'from-red-500 to-orange-500',
    bgColor = 'bg-red-50',
    features,
    tips,
    accept = '.pdf',
    multiple = false,
    maxSize = DEFAULT_MAX_SIZE,
    onProcess,
}: PDFToolTemplateProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
        null,
    );

    const maxBytes = useMemo(
        () => maxSize * 1024 * 1024,
        [maxSize],
    );

    useEffect(() => {
        setIsVisible(true);

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, []);

    /**
     * Check whether a file matches the accept attribute.
     */
    const isAcceptedFile = useCallback(
        (file: File): boolean => {
            const acceptedTypes = accept
                .split(',')
                .map((type) => type.trim().toLowerCase())
                .filter(Boolean);

            if (acceptedTypes.length === 0) {
                return true;
            }

            return acceptedTypes.some((type) => {
                // Extension
                if (type.startsWith('.')) {
                    return file.name.toLowerCase().endsWith(type);
                }

                // Wildcard MIME type
                if (type.endsWith('/*')) {
                    const baseType = type.slice(0, -2);
                    return file.type.toLowerCase().startsWith(`${baseType}/`);
                }

                // Exact MIME type
                return file.type.toLowerCase() === type;
            });
        },
        [accept],
    );

    /**
     * Validate files.
     */
    const validateFiles = useCallback(
        (selectedFiles: File[]): File[] => {
            const validFiles: File[] = [];
            const errors: string[] = [];

            for (const file of selectedFiles) {
                if (!isAcceptedFile(file)) {
                    errors.push(`"${file.name}" has an unsupported file type.`);
                    continue;
                }

                if (file.size > maxBytes) {
                    errors.push(
                        `"${file.name}" exceeds the ${maxSize}MB size limit.`,
                    );
                    continue;
                }

                validFiles.push(file);
            }

            if (errors.length > 0) {
                setError(errors.join(' '));
            } else {
                setError(null);
            }

            return validFiles;
        },
        [isAcceptedFile, maxBytes, maxSize],
    );

    /**
     * Add files to the queue.
     */
    const addFiles = useCallback(
        (selectedFiles: File[]) => {
            const validFiles = validateFiles(selectedFiles);

            if (validFiles.length === 0) {
                return;
            }

            setResult(null);

            if (multiple) {
                setFiles((previousFiles) => {
                    const existingKeys = new Set(
                        previousFiles.map(
                            (file) => `${file.name}-${file.size}-${file.lastModified}`,
                        ),
                    );

                    const uniqueFiles = validFiles.filter((file) => {
                        const key = `${file.name}-${file.size}-${file.lastModified}`;

                        if (existingKeys.has(key)) {
                            return false;
                        }

                        existingKeys.add(key);
                        return true;
                    });

                    return [...previousFiles, ...uniqueFiles];
                });

                return;
            }

            setFiles([validFiles[0]]);
        },
        [multiple, validateFiles],
    );

    /**
     * Drag over.
     */
    const handleDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.stopPropagation();

            if (!isProcessing) {
                setIsDragging(true);
            }
        },
        [isProcessing],
    );

    /**
     * Drag leave.
     */
    const handleDragLeave = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.stopPropagation();

            setIsDragging(false);
        },
        [],
    );

    /**
     * Drop files.
     */
    const handleDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.stopPropagation();

            setIsDragging(false);

            if (isProcessing) {
                return;
            }

            const droppedFiles = Array.from(event.dataTransfer.files);

            if (droppedFiles.length > 0) {
                addFiles(droppedFiles);
            }
        },
        [addFiles, isProcessing],
    );

    /**
     * File input change.
     */
    const handleFileSelect = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFiles = Array.from(event.target.files ?? []);

            if (selectedFiles.length > 0) {
                addFiles(selectedFiles);
            }

            // Allow selecting the same file again.
            event.target.value = '';
        },
        [addFiles],
    );

    /**
     * Remove one file.
     */
    const handleRemoveFile = useCallback((index: number) => {
        setFiles((previousFiles) =>
            previousFiles.filter((_, fileIndex) => fileIndex !== index),
        );

        setResult(null);
    }, []);

    /**
     * Clear everything.
     */
    const handleClearAll = useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }

        setFiles([]);
        setResult(null);
        setError(null);
        setProgress(0);
        setIsProcessing(false);
        setIsDragging(false);
    }, []);

    /**
     * Start fake progress for UI feedback.
     *
     * The real processing is still controlled by onProcess().
     */
    const startProgressSimulation = useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }

        progressIntervalRef.current = setInterval(() => {
            setProgress((previousProgress) => {
                if (previousProgress >= 90) {
                    return 90;
                }

                return Math.min(previousProgress + 5, 90);
            });
        }, 250);
    }, []);

    /**
     * Stop progress simulation.
     */
    const stopProgressSimulation = useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    }, []);

    /**
     * Process files.
     */
    const handleProcess = useCallback(async () => {
        if (files.length === 0 || isProcessing) {
            return;
        }

        setError(null);
        setResult(null);
        setIsProcessing(true);
        setProgress(5);

        startProgressSimulation();

        try {
            if (!onProcess) {
                /**
                 * Development fallback.
                 *
                 * In production, every real PDF tool should provide onProcess().
                 */
                await new Promise<void>((resolve) => {
                    setTimeout(resolve, 1800);
                });

                setProgress(100);
                setResult('#');

                return;
            }

            const processResult = await onProcess(files);

            if (!processResult.success) {
                throw new Error(
                    processResult.error || 'Failed to process the file.',
                );
            }

            if (!processResult.result) {
                throw new Error(
                    'Processing completed but no result file was returned.',
                );
            }

            setProgress(100);
            setResult(processResult.result);
        } catch (processError) {
            const message =
                processError instanceof Error
                    ? processError.message
                    : 'An unexpected error occurred while processing the file.';

            setError(message);
            setProgress(0);
        } finally {
            stopProgressSimulation();
            setIsProcessing(false);
        }
    }, [
        files,
        isProcessing,
        onProcess,
        startProgressSimulation,
        stopProgressSimulation,
    ]);

    /**
     * Download processed result.
     */
    const handleDownload = useCallback(() => {
        if (!result || result === '#') {
            return;
        }

        const anchor = document.createElement('a');

        anchor.href = result;
        anchor.download = '';
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';

        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
    }, [result]);

    /**
     * Format file size.
     */
    const formatFileSize = useCallback((bytes: number): string => {
        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        if (bytes < 1024 * 1024 * 1024) {
            return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
        }

        return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }, []);

    const totalSize = useMemo(
        () =>
            files.reduce(
                (total, file) => total + file.size,
                0,
            ),
        [files],
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />

            {/* Hero */}
            <section className="relative overflow-hidden px-4 pb-8 pt-24 sm:pb-12 sm:pt-28 md:pt-32">
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${bgColor} via-transparent to-orange-50/50`}
                    aria-hidden="true"
                />

                <div
                    className={`absolute right-10 top-20 h-64 w-64 rounded-full ${bgColor} opacity-40 blur-3xl sm:right-20 sm:h-96 sm:w-96`}
                    aria-hidden="true"
                />

                <div
                    className={`absolute bottom-10 left-10 h-64 w-64 rounded-full ${bgColor} opacity-30 blur-3xl sm:bottom-20 sm:left-20 sm:h-96 sm:w-96`}
                    aria-hidden="true"
                />

                <div className="container relative mx-auto">
                    <div className="mx-auto max-w-4xl">
                        <Link
                            href="/tools/pdf"
                            className={`mb-4 inline-flex items-center gap-2 text-gray-600 transition-all duration-700 hover:text-gray-900 sm:mb-6 ${isVisible
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-4 opacity-0'
                                }`}
                        >
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                className="h-4 w-4"
                            />

                            <span>Back to PDF Tools</span>
                        </Link>

                        <div
                            className={`transition-all delay-100 duration-700 ${isVisible
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-4 opacity-0'
                                }`}
                        >
                            <div
                                className={`mb-4 inline-flex items-center gap-3 rounded-full ${bgColor} px-4 py-2 text-sm font-medium ${colorClass}`}
                            >
                                <FontAwesomeIcon
                                    icon={icon}
                                    className="h-4 w-4"
                                />

                                <span>PDF Tool</span>
                            </div>

                            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                                <span
                                    className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                                >
                                    {title}
                                </span>
                            </h1>

                            <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            {features.length > 0 && (
                <section className="px-4 py-4 sm:py-6">
                    <div className="container mx-auto">
                        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                            {features.map((feature, index) => (
                                <div
                                    key={`${feature.title}-${index}`}
                                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:block sm:p-4 sm:text-center"
                                >
                                    <div
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${bgColor} sm:mx-auto sm:mb-2 sm:h-10 sm:w-10`}
                                    >
                                        <FontAwesomeIcon
                                            icon={feature.icon}
                                            className={`h-4 w-4 sm:h-5 sm:w-5 ${colorClass}`}
                                        />
                                    </div>

                                    <div className="text-left sm:text-center">
                                        <h4 className="text-xs font-semibold text-gray-800 sm:text-sm">
                                            {feature.title}
                                        </h4>

                                        <p className="hidden text-xs text-gray-500 sm:block">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Main Tool */}
            <section className="px-4 py-8 sm:py-12">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-4xl">
                        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl sm:rounded-3xl">
                            {/* Tool Header */}
                            <div
                                className={`border-b border-gray-100 bg-gradient-to-r ${bgColor} to-orange-50 p-4 sm:p-6`}
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${bgColor} sm:h-12 sm:w-12`}
                                        >
                                            <FontAwesomeIcon
                                                icon={icon}
                                                className={`h-5 w-5 sm:h-6 sm:w-6 ${colorClass}`}
                                            />
                                        </div>

                                        <div>
                                            <h2 className="text-base font-bold text-gray-800 sm:text-lg">
                                                {title}
                                            </h2>

                                            <p className="text-xs text-gray-500 sm:text-sm">
                                                {files.length} file
                                                {files.length === 1 ? '' : 's'} uploaded
                                                {files.length > 0 && (
                                                    <>
                                                        {' '}
                                                        • {formatFileSize(totalSize)}
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {files.length > 0 && !isProcessing && (
                                        <button
                                            type="button"
                                            onClick={handleClearAll}
                                            className="rounded-lg px-3 py-1.5 text-xs text-red-600 transition-colors hover:bg-red-50 sm:px-4 sm:py-2 sm:text-sm"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="border-b border-red-100 bg-red-50 px-4 py-3 sm:px-6">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                                            <span className="text-xs font-bold text-red-600">
                                                !
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-red-700">
                                                {error}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setError(null)}
                                            className="text-xs text-red-500 hover:text-red-700"
                                            aria-label="Dismiss error"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Upload */}
                            {files.length === 0 && !result && !isProcessing && (
                                <div className="p-6 sm:p-8 md:p-12">
                                    <div
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all sm:p-12 ${isDragging
                                            ? `${colorClass.replace(
                                                'text-',
                                                'border-',
                                            )} ${bgColor} scale-[1.01]`
                                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50/50'
                                            }`}
                                    >
                                        <div
                                            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${bgColor} sm:h-20 sm:w-20`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faUpload}
                                                className={`h-8 w-8 sm:h-10 sm:w-10 ${colorClass}`}
                                            />
                                        </div>

                                        <h3 className="mb-2 text-base font-semibold text-gray-800 sm:text-lg">
                                            Upload Your File
                                        </h3>

                                        <p className="mb-4 text-sm text-gray-500">
                                            Drag and drop your file here, or click to
                                            select
                                        </p>

                                        <label
                                            className={`inline-flex cursor-pointer items-center rounded-xl bg-gradient-to-r ${gradient} px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-lg sm:px-8 sm:py-3 sm:text-base`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faUpload}
                                                className="mr-2 h-4 w-4"
                                            />

                                            Select Files

                                            <input
                                                type="file"
                                                accept={accept}
                                                multiple={multiple}
                                                onChange={handleFileSelect}
                                                className="hidden"
                                            />
                                        </label>

                                        <p className="mt-4 text-xs text-gray-400">
                                            Supports {accept} files up to {maxSize}MB each
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* File List */}
                            {files.length > 0 && !result && !isProcessing && (
                                <div className="p-4 sm:p-6">
                                    <div className="space-y-2 sm:space-y-3">
                                        {files.map((file, index) => (
                                            <div
                                                key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                                                className="group flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100 sm:gap-4 sm:p-4"
                                            >
                                                <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                                                    <div
                                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bgColor} sm:h-10 sm:w-10`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={
                                                                file.type === 'application/pdf'
                                                                    ? faFilePdf
                                                                    : icon
                                                            }
                                                            className={`h-4 w-4 sm:h-5 sm:w-5 ${colorClass}`}
                                                        />
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium text-gray-800 sm:text-base">
                                                            {file.name}
                                                        </p>

                                                        <p className="text-xs text-gray-500 sm:text-sm">
                                                            {formatFileSize(file.size)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveFile(index)}
                                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                                                    aria-label={`Remove ${file.name}`}
                                                    title="Remove file"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                                                    />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row">
                                        <label className="flex-1 cursor-pointer rounded-xl bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 sm:px-6 sm:py-3 sm:text-base">
                                            <FontAwesomeIcon
                                                icon={faUpload}
                                                className="mr-2 h-4 w-4"
                                            />

                                            Add More Files

                                            <input
                                                type="file"
                                                accept={accept}
                                                multiple={multiple}
                                                onChange={handleFileSelect}
                                                className="hidden"
                                            />
                                        </label>

                                        <button
                                            type="button"
                                            onClick={handleProcess}
                                            disabled={files.length === 0 || isProcessing}
                                            className={`flex-1 rounded-xl bg-gradient-to-r ${gradient} px-6 py-2.5 text-sm font-medium text-white transition-all sm:py-3 sm:text-base ${files.length > 0 && !isProcessing
                                                ? 'hover:scale-[1.02] hover:shadow-lg'
                                                : 'cursor-not-allowed opacity-50'
                                                }`}
                                        >
                                            Process File
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Processing */}
                            {isProcessing && (
                                <div className="p-6 text-center sm:p-8">
                                    <div
                                        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${bgColor} sm:h-20 sm:w-20`}
                                    >
                                        <FontAwesomeIcon
                                            icon={faSpinner}
                                            className={`h-8 w-8 animate-spin sm:h-10 sm:w-10 ${colorClass}`}
                                        />
                                    </div>

                                    <h3 className="mb-2 text-base font-semibold text-gray-800 sm:text-lg">
                                        Processing...
                                    </h3>

                                    <p className="mb-4 text-sm text-gray-500">
                                        Please wait while we process your file
                                    </p>

                                    <div className="mx-auto h-2.5 w-full max-w-md overflow-hidden rounded-full bg-gray-200">
                                        <div
                                            className={`h-2.5 rounded-full bg-gradient-to-r ${gradient} transition-all duration-300`}
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                        />
                                    </div>

                                    <p className="mt-2 text-xs text-gray-400">
                                        {progress}% complete
                                    </p>
                                </div>
                            )}

                            {/* Result */}
                            {result && !isProcessing && (
                                <div className="p-6 text-center sm:p-8">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 sm:h-20 sm:w-20">
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="h-8 w-8 text-green-500 sm:h-10 sm:w-10"
                                        />
                                    </div>

                                    <h3 className="mb-2 text-base font-semibold text-gray-800 sm:text-lg">
                                        Success! 🎉
                                    </h3>

                                    <p className="mb-6 text-sm text-gray-500">
                                        Your file has been processed successfully.
                                    </p>

                                    <div className="flex flex-col justify-center gap-3 sm:flex-row">
                                        {result !== '#' && (
                                            <button
                                                type="button"
                                                onClick={handleDownload}
                                                className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${gradient} px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-lg sm:px-8 sm:py-3 sm:text-base`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faDownload}
                                                    className="h-4 w-4"
                                                />

                                                Download Result
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            onClick={handleClearAll}
                                            className="rounded-xl bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 sm:px-8 sm:py-3 sm:text-base"
                                        >
                                            Process Another File
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tips */}
                        {tips.length > 0 && (
                            <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:mt-12 sm:rounded-3xl sm:p-8">
                                <h3 className="mb-4 text-base font-bold text-gray-800 sm:text-lg">
                                    💡 Tips
                                </h3>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    {tips.map((tip, index) => (
                                        <div
                                            key={`${tip.title}-${index}`}
                                            className="flex items-start gap-3"
                                        >
                                            <div
                                                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${bgColor} sm:h-8 sm:w-8`}
                                            >
                                                <span
                                                    className={`text-xs font-bold sm:text-sm ${colorClass}`}
                                                >
                                                    {index + 1}
                                                </span>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-800">
                                                    {tip.title}
                                                </h4>

                                                <p className="text-xs text-gray-500 sm:text-sm">
                                                    {tip.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}