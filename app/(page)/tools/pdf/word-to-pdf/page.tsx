// app/(pages)/tools/pdf/word-to-pdf/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faFileWord, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function WordToPDFPage() {
    return (
        <PDFToolTemplate
            title="Word to PDF"
            description="Konversi file Word (DOC, DOCX) ke PDF dengan mudah. Pertahankan formatting dan tata letak dokumen."
            icon={faFileWord}
            color="blue-600"
            gradient="from-blue-500 to-indigo-500"
            bgColor="bg-blue-50"
            accept=".docx,.doc"
            features={[
                { icon: faBolt, title: 'Fast Conversion', desc: 'Convert in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Preserve Format', desc: 'Maintain formatting and layout' },
            ]}
            tips={[
                { title: 'Preserve Formatting', desc: 'Maintain fonts, colors, and layout' },
                { title: 'Images and Graphics', desc: 'Keep images and graphics' },
                { title: 'Page Setup', desc: 'Choose page size and orientation' },
                { title: 'Batch Conversion', desc: 'Convert multiple Word files' },
            ]}
        />
    );
}