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
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SortableCard, BilingualInput } from '@/components/admin/forms';

interface BilingualText {
    ar: string;
    de: string;
}

interface Activity {
    id: string;
    day: BilingualText;
    activity: BilingualText;
}

interface ActivitiesListProps {
    activities: Activity[];
    onAdd: () => void;
    onUpdate: (id: string, field: 'day' | 'activity', lang: 'ar' | 'de', value: string) => void;
    onRemove: (id: string) => void;
    onReorder: (activities: Activity[]) => void;
    disabled?: boolean;
}

export function ActivitiesList({
    activities,
    onAdd,
    onUpdate,
    onRemove,
    onReorder,
    disabled = false,
}: ActivitiesListProps) {
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
            const oldIndex = activities.findIndex(a => a.id === active.id);
            const newIndex = activities.findIndex(a => a.id === over.id);
            onReorder(arrayMove(activities, oldIndex, newIndex));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.2 }}
        >
            <Card className="border-0 shadow-md">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                            {t('admin.cityEditor.activities')}
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
                            {t('admin.cityEditor.addActivity')}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {activities.length === 0 ? (
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
                                {t('admin.cityEditor.addActivity')}
                            </Button>
                        </motion.div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={activities.map(a => a.id)}
                                strategy={rectSortingStrategy}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AnimatePresence mode="popLayout">
                                        {activities.map((activity, index) => (
                                            <SortableCard
                                                key={activity.id}
                                                id={activity.id}
                                                title={t('admin.cityEditor.activity')}
                                                index={index}
                                                onRemove={() => onRemove(activity.id)}
                                                disabled={disabled}
                                                collapsible={false}
                                            >
                                                <BilingualInput
                                                    label={t('admin.cityEditor.dayTitle')}
                                                    value={activity.day}
                                                    onChange={(lang, value) => onUpdate(activity.id, 'day', lang, value)}
                                                    disabled={disabled}
                                                />
                                                <BilingualInput
                                                    label={t('admin.cityEditor.activityDescription')}
                                                    value={activity.activity}
                                                    onChange={(lang, value) => onUpdate(activity.id, 'activity', lang, value)}
                                                    isTextArea
                                                    rows={3}
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
