// app/(pages)/tools/pdf/unlock-pdf/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faUnlock, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function UnlockPDFPage() {
    return (
        <PDFToolTemplate
            title="Unlock PDF"
            description="Hapus password dari file PDF yang terkunci. Akses dokumen PDF yang diproteksi dengan mudah."
            icon={faUnlock}
            color="emerald-600"
            gradient="from-emerald-500 to-teal-500"
            bgColor="bg-emerald-50"
            features={[
                { icon: faBolt, title: 'Fast Unlocking', desc: 'Unlock in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Easy', desc: 'Remove password protection' },
            ]}
            tips={[
                { title: 'Enter Password', desc: 'Enter the correct password to unlock' },
                { title: 'Remove Protection', desc: 'Remove all restrictions and permissions' },
                { title: 'Batch Processing', desc: 'Unlock multiple PDFs at once' },
                { title: 'Save Unlocked', desc: 'Save as new PDF without password' },
            ]}
        />
    );
}