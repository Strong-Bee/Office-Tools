// app/(pages)/tools/developer/url-encoder-decoder/page.tsx
import DeveloperToolTemplate from '@/components/DeveloperToolTemplate';
import { faLink, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function URLEncoderDecoderPage() {
    return (
        <DeveloperToolTemplate
            title="URL Encoder/Decoder"
            description="Encode dan decode URL dengan aman. Handle special characters dan batch processing."
            icon={faLink}
            color="emerald-600"
            gradient="from-emerald-500 to-teal-500"
            bgColor="bg-emerald-50"
            inputType="textarea"
            placeholder="Enter URL to encode or decode..."
            features={[
                { icon: faBolt, title: 'Fast Processing', desc: 'Encode/Decode in seconds' },
                { icon: faShield, title: 'Secure', desc: 'Your data is safe' },
                { icon: faClock, title: 'Batch Processing', desc: 'Process multiple URLs' },
            ]}
            tips={[
                { title: 'Encode URL', desc: 'Convert special characters to URL-safe format' },
                { title: 'Decode URL', desc: 'Convert URL-safe format back to original' },
                { title: 'Batch Processing', desc: 'Encode/Decode multiple URLs at once' },
                { title: 'Copy Result', desc: 'Copy encoded/decoded result' },
            ]}
        />
    );
}