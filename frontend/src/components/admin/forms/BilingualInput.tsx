import { motion } from 'motion/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

interface BilingualValue {
  ar: string;
  de: string;
}

interface BilingualInputProps {
  label: string;
  value: BilingualValue;
  onChange: (lang: 'ar' | 'de', value: string) => void;
  isTextArea?: boolean;
  required?: boolean;
  rows?: number;
  disabled?: boolean;
}

export function BilingualInput({
  label,
  value,
  onChange,
  isTextArea = false,
  required = false,
  rows = 3,
  disabled = false,
}: BilingualInputProps) {
  const { t } = useTranslation();

  const inputMotion = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2 },
  };

  const focusRing =
    'focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200';

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ms-1">*</span>}
      </Label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Arabic Input */}
        <motion.div {...inputMotion} className="space-y-1.5">
          <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {t('admin.bilingual.arabic')}
          </Label>
          {isTextArea ? (
            <textarea
              value={value.ar}
              onChange={(e) => onChange('ar', e.target.value)}
              placeholder={t('admin.bilingual.arabicPlaceholder')}
              className={`w-full px-3 py-2 text-sm rounded-lg border border-input bg-background ${focusRing} resize-none`}
              rows={rows}
              dir="rtl"
              required={required}
              disabled={disabled}
            />
          ) : (
            <Input
              value={value.ar}
              onChange={(e) => onChange('ar', e.target.value)}
              placeholder={t('admin.bilingual.arabicPlaceholder')}
              className={focusRing}
              dir="rtl"
              required={required}
              disabled={disabled}
            />
          )}
        </motion.div>

        {/* German Input */}
        <motion.div
          {...inputMotion}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="space-y-1.5"
        >
          <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            {t('admin.bilingual.german')}
          </Label>
          {isTextArea ? (
            <textarea
              value={value.de}
              onChange={(e) => onChange('de', e.target.value)}
              placeholder={t('admin.bilingual.germanPlaceholder')}
              className={`w-full px-3 py-2 text-sm rounded-lg border border-input bg-background ${focusRing} resize-none`}
              rows={rows}
              dir="ltr"
              required={required}
              disabled={disabled}
            />
          ) : (
            <Input
              value={value.de}
              onChange={(e) => onChange('de', e.target.value)}
              placeholder={t('admin.bilingual.germanPlaceholder')}
              className={focusRing}
              dir="ltr"
              required={required}
              disabled={disabled}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
