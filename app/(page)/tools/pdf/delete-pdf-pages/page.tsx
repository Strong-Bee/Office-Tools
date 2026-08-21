// app/(pages)/tools/pdf/delete-pdf-pages/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faFilePdf, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function DeletePDFPagesPage() {
    return (
        <PDFToolTemplate
            title="Delete PDF Pages"
            description="Hapus halaman yang tidak diinginkan dari file PDF. Pilih halaman tertentu atau range halaman untuk dihapus."
            icon={faFilePdf}
            color="red-600"
            gradient="from-red-500 to-rose-500"
            bgColor="bg-red-50"
            features={[
                { icon: faBolt, title: 'Fast Processing', desc: 'Delete pages in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Precise', desc: 'Select specific pages to delete' },
            ]}
            tips={[
                { title: 'Select Pages', desc: 'Choose specific pages or page ranges' },
                { title: 'Preview', desc: 'Preview pages before deletion' },
                { title: 'Undo Option', desc: 'Option to undo if needed' },
                { title: 'Batch Processing', desc: 'Process multiple PDFs at once' },
            ]}
        />
    );
}