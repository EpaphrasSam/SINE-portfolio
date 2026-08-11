import type { Metadata } from 'next';
import { Sora, Public_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SearchProvider } from '../context/SearchContext';
import { GlobalHighlight } from '../components/GlobalHighlight';
import { Preloader } from '../components/motion/Preloader';
import { SmoothScroll } from '../components/motion/SmoothScroll';
import { Cursor } from '../components/motion/Cursor';
import { ScrollWave } from '../components/motion/ScrollWave';
import { PageTransition } from '../components/motion/PageTransition';
import { site } from '../lib/site';

const display = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Public_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.summary,
  openGraph: {
    type: 'website',
    siteName: site.fullName,
    title: `${site.fullName} — ${site.role}`,
    description: site.summary,
    url: site.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.fullName} — ${site.role}`,
    description: site.summary,
  },
  robots: { index: true, follow: true },
};

/** Runs before first paint so the theme never flashes. */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark'}document.documentElement.classList.toggle('light',t==='light')}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <ScrollWave />
        <SearchProvider>
          <GlobalHighlight>
            <SiteHeader />
            <main id="main">
              <PageTransition>{children}</PageTransition>
            </main>
            <SiteFooter />
          </GlobalHighlight>
        </SearchProvider>
      </body>
    </html>
  );
}
