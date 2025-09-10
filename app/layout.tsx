import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Create and manage your to-do tasks ',
  openGraph: {
    title: 'NoteHub',
    description: 'Create and manage your to-do tasks ',
    url: 'https://08-zustand-sandy-eight.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 650,
        alt: 'NoteHub page image',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
