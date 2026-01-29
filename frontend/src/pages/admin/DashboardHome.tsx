import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { 
    Building2, 
    Video, 
    Plus, 
    ArrowRight,
    TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface Stats {
    cities: number;
    videos: number;
}

export default function DashboardHome() {
    const { t, i18n } = useTranslation();
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    const isRTL = i18n.language === 'ar';

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [citiesRes, videosRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/api/cities`),
                    fetch(`${import.meta.env.VITE_API_URL}/api/videos`)
                ]);
                
                const cities = await citiesRes.json();
                const videos = await videosRes.json();
                
                setStats({
                    cities: Array.isArray(cities) ? cities.length : 0,
                    videos: Array.isArray(videos) ? videos.length : 0
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
                setStats({ cities: 0, videos: 0 });
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const containerVariants = {
        // hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        // hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.25 },
        },
    };

    const statCards = [
        {
            title: t('admin.dashboard.totalCities'),
            value: stats?.cities ?? 0,
            icon: Building2,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-500/10',
            link: '/admin/dashboard/cities'
        },
        {
            title: t('admin.dashboard.totalVideos'),
            value: stats?.videos ?? 0,
            icon: Video,
            color: 'from-violet-500 to-violet-600',
            bgColor: 'bg-violet-500/10',
            link: '/admin/dashboard/videos'
        }
    ];

    const quickActions = [
        {
            title: t('admin.dashboard.addNewCity'),
            description: t('admin.cityList.title'),
            icon: Building2,
            link: '/admin/dashboard/cities/new',
            color: 'text-blue-500'
        },
        {
            title: t('admin.dashboard.addNewVideo'),
            description: t('admin.videoManager.title'),
            icon: Video,
            link: '/admin/dashboard/videos',
            color: 'text-violet-500'
        }
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
            {/* Header */}
            <motion.div variants={itemVariants}>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {t('admin.dashboard.overview')}
                </h1>
                <p className="text-muted-foreground mt-1">
                    {t('admin.dashboard.welcome')}
                </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {loading ? (
                    <>
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                    </>
                ) : (
                    statCards.map((stat, index) => (
                        <motion.div key={stat.title} variants={itemVariants}>
                            <Link to={stat.link}>
                                <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer border-0 shadow-md">
                                    <div className={`absolute inset-0 ${stat.color} group-hover:opacity-5 transition-opacity duration-300`} />
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    {stat.title}
                                                </p>
                                                <motion.p 
                                                    className="text-3xl font-bold mt-2"
                                                    initial={{ scale: 0.5, opacity: 0.7 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                                                >
                                                    {stat.value}
                                                </motion.p>
                                            </div>
                                            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                                <stat.icon className={`w-6 h-6 ${stat.color} bg-clip-text text-transparent`} style={{ color: stat.color.includes('blue') ? '#3b82f6' : '#8b5cf6' }} />
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                                            <TrendingUp className="w-3 h-3 me-1" />
                                            <span>{t('admin.common.edit')}</span>
                                            <ArrowRight className={`w-3 h-3 ms-1 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                            {t('admin.dashboard.quickActions')}
                        </CardTitle>
                        <CardDescription>
                            {t('admin.common.add')} {t('admin.dashboard.cities').toLowerCase()} {t('admin.dashboard.videos').toLowerCase()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {quickActions.map((action) => (
                                <Link key={action.title} to={action.link}>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer group"
                                    >
                                        <div className={`p-3 rounded-lg bg-muted group-hover:bg-background transition-colors ${action.color}`}>
                                            <action.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                                                {action.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {action.description}
                                            </p>
                                        </div>
                                        <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* View All Links */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/admin/dashboard/cities">
                    <Button variant="outline" className="w-full justify-between h-12 group">
                        <span className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            {t('admin.dashboard.viewAllCities')}
                        </span>
                        <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </Button>
                </Link>
                <Link to="/admin/dashboard/videos">
                    <Button variant="outline" className="w-full justify-between h-12 group">
                        <span className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            {t('admin.dashboard.viewAllVideos')}
                        </span>
                        <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </Button>
                </Link>
            </motion.div>
        </motion.div>
    );
}

function StatCardSkeleton() {
    return (
        <Card className="border-0 shadow-md">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                    <Skeleton className="h-12 w-12 rounded-xl" />
                </div>
                <Skeleton className="h-3 w-20 mt-4" />
            </CardContent>
        </Card>
    );
}
