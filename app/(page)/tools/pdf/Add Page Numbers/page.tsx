// app/(pages)/tools/pdf/add-page-numbers/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faFilePdf, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function AddPageNumbersPage() {
    return (
        <PDFToolTemplate
            title="Add Page Numbers"
            description="Tambahkan nomor halaman ke file PDF Anda dengan mudah. Atur posisi, format, dan gaya nomor halaman sesuai keinginan."
            icon={faFilePdf}
            color="red-600"
            gradient="from-red-500 to-orange-500"
            bgColor="bg-red-50"
            features={[
                { icon: faBolt, title: 'Fast Processing', desc: 'Add page numbers in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Customizable', desc: 'Choose position and format' },
            ]}
            tips={[
                { title: 'Choose Position', desc: 'Select top, bottom, header, or footer' },
                { title: 'Custom Format', desc: 'Customize font, size, and numbering style' },
                { title: 'Preview', desc: 'Preview before applying changes' },
                { title: 'Batch Processing', desc: 'Process multiple PDFs at once' },
            ]}
        />
    );
}