import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Sun, Moon, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [cityLinks, setCityLinks] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Apply theme on mount and when darkMode changes
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'de' ? 'ar' : 'de';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('i18nextLng', newLang);
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
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="relative h-14 w-14 rounded-full object-cover shadow-lg border-2 border-border/50"
              />
            </div>
            <span className="text-xl font-bold text-foreground">
              Dr. M. Reda Sholkami
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {staticLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted font-medium transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}

            {visibleCities.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted font-medium transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}

            {hiddenCities.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted font-medium transition-all duration-200"
                >
                  {i18n.language === 'de' ? 'Mehr' : 'المزيد'}
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-popover/95 backdrop-blur-xl rounded-xl shadow-xl border border-border/50 py-2 overflow-hidden"
                    >
                      {hiddenCities.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setIsMoreOpen(false)}
                          className="block px-4 py-2.5 text-popover-foreground hover:bg-muted transition-colors"
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

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative h-9 w-9 rounded-lg"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: darkMode ? 0 : 1,
                  rotate: darkMode ? 90 : 0,
                  opacity: darkMode ? 0 : 1,
                }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="absolute"
              >
                <Sun className="h-5 w-5" />
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  scale: darkMode ? 1 : 0,
                  rotate: darkMode ? 0 : -90,
                  opacity: darkMode ? 1 : 0,
                }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="absolute"
              >
                <Moon className="h-5 w-5" />
              </motion.div>
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2 rounded-lg"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">
                {i18n.language === 'de' ? 'عربي' : 'Deutsch'}
              </span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden h-9 w-9 rounded-lg"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 py-4 border-t border-border/50 mt-3">
                {staticLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                {cityLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
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
