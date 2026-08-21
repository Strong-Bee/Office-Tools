// app/(pages)/tools/pdf/split-pdf/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faFilePdf, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function SplitPDFPage() {
    return (
        <PDFToolTemplate
            title="Split PDF"
            description="Pisahkan file PDF menjadi beberapa file terpisah. Split by page, by range, atau extract specific pages."
            icon={faFilePdf}
            color="orange-600"
            gradient="from-orange-500 to-red-500"
            bgColor="bg-orange-50"
            features={[
                { icon: faBolt, title: 'Fast Splitting', desc: 'Split in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Flexible', desc: 'Split by page, range, or extract' },
            ]}
            tips={[
                { title: 'Split by Page', desc: 'Each page becomes a separate PDF' },
                { title: 'Split by Range', desc: 'Split at specific page ranges' },
                { title: 'Extract Pages', desc: 'Extract specific pages' },
                { title: 'Batch Processing', desc: 'Split multiple PDFs at once' },
            ]}
        />
    );
}