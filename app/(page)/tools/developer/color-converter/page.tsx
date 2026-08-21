// app/(pages)/tools/developer/color-converter/page.tsx
import DeveloperToolTemplate from '@/components/DeveloperToolTemplate';
import { faPalette, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function ColorConverterPage() {
    return (
        <DeveloperToolTemplate
            title="Color Converter"
            description="Konversi warna antar format. HEX ⇄ RGB, HEX ⇄ HSL, dan color preview."
            icon={faPalette}
            color="pink-600"
            gradient="from-pink-500 to-rose-500"
            bgColor="bg-pink-50"
            inputType="text"
            placeholder="Enter color code (e.g., #FF0000 or rgb(255,0,0))..."
            features={[
                { icon: faBolt, title: 'Fast Conversion', desc: 'Convert in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your data is safe' },
                { icon: faClock, title: 'Preview', desc: 'See color preview' },
            ]}
            tips={[
                { title: 'HEX to RGB', desc: 'Convert HEX color to RGB values' },
                { title: 'RGB to HEX', desc: 'Convert RGB values to HEX color' },
                { title: 'HEX to HSL', desc: 'Convert HEX to HSL values' },
                { title: 'Color Preview', desc: 'See the actual color preview' },
            ]}
        />
    );
}