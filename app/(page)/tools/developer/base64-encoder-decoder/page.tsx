// app/(pages)/tools/developer/base64-encoder-decoder/page.tsx
import DeveloperToolTemplate from '@/components/DeveloperToolTemplate';
import { faBaseball, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function Base64EncoderDecoderPage() {
    return (
        <DeveloperToolTemplate
            title="Base64 Encoder/Decoder"
            description="Encode dan decode Base64 dengan mudah. Support text dan file input."
            icon={faBaseball}
            color="fuchsia-600"
            gradient="from-fuchsia-500 to-pink-500"
            bgColor="bg-fuchsia-50"
            inputType="textarea"
            placeholder="Enter text or paste Base64 to decode..."
            features={[
                { icon: faBolt, title: 'Fast Processing', desc: 'Encode/Decode in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your data is safe' },
                { icon: faClock, title: 'File Support', desc: 'Encode/Decode files' },
            ]}
            tips={[
                { title: 'Encode Text', desc: 'Convert text to Base64 format' },
                { title: 'Decode Base64', desc: 'Convert Base64 back to original text' },
                { title: 'File Support', desc: 'Encode or decode files' },
                { title: 'Copy Result', desc: 'Copy encoded/decoded result' },
            ]}
        />
    );
}