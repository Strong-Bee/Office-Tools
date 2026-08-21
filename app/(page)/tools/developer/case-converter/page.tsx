// app/(pages)/tools/developer/case-converter/page.tsx
import DeveloperToolTemplate from '@/components/DeveloperToolTemplate';
import { faSquare, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function CaseConverterPage() {
    return (
        <DeveloperToolTemplate
            title="Case Converter"
            description="Konversi huruf besar/kecil dengan mudah. UPPER CASE, lower case, Title Case, dan Sentence case."
            icon={faSquare}
            color="amber-600"
            gradient="from-amber-500 to-orange-500"
            bgColor="bg-amber-50"
            inputType="textarea"
            placeholder="Paste your text here to convert case..."
            features={[
                { icon: faBolt, title: 'Fast Conversion', desc: 'Convert in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your text is safe' },
                { icon: faClock, title: 'Multiple Cases', desc: 'Various case options' },
            ]}
            tips={[
                { title: 'UPPER CASE', desc: 'Convert all text to uppercase' },
                { title: 'lower case', desc: 'Convert all text to lowercase' },
                { title: 'Title Case', desc: 'Capitalize first letter of each word' },
                { title: 'Sentence case', desc: 'Capitalize first letter of each sentence' },
            ]}
        />
    );
}