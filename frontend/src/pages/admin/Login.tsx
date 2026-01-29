import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { User, Lock, Eye, EyeOff, AlertCircle, Loader2, Building2 } from 'lucide-react';

export default function Login() {
    const { t, i18n } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login, isAuthenticated, loading: authLoading } = useAuth();

    const isRTL = i18n.language === 'ar';

    // Redirect if already logged in
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [isAuthenticated, authLoading, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(username, password);
            navigate('/admin/dashboard');
        } catch (err: any) {
            setError(err.message || t('admin.login.invalidCredentials'));
        } finally {
            setLoading(false);
        }
    };

    // Show loading while checking auth state
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // Don't render login form if authenticated
    if (isAuthenticated) {
        return null;
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.25, ease: 'easeOut' },
        },
    };

    const logoVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.3, ease: 'easeOut' },
        },
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md relative z-10"
            >
                <Card className="border-0 shadow-2xl shadow-primary/10 backdrop-blur-sm bg-card/95">
                    <CardHeader className="space-y-4 pb-2">
                        {/* Logo */}
                        <motion.div
                            variants={logoVariants}
                            className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25"
                        >
                            <Building2 className="w-8 h-8 text-primary-foreground" />
                        </motion.div>

                        <motion.div variants={itemVariants} className="text-center space-y-1.5">
                            <CardTitle className="text-2xl font-bold tracking-tight">
                                {t('admin.login.title')}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                {t('admin.login.subtitle')}
                            </CardDescription>
                        </motion.div>
                    </CardHeader>

                    <CardContent className="pt-4">
                        {/* Error Message */}
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: -10, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="mb-4"
                                >
                                    <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleLogin} className="space-y-5">
                            {/* Username Field */}
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-medium">
                                    {t('admin.login.username')}
                                </Label>
                                <div className="relative">
                                    <User className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                                    <Input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className={`h-11 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} transition-all duration-200 focus:ring-2 focus:ring-primary/20`}
                                        placeholder={t('admin.login.usernamePlaceholder')}
                                        required
                                        disabled={loading}
                                        autoComplete="username"
                                    />
                                </div>
                            </motion.div>

                            {/* Password Field */}
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    {t('admin.login.password')}
                                </Label>
                                <div className="relative">
                                    <Lock className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`h-11 ${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'} transition-all duration-200 focus:ring-2 focus:ring-primary/20`}
                                        placeholder={t('admin.login.passwordPlaceholder')}
                                        required
                                        disabled={loading}
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={`absolute top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors ${isRTL ? 'left-2' : 'right-2'}`}
                                        tabIndex={-1}
                                        title={showPassword ? t('admin.login.hidePassword') : t('admin.login.showPassword')}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div variants={itemVariants}>
                                <Button
                                    type="submit"
                                    className="w-full h-11 text-base font-medium relative overflow-hidden group"
                                    disabled={loading}
                                >
                                    <motion.span
                                        className="flex items-center justify-center gap-2"
                                        animate={loading ? { opacity: 0 } : { opacity: 1 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {t('admin.login.signIn')}
                                    </motion.span>

                                    <AnimatePresence>
                                        {loading && (
                                            <motion.div
                                                className="absolute inset-0 flex items-center justify-center gap-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>{t('admin.login.signingIn')}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </motion.div>
                        </form>

                        {/* Language Switcher */}
                        <motion.div 
                            variants={itemVariants}
                            className="mt-6 pt-4 border-t border-border/50 flex justify-center gap-2"
                        >
                            <Button
                                type="button"
                                variant={i18n.language === 'de' ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => i18n.changeLanguage('de')}
                                className="text-xs"
                            >
                                Deutsch
                            </Button>
                            <Button
                                type="button"
                                variant={i18n.language === 'ar' ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => i18n.changeLanguage('ar')}
                                className="text-xs"
                            >
                                العربية
                            </Button>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
