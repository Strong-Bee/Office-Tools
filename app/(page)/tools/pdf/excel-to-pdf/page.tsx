// app/(pages)/tools/pdf/excel-to-pdf/page.tsx
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { faFileExcel, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function ExcelToPDFPage() {
    return (
        <PDFToolTemplate
            title="Excel to PDF"
            description="Konversi file Excel (XLS, XLSX) ke PDF dengan mudah. Pertahankan format tabel dan data Anda."
            icon={faFileExcel}
            color="green-600"
            gradient="from-green-500 to-emerald-500"
            bgColor="bg-green-50"
            accept=".xlsx,.xls"
            features={[
                { icon: faBolt, title: 'Fast Conversion', desc: 'Convert in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your files are safe and private' },
                { icon: faClock, title: 'Preserve Format', desc: 'Maintain table formatting' },
            ]}
            tips={[
                { title: 'Select Sheet', desc: 'Choose which sheet to convert' },
                { title: 'Preserve Formatting', desc: 'Maintain colors, fonts, and borders' },
                { title: 'Page Setup', desc: 'Customize page orientation and margins' },
                { title: 'Batch Conversion', desc: 'Convert multiple Excel files' },
            ]}
        />
    );
}