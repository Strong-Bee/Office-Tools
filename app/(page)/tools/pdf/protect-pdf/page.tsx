// app/(pages)/tools/pdf/protect-pdf/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faLock, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function ProtectPDFPage() {
    return (
        <PDFToolTemplate
            title="Protect PDF"
            description="Tambahkan password ke file PDF Anda untuk melindungi dokumen dari akses yang tidak sah."
            icon={faLock}
            color="amber-600"
            gradient="from-amber-500 to-yellow-500"
            bgColor="bg-amber-50"
            features={[
                { icon: faBolt, title: 'Fast Protection', desc: 'Protect in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Strong Encryption', desc: '256-bit AES encryption' },
            ]}
            tips={[
                { title: 'Set Password', desc: 'Choose a strong password for your PDF' },
                { title: 'Permission Settings', desc: 'Set permissions (print, copy, edit)' },
                { title: 'Encryption Level', desc: 'Choose 128-bit or 256-bit encryption' },
                { title: 'Batch Protection', desc: 'Protect multiple PDFs at once' },
            ]}
        />
    );
}