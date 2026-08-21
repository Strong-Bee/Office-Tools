// app/(pages)/tools/developer/character-counter/page.tsx
import DeveloperToolTemplate from '@/components/DeveloperToolTemplate';
import { faFont, faBolt, faShield, faClock } from '@fortawesome/free-solid-svg-icons';

export default function CharacterCounterPage() {
    return (
        <DeveloperToolTemplate
            title="Character Counter"
            description="Hitung karakter dengan dan tanpa spasi. Juga hitung huruf, angka, dan karakter khusus."
            icon={faFont}
            color="cyan-600"
            gradient="from-cyan-500 to-blue-500"
            bgColor="bg-cyan-50"
            inputType="textarea"
            placeholder="Paste your text here to count characters..."
            features={[
                { icon: faBolt, title: 'Fast Counting', desc: 'Count in real-time' },
                { icon: faShield, title: 'Secure', desc: 'Your text is safe' },
                { icon: faClock, title: 'Detailed Stats', desc: 'Characters, letters, numbers' },
            ]}
            tips={[
                { title: 'With Spaces', desc: 'Total characters including spaces' },
                { title: 'Without Spaces', desc: 'Total characters excluding spaces' },
                { title: 'Letters & Numbers', desc: 'Count only letters and numbers' },
                { title: 'Special Characters', desc: 'Count special characters' },
            ]}
        />
    );
}