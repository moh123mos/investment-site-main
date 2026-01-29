import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Edit, Trash2, Plus, Building2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface City {
    _id: string;
    name: string;
    slug: string;
}

export default function CityList() {
    const { t, i18n } = useTranslation();
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const isRTL = i18n.language === 'ar';

    const fetchCities = async () => {
        try {
            const res = await fetch(`${API_URL}/api/cities`);
            const data = await res.json();
            setCities(data);
        } catch (error) {
            console.error('Error fetching cities:', error);
            toast.error(t('admin.common.error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        
        setDeleting(true);
        try {
            await fetch(`${API_URL}/api/cities/${deleteId}`, {
                method: 'DELETE',
            });
            setCities(prev => prev.filter(c => c._id !== deleteId));
            toast.success(t('admin.cityList.deleteSuccess'));
        } catch (error) {
            console.error('Error deleting city:', error);
            toast.error(t('admin.cityList.deleteError'));
        } finally {
            setDeleting(false);
            setDeleteId(null);
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, x: isRTL ? 20 : -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: isRTL ? -20 : 20, transition: { duration: 0.2 } },
    };

    if (loading) {
        return <CityListSkeleton />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
        >
            <Card className="border-0 shadow-md">
                <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Building2 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">{t('admin.cityList.title')}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    {cities.length} {t('admin.dashboard.cities').toLowerCase()}
                                </p>
                            </div>
                        </div>
                        <Link to="/admin/dashboard/cities/new">
                            <Button className="gap-2 w-full sm:w-auto">
                                <Plus className="h-4 w-4" />
                                {t('admin.cityList.addCity')}
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="font-semibold">{t('admin.cityList.name')}</TableHead>
                                    <TableHead className="font-semibold">{t('admin.cityList.slug')}</TableHead>
                                    <TableHead className="text-end font-semibold">{t('admin.common.actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AnimatePresence mode="popLayout">
                                    {cities.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="h-32 text-center">
                                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                    <Building2 className="h-8 w-8 opacity-50" />
                                                    <p>{t('admin.cityList.noCities')}</p>
                                                    <Link to="/admin/dashboard/cities/new">
                                                        <Button variant="link" size="sm">
                                                            {t('admin.cityList.addCity')}
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        cities.map((city) => (
                                            <motion.tr
                                                key={city._id}
                                                variants={rowVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                layout
                                                className="border-b transition-colors hover:bg-muted/50"
                                            >
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        {city.name}
                                                        <a
                                                            href={`/city/${city.slug}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-muted-foreground hover:text-primary transition-colors"
                                                        >
                                                            <ExternalLink className="h-3.5 w-3.5" />
                                                        </a>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="font-mono text-xs">
                                                        /{city.slug}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-end gap-1">
                                                        <Link to={`/admin/dashboard/cities/edit/${city._id}`}>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                            onClick={() => setDeleteId(city._id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </motion.tr>
                                        ))
                                    )}
                                </AnimatePresence>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('admin.common.confirmDelete')}</DialogTitle>
                        <DialogDescription>
                            {t('admin.cityList.deleteConfirm')}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setDeleteId(null)} disabled={deleting}>
                            {t('admin.common.cancel')}
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                            {deleting ? t('admin.common.loading') : t('admin.common.delete')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}

function CityListSkeleton() {
    return (
        <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </div>
                    <Skeleton className="h-10 w-28" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-14 w-full" />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
