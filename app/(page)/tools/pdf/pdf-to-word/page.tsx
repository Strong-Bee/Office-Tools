// app/(pages)/tools/pdf/pdf-to-word/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faFileWord, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function PDFToWordPage() {
    return (
        <PDFToolTemplate
            title="PDF to Word"
            description="Konversi file PDF ke Word (DOCX) dengan akurat. Pertahankan formatting, gambar, dan tata letak."
            icon={faFileWord}
            color="blue-600"
            gradient="from-blue-500 to-indigo-500"
            bgColor="bg-blue-50"
            features={[
                { icon: faBolt, title: 'Fast Conversion', desc: 'Convert in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Accurate', desc: