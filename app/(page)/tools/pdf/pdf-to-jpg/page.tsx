// app/(pages)/tools/pdf/pdf-to-jpg/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faImage, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function PDFToJPGPage() {
    return (
        <PDFToolTemplate
            title="PDF to JPG"
            description="Konversi setiap halaman PDF menjadi gambar JPG berkualitas tinggi. Extract images dari file PDF."
            icon={faImage}
            color="purple-600"
            gradient="from-purple-500 to-pink-500"
            bgColor="bg-purple-50"
            features={[
                { icon: faBolt, title: 'Fast Conversion', desc: 'Convert in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'High Quality', desc: 'High resolution JPG output' },
            ]}
            tips={[
                { title: 'Page Selection', desc: 'Choose specific pages to convert' },
                { title: 'Image Quality', desc: 'Adjust JPG quality and resolution' },
                { title: 'Batch Conversion', desc: 'Convert multiple PDFs at once' },
                { title: 'Download All', desc: 'Download all images as ZIP' },
            ]}
        />
    );
}