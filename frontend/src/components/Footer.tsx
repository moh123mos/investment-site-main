import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Building2 } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  const externalLinks = {
    immobilienverkauf: 'https://www.immobilienscout24.de/lp/kostenlose-immobilienbewertung-v1/?gclid=Cj0KCQjw2v-gBhC1ARIsAOQdKY25vgE7SJAFq3mm89MR_USFyG6fPGvwud9jYdjkdt6UpX25-cZupH0aAmwYEALw_wcB',
    immobilienberater: 'https://www.immobilienscout24.de/lp/immobilienmakler-v1.html?gclid=Cj0KCQjw2v-gBhC1ARIsAOQdKY1EJgz_zYW_jtGtLJKVZ8Lt8lmwdxXYNSOKLpzUIdSuTbfhNM6eRtEaApCZEALw_wcB',
    immobilieBewerten: 'https://www.immobilienscout24.de/lp/kostenlose-immobilienbewertung-v1/?gclid=Cj0KCQjw2v-gBhC1ARIsAOQdKY1b91Z96I6ZCrEQ79PbAUejjXLNqu9p4-4a4xOZqm2GpS7OwOlrW6IaAkbjEALw_wcB',
    immobilieSuchen: 'https://www.immobilienscout24.de/',
    immobilieFinanzieren: 'https://www.apobank.de/unsere-leistungen/finanzierung-kredit/immobilienfinanzierung',
    news: 'https://news.google.com/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNRFpyTVhJU0FtUmxLQUFQAQ?hl=de&gl=DE&ceid=DE%3Ade',
  };

  const LinkItem = ({ href, children, external = true }: { href: string; children: React.ReactNode; external?: boolean }) => (
    external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        {children}
        <ExternalLink className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
      </a>
    ) : (
      <Link
        to={href}
        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        {children}
      </Link>
    )
  );

  return (
    <footer className="relative bg-card border-t border-border/50 transition-colors duration-300">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-muted/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-foreground text-lg">Dr. M. Reda Sholkami</h2>
            <p className="text-sm text-muted-foreground">Real Estate Investment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Immobilie verkaufen */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {t('footer.col1.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <LinkItem href={externalLinks.immobilienverkauf}>
                  {t('footer.col1.link1')}
                </LinkItem>
              </li>
              <li>
                <LinkItem href={externalLinks.immobilienberater}>
                  {t('footer.col1.link2')}
                </LinkItem>
              </li>
              <li>
                <LinkItem href={externalLinks.immobilieBewerten}>
                  {t('footer.col1.link3')}
                </LinkItem>
              </li>
            </ul>
          </div>

          {/* Column 2: Immobilie suchen */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {t('footer.col2.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <LinkItem href={externalLinks.immobilieSuchen}>
                  {t('footer.col2.link1')}
                </LinkItem>
              </li>
              <li>
                <LinkItem href={externalLinks.immobilieSuchen}>
                  {t('footer.col2.link2')}
                </LinkItem>
              </li>
            </ul>
          </div>

          {/* Column 3: Immobilie finanzieren */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {t('footer.col3.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <LinkItem href={externalLinks.immobilieFinanzieren}>
                  {t('footer.col3.link1')}
                </LinkItem>
              </li>
            </ul>
          </div>

          {/* Column 4: Unternehmen */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {t('footer.col4.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <LinkItem href="/uber-uns" external={false}>
                  {t('footer.col4.link1')}
                </LinkItem>
              </li>
              <li>
                <LinkItem href="/geschaftsmodell" external={false}>
                  {t('footer.col4.link2')}
                </LinkItem>
              </li>
              <li>
                <LinkItem href={externalLinks.news}>
                  {t('footer.col4.link3')}
                </LinkItem>
              </li>
              <li>
                <LinkItem href="/datenschutz" external={false}>
                  {t('footer.col4.link4')}
                </LinkItem>
              </li>
              <li>
                <LinkItem href="/impressum" external={false}>
                  {t('footer.col4.link5')}
                </LinkItem>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Dr. M. Reda Sholkami. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/datenschutz" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/impressum" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Impressum
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
