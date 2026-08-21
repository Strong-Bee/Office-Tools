// app/(pages)/tools/pdf/rotate-pdf/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faFilePdf, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function RotatePDFPage() {
    return (
        <PDFToolTemplate
            title="Rotate PDF"
            description="Putar halaman PDF ke arah yang diinginkan. Rotasi 90°, 180°, atau 270° untuk setiap halaman."
            icon={faFilePdf}
            color="indigo-600"
            gradient="from-indigo-500 to-purple-500"
            bgColor="bg-indigo-50"
            features={[
                { icon: faBolt, title: 'Fast Rotation', desc: 'Rotate in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Flexible', desc: 'Rotate specific pages or all' },
            ]}
            tips={[
                { title: 'Choose Rotation', desc: 'Rotate 90°, 180°, or 270°' },
                { title: 'Select Pages', desc: 'Rotate specific pages or all pages' },
                { title: 'Preview', desc: 'Preview rotation before applying' },
                { title: 'Batch Processing', desc: 'Rotate multiple PDFs at once' },
            ]}
        />
    );
}