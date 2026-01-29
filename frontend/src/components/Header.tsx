import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [cityLinks, setCityLinks] = useState<any[]>([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'de' ? 'ar' : 'de';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('i18nextLng', newLang);
    // window.location.reload();
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(`${API_URL}/api/cities`, {
          headers: { 'Accept-Language': i18n.language }
        });
        const data = await res.json();
        const links = data.map((city: any) => ({
          to: `/city/${city.slug}`,
          label: city.name
        }));
        setCityLinks(links);
      } catch (error) {
        console.error('Failed to load navigation', error);
      }
    };
    fetchCities();
  }, [i18n.language]);

  const staticLinks = [
    { to: '/', label: t('nav.startseite') },
    { to: '/angebote', label: t('nav.angebote') },
  ];

  const MAX_VISIBLE_CITIES = 3;
  const visibleCities = cityLinks.slice(0, MAX_VISIBLE_CITIES);
  const hiddenCities = cityLinks.slice(MAX_VISIBLE_CITIES);

  return (
    <header className="bg-linear-to-r from-blue-50 to-cyan-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <img
              src="/logo.jpeg"
              alt="Logo"
              className="h-16 w-16 rounded-full object-cover shadow-md"
            />
            <span className="text-2xl font-bold text-gray-800">
              Dr. M. Reda Sholkami
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {staticLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {visibleCities.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {hiddenCities.length > 0 && (
                <div className="relative">
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {i18n.language === 'de' ? 'Mehr' : 'المزيد'}
                  <ChevronDown size={16} className={`transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                  >
                    {hiddenCities.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMoreOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                    ))}
                  </motion.div>
                  )}
                </AnimatePresence>
                </div>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Globe className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700">
                {i18n.language === 'de' ? 'عربي' : 'Deutsch'}
              </span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2 py-4 border-t border-gray-200 mt-4">
                {staticLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 rounded-lg text-gray-700 hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                {/* Show ALL cities in mobile menu for simplicity, or use a subgroup? 
                     Usually mobile menus just list everything or use accordion. 
                     I'll list all for now to be accessible. */}
                {cityLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 rounded-lg text-gray-700 hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
