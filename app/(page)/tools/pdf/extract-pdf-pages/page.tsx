// app/(pages)/tools/pdf/extract-pdf-pages/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faFilePdf, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function ExtractPDFPagesPage() {
    return (
        <PDFToolTemplate
            title="Extract PDF Pages"
            description="Ekstrak halaman tertentu dari file PDF dan buat PDF baru. Pilih halaman yang Anda butuhkan."
            icon={faFilePdf}
            color="purple-600"
            gradient="from-purple-500 to-pink-500"
            bgColor="bg-purple-50"
            features={[
                { icon: faBolt, title: 'Fast Extraction', desc: 'Extract pages in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Precise', desc: 'Select specific pages to extract' },
            ]}
            tips={[
                { title: 'Select Pages', desc: 'Choose specific pages or ranges' },
                { title: 'Preview', desc: 'Preview pages before extraction' },
                { title: 'Save as New PDF', desc: 'Create new PDF from extracted pages' },
                { title: 'Batch Extraction', desc: 'Extract from multiple PDFs' },
            ]}
        />
    );
}