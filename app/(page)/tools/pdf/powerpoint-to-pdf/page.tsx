// app/(pages)/tools/pdf/powerpoint-to-pdf/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faFilePowerpoint, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function PowerPointToPDFPage() {
    return (
        <PDFToolTemplate
            title="PowerPoint to PDF"
            description="Konversi file PowerPoint (PPT, PPTX) ke PDF dengan mudah. Pertahankan slide dan animasi."
            icon={faFilePowerpoint}
            color="orange-600"
            gradient="from-orange-500 to-red-500"
            bgColor="bg-orange-50"
            accept=".pptx,.ppt"
            features={[
                { icon: faBolt, title: 'Fast Conversion', desc: 'Convert in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Preserve Layout', desc: 'Maintain slide layout' },
            ]}
            tips={[
                { title: 'Slide Layout', desc: 'Preserve slide design and layout' },
                { title: 'Images and Graphics', desc: 'Maintain images and graphics' },
                { title: 'Page Size', desc: 'Choose PDF page size' },
                { title: 'Batch Conversion', desc: 'Convert multiple PowerPoint files' },
            ]}
        />
    );
}