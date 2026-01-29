import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface BilingualText {
    ar: string;
    de: string;
}

interface Section {
    id: string;
    title: BilingualText;
    content: BilingualText;
    image: string;
    order: number;
}

interface Activity {
    id: string;
    day: BilingualText;
    activity: BilingualText;
}

export interface CityFormData {
    name: BilingualText;
    slug: string;
    heroImage: string;
    introText: BilingualText;
    sections: Section[];
    activities: Activity[];
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialFormData: CityFormData = {
    name: { ar: '', de: '' },
    slug: '',
    heroImage: '',
    introText: { ar: '', de: '' },
    sections: [],
    activities: [],
};

export function useCityForm(cityId?: string) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isEditMode = !!cityId;

    const [formData, setFormData] = useState<CityFormData>(initialFormData);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditMode);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        if (isEditMode && cityId) {
            fetchCity(cityId);
        }
    }, [cityId]);

    const fetchCity = async (id: string) => {
        setInitialLoading(true);
        try {
            const all = await fetch(`${API_URL}/api/cities?full=true`).then(r => r.json());
            const found = all.find((c: any) => c._id === id);
            if (found) {
                const sanitized: CityFormData = {
                    name: found.name || { ar: '', de: '' },
                    slug: found.slug || '',
                    heroImage: found.heroImage || '',
                    introText: found.introText || { ar: '', de: '' },
                    sections: (found.sections || []).map((s: any, i: number) => ({
                        id: s.id || generateId(),
                        title: s.title || { ar: '', de: '' },
                        content: s.content || { ar: '', de: '' },
                        image: s.image || '',
                        order: s.order || i + 1,
                    })),
                    activities: (found.activities || []).map((a: any) => ({
                        id: a.id || generateId(),
                        day: a.day || { ar: '', de: '' },
                        activity: a.activity || { ar: '', de: '' },
                    })),
                };
                setFormData(sanitized);
            }
        } catch (error) {
            console.error(error);
            toast.error(t('admin.common.error'));
        } finally {
            setInitialLoading(false);
        }
    };

    // Basic field handlers
    const handleBasicChange = useCallback((field: 'name' | 'introText', lang: 'ar' | 'de', value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: { ...prev[field], [lang]: value }
        }));
    }, []);

    const handleSlugChange = useCallback((value: string) => {
        setFormData(prev => ({ ...prev, slug: value }));
    }, []);

    const handleHeroImageChange = useCallback((url: string) => {
        setFormData(prev => ({ ...prev, heroImage: url }));
    }, []);

    // Section handlers
    const addSection = useCallback(() => {
        setFormData(prev => ({
            ...prev,
            sections: [...prev.sections, {
                id: generateId(),
                title: { ar: '', de: '' },
                content: { ar: '', de: '' },
                image: '',
                order: prev.sections.length + 1
            }],
        }));
    }, []);

    const updateSection = useCallback((id: string, field: 'title' | 'content', lang: 'ar' | 'de', value: string) => {
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.map(s => 
                s.id === id 
                    ? { ...s, [field]: { ...s[field], [lang]: value } }
                    : s
            )
        }));
    }, []);

    const updateSectionImage = useCallback((id: string, url: string) => {
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.map(s => 
                s.id === id ? { ...s, image: url } : s
            )
        }));
    }, []);

    const removeSection = useCallback((id: string) => {
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.filter(s => s.id !== id)
        }));
    }, []);

    const reorderSections = useCallback((newSections: Section[]) => {
        setFormData(prev => ({
            ...prev,
            sections: newSections.map((s, i) => ({ ...s, order: i + 1 }))
        }));
    }, []);

    // Activity handlers
    const addActivity = useCallback(() => {
        setFormData(prev => ({
            ...prev,
            activities: [...prev.activities, {
                id: generateId(),
                day: { ar: '', de: '' },
                activity: { ar: '', de: '' }
            }],
        }));
    }, []);

    const updateActivity = useCallback((id: string, field: 'day' | 'activity', lang: 'ar' | 'de', value: string) => {
        setFormData(prev => ({
            ...prev,
            activities: prev.activities.map(a => 
                a.id === id 
                    ? { ...a, [field]: { ...a[field], [lang]: value } }
                    : a
            )
        }));
    }, []);

    const removeActivity = useCallback((id: string) => {
        setFormData(prev => ({
            ...prev,
            activities: prev.activities.filter(a => a.id !== id)
        }));
    }, []);

    const reorderActivities = useCallback((newActivities: Activity[]) => {
        setFormData(prev => ({
            ...prev,
            activities: newActivities
        }));
    }, []);

    // Form submission
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEditMode
                ? `${API_URL}/api/cities/${cityId}`
                : `${API_URL}/api/cities`;

            const method = isEditMode ? 'PUT' : 'POST';

            // Clean data before sending (remove temp ids)
            const cleanData = {
                ...formData,
                sections: formData.sections.map(({ id, ...rest }) => rest),
                activities: formData.activities.map(({ id, ...rest }) => rest),
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanData),
            });

            if (res.ok) {
                toast.success(t('admin.cityEditor.saveSuccess'));
                navigate('/admin/dashboard/cities');
            } else {
                toast.error(t('admin.cityEditor.saveError'));
            }
        } catch (error) {
            console.error(error);
            toast.error(t('admin.cityEditor.saveError'));
        } finally {
            setLoading(false);
        }
    }, [formData, isEditMode, cityId, API_URL, navigate, t]);

    return {
        formData,
        loading,
        uploading,
        setUploading,
        initialLoading,
        isEditMode,
        handlers: {
            handleBasicChange,
            handleSlugChange,
            handleHeroImageChange,
            addSection,
            updateSection,
            updateSectionImage,
            removeSection,
            reorderSections,
            addActivity,
            updateActivity,
            removeActivity,
            reorderActivities,
            handleSubmit,
        }
    };
}
