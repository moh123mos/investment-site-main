import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface SortableCardProps {
  id: string;
  title: string;
  index: number;
  onRemove: () => void;
  children: ReactNode;
  disabled?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export function SortableCard({
  id,
  title,
  index,
  onRemove,
  children,
  disabled = false,
  collapsible = true,
  defaultExpanded = true,
}: SortableCardProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(defaultExpanded);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Card
        className={`
          relative overflow-hidden transition-all duration-200
          ${isDragging ? 'shadow-lg ring-2 ring-primary/20 z-50' : 'shadow-sm hover:shadow-md'}
          ${disabled ? 'opacity-60' : ''}
        `}
      >
        <CardHeader className="p-3 bg-muted/30">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {!disabled && (
                <button
                  type="button"
                  {...attributes}
                  {...listeners}
                  className="p-1 rounded hover:bg-muted cursor-grab active:cursor-grabbing touch-none"
                  title={t('admin.cityEditor.dragToReorder')}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
              <span className="text-sm font-medium text-foreground">
                {title} {index + 1}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {collapsible && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                  className="h-7 w-7 p-0"
                >
                  {expanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onRemove}
                disabled={disabled}
                className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <motion.div
          initial={false}
          animate={{
            height: expanded ? 'auto' : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <CardContent className="p-4 space-y-4">{children}</CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}
