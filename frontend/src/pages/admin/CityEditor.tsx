import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
    useCityForm,
    BasicInfoSection,
    ContentSectionsList,
    ActivitiesList,
} from '@/components/admin/city-editor';

export default function CityEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const {
        formData,
        loading,
        initialLoading,
        isEditMode,
        handlers,
    } = useCityForm(id);

    if (initialLoading) {
        return <CityEditorSkeleton />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto pb-12"
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/admin/dashboard/cities')}
                    className="shrink-0"
                >
                    <ArrowLeft className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">
                        {isEditMode ? t('admin.cityEditor.editCity') : t('admin.cityEditor.newCity')}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {isEditMode ? formData.name.ar || formData.name.de : t('admin.cityEditor.newCity')}
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handlers.handleSubmit} className="space-y-6">
                <BasicInfoSection
                    name={formData.name}
                    slug={formData.slug}
                    heroImage={formData.heroImage}
                    introText={formData.introText}
                    onNameChange={(lang, value) => handlers.handleBasicChange('name', lang, value)}
                    onSlugChange={handlers.handleSlugChange}
                    onHeroImageChange={handlers.handleHeroImageChange}
                    onIntroTextChange={(lang, value) => handlers.handleBasicChange('introText', lang, value)}
                    disabled={loading}
                />

                <ContentSectionsList
                    sections={formData.sections}
                    onAdd={handlers.addSection}
                    onUpdate={handlers.updateSection}
                    onImageUpdate={handlers.updateSectionImage}
                    onRemove={handlers.removeSection}
                    onReorder={handlers.reorderSections}
                    disabled={loading}
                />

                <ActivitiesList
                    activities={formData.activities}
                    onAdd={handlers.addActivity}
                    onUpdate={handlers.updateActivity}
                    onRemove={handlers.removeActivity}
                    onReorder={handlers.reorderActivities}
                    disabled={loading}
                />

                {/* Submit Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.3 }}
                    className="flex justify-end pt-4"
                >
                    <Button
                        type="submit"
                        disabled={loading}
                        size="lg"
                        className="min-w-[160px] gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {t('admin.common.saving')}
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" />
                                {t('admin.cityEditor.saveCity')}
                            </>
                        )}
                    </Button>
                </motion.div>
            </form>
        </motion.div>
    );
}

function CityEditorSkeleton() {
    return (
        <div className="max-w-4xl mx-auto pb-12 space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-10 w-10 rounded-md" />
                <div className="space-y-2">
                    <Skeleton className="h-7 w-40" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
            
            <div className="space-y-6">
                <Skeleton className="h-[400px] w-full rounded-lg" />
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-[200px] w-full rounded-lg" />
            </div>
        </div>
    );
}
