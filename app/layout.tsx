// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// FontAwesome configuration
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Office Tools - Simple • Fast • Useful • All-in-One Productivity Platform',
  description: 'Platform all-in-one productivity tools untuk membantu pekerjaan perkantoran, mahasiswa, siswa, guru, freelancer, dan pengguna umum. PDF Tools, Image Tools, Document Tools, dan banyak lagi.',
  keywords: 'PDF tools, document tools, image tools, office tools, productivity tools, merge PDF, compress PDF, convert PDF, image compressor, document converter',
  authors: [{ name: 'Office Tools' }],
  creator: 'Office Tools',
  publisher: 'Office Tools',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://office-tools.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Office Tools - All-in-One Productivity Platform',
    description: 'Simple • Fast • Useful. Platform all-in-one productivity tools untuk semua kebutuhan file Anda.',
    type: 'website',
    url: 'https://office-tools.com',
    siteName: 'Office Tools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Office Tools - All-in-One Productivity Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Office Tools - All-in-One Productivity Platform',
    description: 'Simple • Fast • Useful. Platform all-in-one productivity tools untuk semua kebutuhan file Anda.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#3b82f6',
      },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Office Tools',
  },
  applicationName: 'Office Tools',
  referrer: 'origin-when-cross-origin',
  themeColor: '#3b82f6',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}