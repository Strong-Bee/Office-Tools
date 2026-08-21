// app/(pages)/tools/developer/timestamp-converter/page.tsx
import DeveloperToolTemplate from '@/components/DeveloperToolTemplate';
import { faClock, faBolt, faShield, faClock as faClockIcon } from '@fortawesome/free-solid-svg-icons';

export default function TimestampConverterPage() {
    return (
        <DeveloperToolTemplate
            title="Timestamp Converter"
            description="Konversi timestamp ke tanggal dan sebaliknya. Support Unix timestamp dan berbagai format tanggal."
            icon={faClock}
            color="sky-600"
            gradient="from-sky-500 to-blue-500"
            bgColor="bg-sky-50"
            inputType="text"
            placeholder="Enter timestamp or date..."
            features={[
                { icon: faBolt, title: 'Fast Conversion', desc: 'Convert in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your data is safe' },
                { icon: faClockIcon, title: 'Multiple Formats', desc: 'Support various date formats' },
            ]}
            tips={[
                { title: 'Unix Timestamp', desc: 'Convert Unix timestamp to date' },
                { title: 'Date to Timestamp', desc: 'Convert date to Unix timestamp' },
                { title: 'Multiple Timezones', desc: 'Support different timezones' },
                { title: 'Copy Result', desc: 'Copy converted result' },
            ]}
        />
    );
}