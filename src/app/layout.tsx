import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';

import '../styles/globals.scss';
import { COLORS } from '../util/colors';
import { locale } from '../util/locale';
import Loading from './loading';

const meta = {
  title: 'Cartão Aniversário – Crie um Cartão de Aniversário Personalizado',
  description:
    'Crie cartões de Aniversário personalizados online e compartilhe com quem você ama.',
  image: '/images/logo-profile.png'
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  robots: 'index',
  themeColor: COLORS.primary,
  openGraph: {
    title: meta.title,
    description: meta.description,
    images: meta.image,
    type: 'website',
    siteName: `Cartão Aniversário`
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    card: 'summary',
    images: meta.image
  }
};

const { NEXT_PUBLIC_GTAG: GTAG } = process.env;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={locale.id} className='bg-[#D7EBE0]'>
      <body>
        <main>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
        <GoogleAnalytics gaId={GTAG} />
      </body>
    </html>
  );
}
