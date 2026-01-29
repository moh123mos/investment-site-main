import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export function ThemeToggle() {
    const { t } = useTranslation();
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark');
        }
        return false;
    });

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

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative h-9 w-9 rounded-lg"
            title={t('admin.theme.toggle')}
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
    );
}
