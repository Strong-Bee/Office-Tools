// app/(pages)/tools/pdf/pdf-to-excel/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faFileExcel, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function PDFToExcelPage() {
    return (
        <PDFToolTemplate
            title="PDF to Excel"
            description="Konversi file PDF ke Excel (XLSX) dengan akurat. Ekstrak tabel dan data ke spreadsheet."
            icon={faFileExcel}
            color="green-600"
            gradient="from-green-500 to-emerald-500"
            bgColor="bg-green-50"
            features={[
                { icon: faBolt, title: 'Fast Conversion', desc: 'Convert in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Accurate', desc: 'Extract tables and data accurately' },
            ]}
            tips={[
                { title: 'Table Extraction', desc: 'Automatically detect and extract tables' },
                { title: 'Preserve Formatting', desc: 'Maintain colors, fonts, and borders' },
                { title: 'Multiple Sheets', desc: 'Extract to multiple Excel sheets' },
                { title: 'Batch Conversion', desc: 'Convert multiple PDFs at once' },
            ]}
        />
    );
}