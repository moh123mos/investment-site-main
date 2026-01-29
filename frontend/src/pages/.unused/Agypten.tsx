import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Agypten() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1539768942893-daf53e448371?w=1600&h=900&fit=crop"
            alt="Egypt Pyramids"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-amber-900/70 via-amber-900/50 to-amber-900/70"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-extrabold text-white text-center"
          >
            ÄGYPTEN
          </motion.h1>
        </div>
      </section>

      {/* Tarek Gardens Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-amber-50 via-orange-50/50 to-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-extrabold mb-8 bg-linear-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
              {t('agypten.tarek.title')}
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>{t('agypten.tarek.text1')}</p>
              <p>{t('agypten.tarek.text2')}</p>
              <p>{t('agypten.tarek.text3')}</p>
              <p>{t('agypten.tarek.text4')}</p>
              <p>{t('agypten.tarek.text5')}</p>
              <p>{t('agypten.tarek.text6')}</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-3 bg-linear-to-r from-amber-200 to-orange-200 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <img
              src="https://images.unsplash.com/photo-1582610116397-edb318620f90?w=800&h=600&fit=crop"
              alt="Tarek Gardens"
              className="relative rounded-3xl shadow-xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Tell el-Amarna Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-blue-50 via-sky-50/50 to-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group order-2 md:order-1"
          >
            <div className="absolute -inset-3 bg-linear-to-r from-blue-200 to-sky-200 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <img
              src="https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&h=600&fit=crop"
              alt="Tell el-Amarna"
              className="relative rounded-3xl shadow-xl border-4 border-white"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h2 className="text-5xl font-extrabold mb-8 bg-linear-to-r from-blue-700 to-sky-700 bg-clip-text text-transparent">
              {t('agypten.amarna.title')}
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>{t('agypten.amarna.text1')}</p>
              <p>{t('agypten.amarna.text2')}</p>
              <p>{t('agypten.amarna.text3')}</p>
              <p>{t('agypten.amarna.text4')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tuna el-Gebel Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-emerald-50 via-teal-50/50 to-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-extrabold mb-8 bg-linear-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
              {t('agypten.tuna.title')}
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>{t('agypten.tuna.text1')}</p>
              <p>{t('agypten.tuna.text2')}</p>
              <p>{t('agypten.tuna.text3')}</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-3 bg-linear-to-r from-emerald-200 to-teal-200 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <img
              src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&h=600&fit=crop"
              alt="Ancient Egypt"
              className="relative rounded-3xl shadow-xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Harmony Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-rose-50 via-pink-50/50 to-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group order-2 md:order-1"
          >
            <div className="absolute -inset-3 bg-linear-to-r from-rose-200 to-pink-200 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <img
              src="https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&h=600&fit=crop"
              alt="Egyptian Culture"
              className="relative rounded-3xl shadow-xl border-4 border-white"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h2 className="text-5xl font-extrabold mb-8 bg-linear-to-r from-rose-700 to-pink-700 bg-clip-text text-transparent">
              {t('agypten.harmony.title')}
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>{t('agypten.harmony.text1')}</p>
              <p>{t('agypten.harmony.text2')}</p>
              <p>{t('agypten.harmony.text3')}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
