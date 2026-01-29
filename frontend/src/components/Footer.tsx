import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

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

  return (
    <footer className="bg-linear-to-br from-gray-100 to-slate-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Immobilie verkaufen */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {t('footer.col1.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={externalLinks.immobilienverkauf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('footer.col1.link1')}
                </a>
              </li>
              <li>
                <a
                  href={externalLinks.immobilienberater}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('footer.col1.link2')}
                </a>
              </li>
              <li>
                <a
                  href={externalLinks.immobilieBewerten}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('footer.col1.link3')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Immobilie suchen */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {t('footer.col2.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={externalLinks.immobilieSuchen}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('footer.col2.link1')}
                </a>
              </li>
              <li>
                <a
                  href={externalLinks.immobilieSuchen}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('footer.col2.link2')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Immobilie finanzieren */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {t('footer.col3.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={externalLinks.immobilieFinanzieren}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('footer.col3.link1')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Unternehmen */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {t('footer.col4.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/uber-uns"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('footer.col4.link1')}
                </Link>
              </li>
              <li>
                <Link
                  to="/geschaftsmodell"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('footer.col4.link2')}
                </Link>
              </li>
              <li>
                <a
                  href={externalLinks.news}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('footer.col4.link3')}
                </a>
              </li>
              <li>
                <Link
                  to="/datenschutz"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('footer.col4.link4')}
                </Link>
              </li>
              <li>
                <Link
                  to="/impressum"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('footer.col4.link5')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-300 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Dr. M. Reda Sholkami. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
