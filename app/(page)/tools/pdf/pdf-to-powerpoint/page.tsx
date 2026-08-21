// app/(pages)/tools/pdf/pdf-to-powerpoint/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faFilePowerpoint, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function PDFToPowerPointPage() {
    return (
        <PDFToolTemplate
            title="PDF to PowerPoint"
            description="Konversi file PDF ke PowerPoint (PPTX) dengan mudah. Setiap halaman menjadi slide presentasi."
            icon={faFilePowerpoint}
            color="orange-600"
            gradient="from-orange-500 to-red-500"
            bgColor="bg-orange-50"
            features={[
                { icon: faBolt, title: 'Fast Conversion', desc: 'Convert in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Editable', desc: 'Editable PowerPoint slides' },
            ]}
            tips={[
                { title: 'Slide Layout', desc: 'Each page becomes a slide' },
                { title: 'Preserve Formatting', desc: 'Maintain text and images' },
                { title: 'Editable Text', desc: 'Text remains editable in PowerPoint' },
                { title: 'Batch Conversion', desc: 'Convert multiple PDFs at once' },
            ]}
        />
    );
}