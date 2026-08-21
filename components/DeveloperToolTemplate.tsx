// components/DeveloperToolTemplate.tsx - tambahkan dukungan untuk QR Code
// Tambahkan import QRCode
import QRCode from 'qrcode';

// Tambahkan state untuk QR Code
const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);

// Tambahkan fungsi untuk generate QR Code
const generateQRCode = useCallback(async () => {
    if (inputType === 'text' && title.includes('QR')) {
        try {
            const dataUrl = await QRCode.toDataURL(input, {
                width: 256,
                margin: 2,
                color: {
                    dark: '#1f2937',
                    light: '#ffffff'
                }
            });
            setQrCodeDataUrl(dataUrl);
            return { success: true, result: dataUrl };
        } catch (err) {
            return { success: false, error: 'Failed to generate QR Code' };
        }
    }
    return { success: true, result: 'Processed' };
}, [input, inputType, title]);

// Modifikasi handleProcess untuk QR Code
const handleProcess = useCallback(async () => {
    if (inputType === 'file' && files.length === 0) return;
    if (inputType === 'text' && !input.trim()) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    // Check if this is QR Code generator
    if (title.includes('QR')) {
        const result = await generateQRCode();
        if (result.success) {
            setResult(result.result || 'QR Code generated');
            setProgress(100);
        } else {
            setError(result.error || 'Failed to generate QR Code');
        }
        setIsProcessing(false);
        return;
    }

    // ... rest of the code
}, [input, files, inputType, title, generateQRCode]);