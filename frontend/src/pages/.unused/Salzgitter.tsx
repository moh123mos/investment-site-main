import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Salzgitter() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/salzgitter-1.jpg"
            alt="Salzgitter City"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-slate-900/50 to-slate-900/70"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-extrabold text-white text-center"
          >
            Salzgitter
          </motion.h1>
        </div>
      </section>

      {/* Content Section 1 */}
      <section className="relative py-20 px-4 bg-linear-to-br from-blue-50 via-slate-50/50 to-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-blue-100"
          >
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              {t('salzgitter.intro.text1')}
            </p>
            <p className="text-xl text-slate-700 leading-relaxed">
              {t('salzgitter.intro.text2')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="relative py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {[2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-2xl shadow-xl ${i === 4 ? 'md:col-span-2' : ''}`}
              >
                <img
                  src={`/salzgitter-${i}.jpg`}
                  alt={`Salzgitter ${i}`}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metropole Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-emerald-50 via-teal-50/50 to-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-extrabold mb-8 bg-linear-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
              {t('salzgitter.metropole.title')}
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>{t('salzgitter.metropole.text1')}</p>
              <p>{t('salzgitter.metropole.text2')}</p>
              <p>{t('salzgitter.metropole.text3')}</p>
              <p>{t('salzgitter.metropole.text4')}</p>
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
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop"
              alt="Salzgitter Nature"
              className="relative rounded-3xl shadow-xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* VW Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-indigo-50 via-purple-50/50 to-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group order-2 md:order-1"
          >
            <div className="absolute -inset-3 bg-linear-to-r from-indigo-200 to-purple-200 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <img
              src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop"
              alt="Volkswagen Factory"
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
            <h2 className="text-5xl font-extrabold mb-8 bg-linear-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              {t('salzgitter.vw.title')}
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>{t('salzgitter.vw.text1')}</p>
              <p>{t('salzgitter.vw.text2')}</p>
              <p>{t('salzgitter.vw.text3')}</p>
              <p>{t('salzgitter.vw.text4')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Central Location Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-rose-50 via-pink-50/50 to-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-extrabold mb-8 bg-linear-to-r from-rose-700 to-pink-700 bg-clip-text text-transparent">
              {t('salzgitter.central.title')}
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>{t('salzgitter.central.text1')}</p>
              <p>{t('salzgitter.central.text2')}</p>
              <p>{t('salzgitter.central.text3')}</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-3 bg-linear-to-r from-rose-200 to-pink-200 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <img
              src="/salzgitter-7.jpg"
              alt="Transportation Network"
              className="relative rounded-3xl shadow-xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
