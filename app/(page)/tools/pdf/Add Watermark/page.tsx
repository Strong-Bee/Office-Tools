// app/(pages)/tools/pdf/add-watermark/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faFilePdf, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function AddWatermarkPage() {
    return (
        <PDFToolTemplate
            title="Add Watermark"
            description="Tambahkan watermark teks atau gambar ke file PDF Anda. Lindungi dokumen Anda dengan watermark profesional."
            icon={faFilePdf}
            color="blue-600"
            gradient="from-blue-500 to-indigo-500"
            bgColor="bg-blue-50"
            features={[
                { icon: faBolt, title: 'Fast Processing', desc: 'Add watermark in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Customizable', desc: 'Text or image watermark options' },
            ]}
            tips={[
                { title: 'Text Watermark', desc: 'Add text like CONFIDENTIAL or DRAFT' },
                { title: 'Image Watermark', desc: 'Upload logo or signature as watermark' },
                { title: 'Position & Opacity', desc: 'Customize position and transparency' },
                { title: 'Batch Processing', desc: 'Apply watermark to multiple PDFs' },
            ]}
        />
    );
}