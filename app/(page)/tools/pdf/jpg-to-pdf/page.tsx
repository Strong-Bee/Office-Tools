// app/(pages)/tools/pdf/jpg-to-pdf/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faImage, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function JPGToPDFPage() {
    return (
        <PDFToolTemplate
            title="JPG to PDF"
            description="Konversi gambar JPG/PNG ke PDF dengan mudah. Gabungkan multiple gambar menjadi satu file PDF."
            icon={faImage}
            color="purple-600"
            gradient="from-purple-500 to-pink-500"
            bgColor="bg-purple-50"
            accept=".jpg,.jpeg,.png"
            multiple={true}
            features={[
                { icon: faBolt, title: 'Fast Conversion', desc: 'Convert in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Multiple Images', desc: 'Combine multiple images into one PDF' },
            ]}
            tips={[
                { title: 'Multiple Images', desc: 'Upload multiple images to create one PDF' },
                { title: 'Order Images', desc: 'Arrange images in the desired order' },
                { title: 'Page Size', desc: 'Choose page size (A4, Letter, etc.)' },
                { title: 'Quality Settings', desc: 'Adjust image quality and compression' },
            ]}
        />
    );
}