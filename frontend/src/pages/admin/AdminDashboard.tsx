import { Link, Outlet, useNavigate, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
    LayoutDashboard, 
    Video, 
    LogOut, 
    Menu, 
    ChevronRight,
    Home,
    Building2,
    Settings,
    Sun,
    Moon
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AdminDashboard() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('admin-theme');
        if (saved) {
            return saved === 'dark';
        }
        return document.documentElement.classList.contains('dark');
    });

    // Apply saved theme and language on mount
    useEffect(() => {
        // Theme
        const savedTheme = localStorage.getItem('admin-theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else if (savedTheme === 'light') {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }

        // Language
        const savedLang = localStorage.getItem('admin-lang');
        if (savedLang && savedLang !== i18n.language) {
            i18n.changeLanguage(savedLang);
        }
    }, [i18n]);

    const isRTL = i18n.language === 'ar';

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('admin-theme', newMode ? 'dark' : 'light');
    };

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('admin-lang', lang);
    };

    const isActive = (path: string) => {
        if (path === '') {
            return location.pathname === '/admin/dashboard' || location.pathname === '/admin/dashboard/';
        }
        return location.pathname.includes(path);
    };

    const navItems = [
        { path: '', label: t('admin.dashboard.overview'), icon: Home },
        { path: 'cities', label: t('admin.dashboard.cities'), icon: LayoutDashboard },
        { path: 'videos', label: t('admin.dashboard.videos'), icon: Video },
        { path: 'account', label: t('admin.account.title'), icon: Settings },
    ];

    const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
        <div className="flex flex-col h-full" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="p-5 border-b border-border/50">
                <div className="flex items-center gap-3">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20"
                    >
                        <Building2 className="w-5 h-5 text-primary-foreground" />
                    </motion.div>
                    <div className="text-start">
                        <h1 className="font-bold text-foreground">{t('admin.dashboard.title')}</h1>
                        <p className="text-xs text-muted-foreground">{t('admin.dashboard.welcome')}</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={item.path}
                            to={item.path ? `/admin/dashboard/${item.path}` : '/admin/dashboard'}
                            onClick={() => mobile && setSidebarOpen(false)}
                        >
                            <motion.div
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                                    ${active 
                                        ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' 
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }
                                `}
                                whileHover={{ x: isRTL ? -4 : 4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                <span className="font-medium text-sm flex-1 text-start">{item.label}</span>
                                {active && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="shrink-0"
                                    >
                                        <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                                    </motion.div>
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-border/50 space-y-2">
                {/* Language Switcher */}
                <div className="flex gap-1 p-1 bg-muted rounded-lg">
                    <Button
                        variant={i18n.language === 'ar' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => changeLanguage('ar')}
                        className={`flex-1 text-xs h-8 transition-all duration-200 ${
                            i18n.language === 'ar' 
                                ? 'bg-primary text-primary-foreground shadow-sm font-medium' 
                                : 'hover:bg-background/80'
                        }`}
                    >
                        🇸🇦 عربي
                    </Button>
                    <Button
                        variant={i18n.language === 'de' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => changeLanguage('de')}
                        className={`flex-1 text-xs h-8 transition-all duration-200 ${
                            i18n.language === 'de' 
                                ? 'bg-primary text-primary-foreground shadow-sm font-medium' 
                                : 'hover:bg-background/80'
                        }`}
                    >
                        🇩🇪 Deutsch
                    </Button>
                </div>

                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleDarkMode}
                    className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
                >
                    {darkMode ? <Sun className="w-5 h-5 shrink-0" /> : <Moon className="w-5 h-5 shrink-0" />}
                    <span className="text-sm text-start flex-1">{darkMode ? t('admin.theme.light') : t('admin.theme.dark')}</span>
                </Button>

                {/* Logout */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    <span className="text-sm text-start flex-1">{t('admin.dashboard.logout')}</span>
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-40 h-16 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center justify-between h-full px-4">
                    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent 
                            side={isRTL ? 'right' : 'left'} 
                            className="w-72 p-0"
                        >
                            <SidebarContent mobile />
                        </SheetContent>
                    </Sheet>

                    <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-primary" />
                        <span className="font-semibold">{t('admin.dashboard.title')}</span>
                    </div>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                                        {user?.username?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-56">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium">{user?.username}</p>
                                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => changeLanguage('ar')}>
                                <span className="me-2">🌍</span>
                                عربي {i18n.language === 'ar' && '✓'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeLanguage('de')}>
                                <span className="me-2">🌍</span>
                                Deutsch {i18n.language === 'de' && '✓'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={toggleDarkMode}>
                                {darkMode ? <Sun className="w-4 h-4 me-2" /> : <Moon className="w-4 h-4 me-2" />}
                                {t('admin.theme.toggle')}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                                <LogOut className="w-4 h-4 me-2" />
                                {t('admin.dashboard.logout')}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <div className="flex">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-e border-border/50 bg-card">
                    <SidebarContent />
                </aside>

                {/* Main Content */}
                <main className="flex-1 lg:ms-64">
                    {/* Desktop Header */}
                    <header className="hidden lg:flex sticky top-0 z-40 h-16 items-center justify-between border-b border-border/50 bg-background/95 backdrop-blur px-6">
                        <div />
                        
                        {/* User Profile */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="gap-2 pe-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                                            {user?.username?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start text-sm">
                                        <span className="font-medium">{user?.username}</span>
                                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                            {user?.role}
                                        </Badge>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-56">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">{user?.username}</p>
                                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={toggleDarkMode}>
                                    {darkMode ? <Sun className="w-4 h-4 me-2" /> : <Moon className="w-4 h-4 me-2" />}
                                    {t('admin.theme.toggle')}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                                    <LogOut className="w-4 h-4 me-2" />
                                    {t('admin.dashboard.logout')}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>

                    {/* Page Content */}
                    <div className="p-4 md:p-6 lg:p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
}
