// app/(pages)/tools/developer/json-validator/page.tsx
import DeveloperToolTemplate from '@/components/DeveloperToolTemplate';
import { faCheck, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function JSONValidatorPage() {
    return (
        <DeveloperToolTemplate
            title="JSON Validator"
            description="Validasi struktur JSON. Cek syntax, show error location, dan fix common issues."
            icon={faCheck}
            color="lime-600"
            gradient="from-lime-500 to-green-500"
            bgColor="bg-lime-50"
            inputType="textarea"
            placeholder="Paste your JSON here to validate..."
            features={[
                { icon: faBolt, title: 'Fast Validation', desc: 'Validate in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your data is safe' },
                { icon: faClock, title: 'Error Location', desc: 'Show error line and position' },
            ]}
            tips={[
                { title: 'Syntax Check', desc: 'Validate JSON syntax and structure' },
                { title: 'Error Location', desc: 'Shows error line and column' },
                { title: 'Common Issues', desc: 'Fix common JSON issues' },
                { title: 'Schema Validation', desc: 'Validate against JSON schema' },
            ]}
        />
    );
}