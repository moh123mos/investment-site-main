import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SortableCard, BilingualInput, ImageUpload } from '@/components/admin/forms';

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

interface ContentSectionsListProps {
    sections: Section[];
    onAdd: () => void;
    onUpdate: (id: string, field: 'title' | 'content', lang: 'ar' | 'de', value: string) => void;
    onImageUpdate: (id: string, url: string) => void;
    onRemove: (id: string) => void;
    onReorder: (sections: Section[]) => void;
    disabled?: boolean;
}

export function ContentSectionsList({
    sections,
    onAdd,
    onUpdate,
    onImageUpdate,
    onRemove,
    onReorder,
    disabled = false,
}: ContentSectionsListProps) {
    const { t } = useTranslation();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = sections.findIndex(s => s.id === active.id);
            const newIndex = sections.findIndex(s => s.id === over.id);
            onReorder(arrayMove(sections, oldIndex, newIndex));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
        >
            <Card className="border-0 shadow-md">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                            {t('admin.cityEditor.contentSections')}
                        </CardTitle>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onAdd}
                            disabled={disabled}
                            className="gap-1.5"
                        >
                            <Plus className="w-4 h-4" />
                            {t('admin.cityEditor.addSection')}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {sections.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-8 text-muted-foreground"
                        >
                            <p>{t('admin.common.noResults')}</p>
                            <Button
                                type="button"
                                variant="link"
                                onClick={onAdd}
                                disabled={disabled}
                                className="mt-2"
                            >
                                {t('admin.cityEditor.addSection')}
                            </Button>
                        </motion.div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={sections.map(s => s.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-4">
                                    <AnimatePresence mode="popLayout">
                                        {sections.map((section, index) => (
                                            <SortableCard
                                                key={section.id}
                                                id={section.id}
                                                title={t('admin.cityEditor.section')}
                                                index={index}
                                                onRemove={() => onRemove(section.id)}
                                                disabled={disabled}
                                            >
                                                <BilingualInput
                                                    label={t('admin.cityEditor.sectionTitle')}
                                                    value={section.title}
                                                    onChange={(lang, value) => onUpdate(section.id, 'title', lang, value)}
                                                    disabled={disabled}
                                                />
                                                <BilingualInput
                                                    label={t('admin.cityEditor.sectionContent')}
                                                    value={section.content}
                                                    onChange={(lang, value) => onUpdate(section.id, 'content', lang, value)}
                                                    isTextArea
                                                    rows={4}
                                                    disabled={disabled}
                                                />
                                                <ImageUpload
                                                    label={t('admin.cityEditor.sectionImage')}
                                                    value={section.image}
                                                    onChange={(url) => onImageUpdate(section.id, url)}
                                                    previewSize="md"
                                                    disabled={disabled}
                                                />
                                            </SortableCard>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
