// app/(pages)/tools/pdf/compress-pdf/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faFilePdf, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function CompressPDFPage() {
    return (
        <PDFToolTemplate
            title="Compress PDF"
            description="Kecilkan ukuran file PDF tanpa mengurangi kualitas. Kompres PDF untuk menghemat ruang penyimpanan dan mempercepat transfer."
            icon={faFilePdf}
            color="green-600"
            gradient="from-green-500 to-emerald-500"
            bgColor="bg-green-50"
            features={[
                { icon: faBolt, title: 'Fast Processing', desc: 'Compress in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'High Quality', desc: 'Maintain original quality' },
            ]}
            tips={[
                { title: 'Choose Compression Level', desc: 'Select between low, medium, or high compression' },
                { title: 'Preserve Quality', desc: 'Maintain image and text quality' },
                { title: 'Batch Processing', desc: 'Compress multiple PDFs at once' },
                { title: 'Preview Result', desc: 'Preview compressed file before download' },
            ]}
        />
    );
}