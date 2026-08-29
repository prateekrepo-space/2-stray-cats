import { Press_Start_2P, Inter } from 'next/font/google';
import { ToastProvider } from '@/components/toast/ToastProvider';
import './globals.css';

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: '2 Stray Cats',
  description: 'Two strays. One little corner of the internet.',
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${pressStart.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
