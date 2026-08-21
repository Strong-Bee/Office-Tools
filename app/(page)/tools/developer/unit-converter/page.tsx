// app/(pages)/tools/developer/unit-converter/page.tsx
import DeveloperToolTemplate from '@/components/DeveloperToolTemplate';
import { faCalculator, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function UnitConverterPage() {
    return (
        <DeveloperToolTemplate
            title="Unit Converter"
            description="Konversi berbagai satuan dengan mudah. Length, weight, temperature, area, dan lainnya."
            icon={faCalculator}
            color="violet-600"
            gradient="from-violet-500 to-purple-500"
            bgColor="bg-violet-50"
            inputType="text"
            placeholder="Enter value to convert..."
            features={[
                { icon: faBolt, title: 'Fast Conversion', desc: 'Convert in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your data is safe' },
                { icon: faClock, title: 'Multiple Categories', desc: 'Length, weight, temperature' },
            ]}
            tips={[
                { title: 'Length Conversion', desc: 'Convert between length units' },
                { title: 'Weight Conversion', desc: 'Convert between weight units' },
                { title: 'Temperature Conversion', desc: 'Convert between temperature units' },
                { title: 'Area Conversion', desc: 'Convert between area units' },
            ]}
        />
    );
}