import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Youtube, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface Video {
    _id: string;
    title: { ar: string; de: string };
    url: string;
    description: { ar: string; de: string };
}

export default function VideoManager() {
    const { t } = useTranslation();
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [formData, setFormData] = useState({
        title: { ar: '', de: '' },
        url: '',
        description: { ar: '', de: '' }
    });
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const fetchVideos = async () => {
        try {
            const res = await fetch(`${API_URL}/api/videos?full=true`);
            const data = await res.json();
            setVideos(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
            toast.error(t('admin.common.error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`${API_URL}/api/videos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                const newVideo = await res.json();
                setVideos(prev => [...prev, newVideo]);
                setFormData({
                    title: { ar: '', de: '' },
                    url: '',
                    description: { ar: '', de: '' }
                });
                toast.success(t('admin.videoManager.addSuccess'));
            } else {
                toast.error(t('admin.videoManager.addError'));
            }
        } catch (error) {
            console.error('Error creating video:', error);
            toast.error(t('admin.videoManager.addError'));
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        
        setDeleting(true);
        try {
            await fetch(`${API_URL}/api/videos/${deleteId}`, {
                method: 'DELETE',
            });
            setVideos(prev => prev.filter(v => v._id !== deleteId));
            toast.success(t('admin.videoManager.deleteSuccess'));
        } catch (error) {
            console.error('Error deleting video:', error);
            toast.error(t('admin.videoManager.deleteError'));
        } finally {
            setDeleting(false);
            setDeleteId(null);
        }
    };

    // Extract YouTube video ID for thumbnail
    const getYouTubeThumbnail = (url: string) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/);
        return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
    };

    if (loading) {
        return <VideoManagerSkeleton />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
            {/* Videos List */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-red-500/10">
                        <Youtube className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{t('admin.videoManager.currentVideos')}</h2>
                        <p className="text-sm text-muted-foreground">
                            {videos.length} {t('admin.dashboard.videos').toLowerCase()}
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {videos.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12 text-muted-foreground"
                            >
                                <Youtube className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                <p>{t('admin.videoManager.noVideos')}</p>
                            </motion.div>
                        ) : (
                            videos.map((video) => {
                                const thumbnail = getYouTubeThumbnail(video.url);
                                return (
                                    <motion.div
                                        key={video._id}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        layout
                                    >
                                        <Card className="overflow-hidden hover:shadow-md transition-shadow">
                                            <CardContent className="p-0">
                                                <div className="flex gap-4">
                                                    {thumbnail && (
                                                        <a
                                                            href={video.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="shrink-0 relative group"
                                                        >
                                                            <img
                                                                src={thumbnail}
                                                                alt={video.title.de || video.title.ar}
                                                                className="w-32 h-20 object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <Youtube className="h-8 w-8 text-white" />
                                                            </div>
                                                        </a>
                                                    )}
                                                    <div className="flex-1 py-3 pe-3">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div className="space-y-1">
                                                                <h3 className="font-medium text-sm line-clamp-1">
                                                                    {video.title.ar || video.title.de}
                                                                </h3>
                                                                {video.title.de && video.title.ar && (
                                                                    <p className="text-xs text-muted-foreground line-clamp-1">
                                                                        {video.title.de}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-7 w-7 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                                onClick={() => setDeleteId(video._id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                        <a
                                                            href={video.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                                                        >
                                                            <ExternalLink className="h-3 w-3" />
                                                            YouTube
                                                        </a>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Add Video Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="border-0 shadow-md sticky top-4">
                    <CardHeader>
                        <CardTitle className="text-lg">{t('admin.videoManager.addNewVideo')}</CardTitle>
                        <CardDescription>
                            {t('admin.videoManager.youtubeUrl')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* YouTube URL */}
                            <div className="space-y-2">
                                <Label htmlFor="url">{t('admin.videoManager.youtubeUrl')}</Label>
                                <Input
                                    id="url"
                                    type="url"
                                    required
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    placeholder={t('admin.videoManager.youtubeUrlPlaceholder')}
                                    dir="ltr"
                                />
                            </div>

                            {/* Titles */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                        {t('admin.videoManager.titleArabic')}
                                    </Label>
                                    <Input
                                        required
                                        value={formData.title.ar}
                                        onChange={(e) => setFormData({ ...formData, title: { ...formData.title, ar: e.target.value } })}
                                        placeholder={t('admin.videoManager.titleArabicPlaceholder')}
                                        dir="rtl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                                        {t('admin.videoManager.titleGerman')}
                                    </Label>
                                    <Input
                                        required
                                        value={formData.title.de}
                                        onChange={(e) => setFormData({ ...formData, title: { ...formData.title, de: e.target.value } })}
                                        placeholder={t('admin.videoManager.titleGermanPlaceholder')}
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            {/* Descriptions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label>{t('admin.videoManager.descArabic')}</Label>
                                    <textarea
                                        value={formData.description.ar}
                                        onChange={(e) => setFormData({ ...formData, description: { ...formData.description, ar: e.target.value } })}
                                        className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                        rows={3}
                                        dir="rtl"
                                        placeholder={t('admin.videoManager.descArabicPlaceholder')}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>{t('admin.videoManager.descGerman')}</Label>
                                    <textarea
                                        value={formData.description.de}
                                        onChange={(e) => setFormData({ ...formData, description: { ...formData.description, de: e.target.value } })}
                                        className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                        rows={3}
                                        dir="ltr"
                                        placeholder={t('admin.videoManager.descGermanPlaceholder')}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full gap-2" disabled={submitting}>
                                {submitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        {t('admin.common.saving')}
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4" />
                                        {t('admin.videoManager.addVideo')}
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('admin.common.confirmDelete')}</DialogTitle>
                        <DialogDescription>
                            {t('admin.videoManager.deleteConfirm')}
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

function VideoManagerSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
            </div>
            <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
    );
}
