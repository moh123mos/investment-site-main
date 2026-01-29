import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BilingualInput, ImageUpload } from '@/components/admin/forms';

interface BilingualText {
    ar: string;
    de: string;
}

interface BasicInfoSectionProps {
    name: BilingualText;
    slug: string;
    heroImage: string;
    introText: BilingualText;
    onNameChange: (lang: 'ar' | 'de', value: string) => void;
    onSlugChange: (value: string) => void;
    onHeroImageChange: (url: string) => void;
    onIntroTextChange: (lang: 'ar' | 'de', value: string) => void;
    disabled?: boolean;
}

export function BasicInfoSection({
    name,
    slug,
    heroImage,
    introText,
    onNameChange,
    onSlugChange,
    onHeroImageChange,
    onIntroTextChange,
    disabled = false,
}: BasicInfoSectionProps) {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
        >
            <Card className="border-0 shadow-md">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold">
                        {t('admin.cityEditor.basicInfo')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <BilingualInput
                        label={t('admin.cityEditor.cityName')}
                        value={name}
                        onChange={onNameChange}
                        required
                        disabled={disabled}
                    />

                    <div className="space-y-2">
                        <Label htmlFor="slug" className="text-sm font-medium">
                            {t('admin.cityEditor.slug')}
                            <span className="text-destructive ms-1">*</span>
                        </Label>
                        <Input
                            id="slug"
                            type="text"
                            value={slug}
                            onChange={(e) => onSlugChange(e.target.value)}
                            placeholder="city-name"
                            className="font-mono text-sm"
                            dir="ltr"
                            required
                            disabled={disabled}
                        />
                        <p className="text-xs text-muted-foreground">
                            {t('admin.cityEditor.slugHelp')}
                        </p>
                    </div>

                    <ImageUpload
                        label={t('admin.cityEditor.heroImage')}
                        value={heroImage}
                        onChange={onHeroImageChange}
                        previewSize="lg"
                        disabled={disabled}
                    />

                    <BilingualInput
                        label={t('admin.cityEditor.introText')}
                        value={introText}
                        onChange={onIntroTextChange}
                        isTextArea
                        rows={4}
                        disabled={disabled}
                    />
                </CardContent>
            </Card>
        </motion.div>
    );
}
