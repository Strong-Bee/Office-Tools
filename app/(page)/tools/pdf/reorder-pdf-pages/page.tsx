// app/(pages)/tools/pdf/reorder-pdf-pages/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faFilePdf, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function ReorderPDFPagesPage() {
    return (
        <PDFToolTemplate
            title="Reorder PDF Pages"
            description="Ubah urutan halaman dalam file PDF. Drag and drop untuk mengatur ulang halaman sesuai keinginan."
            icon={faFilePdf}
            color="cyan-600"
            gradient="from-cyan-500 to-blue-500"
            bgColor="bg-cyan-50"
            features={[
                { icon: faBolt, title: 'Fast Reordering', desc: 'Reorder in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Drag & Drop', desc: 'Easy drag and drop interface' },
            ]}
            tips={[
                { title: 'Drag & Drop', desc: 'Drag pages to reorder' },
                { title: 'Preview', desc: 'Preview pages before reordering' },
                { title: 'Multiple Selection', desc: 'Select and move multiple pages' },
                { title: 'Undo Option', desc: 'Undo changes if needed' },
            ]}
        />
    );
}