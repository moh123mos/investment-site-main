import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Hannover() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1600&h=900&fit=crop"
            alt="Hannover City"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-emerald-900/70 via-emerald-900/50 to-emerald-900/70"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-extrabold text-white text-center"
          >
            HANNOVER
          </motion.h1>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-emerald-50 via-teal-50/50 to-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-emerald-100 text-center"
          >
            <h2 className="text-5xl font-extrabold mb-8 bg-linear-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
              {t('hannover.intro.title')}
            </h2>
            <p className="text-xl text-slate-700 leading-relaxed">
              {t('hannover.intro.text')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wirtschaft & Innovation Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-blue-50 via-sky-50/50 to-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-extrabold mb-8 bg-linear-to-r from-blue-700 to-sky-700 bg-clip-text text-transparent">
              {t('hannover.business.title')}
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>{t('hannover.business.text1')}</p>
              <p>{t('hannover.business.text2')}</p>
              <p>{t('hannover.business.text3')}</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-3 bg-linear-to-r from-blue-200 to-sky-200 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
              alt="Hannover Business"
              className="relative rounded-3xl shadow-xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Herrenhäuser Gärten Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-rose-50 via-pink-50/50 to-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl"></div>
        
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
              src="https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&h=600&fit=crop"
              alt="Herrenhäuser Gardens"
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
              {t('hannover.culture.title')}
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>{t('hannover.culture.text1')}</p>
              <p>{t('hannover.culture.text2')}</p>
              <p>{t('hannover.culture.text3')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Verkehrsanbindung Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-indigo-50 via-purple-50/50 to-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-extrabold mb-8 bg-linear-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              {t('hannover.transport.title')}
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>{t('hannover.transport.text1')}</p>
              <p>{t('hannover.transport.text2')}</p>
              <p>{t('hannover.transport.text3')}</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-3 bg-linear-to-r from-indigo-200 to-purple-200 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <img
              src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop"
              alt="Transportation"
              className="relative rounded-3xl shadow-xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-amber-50 via-orange-50/50 to-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold mb-12 text-center bg-linear-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent"
          >
            {t('hannover.highlights.title')}
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t('hannover.highlights.item1.title'), description: t('hannover.highlights.item1.description') },
              { title: t('hannover.highlights.item2.title'), description: t('hannover.highlights.item2.description') },
              { title: t('hannover.highlights.item3.title'), description: t('hannover.highlights.item3.description') },
              { title: t('hannover.highlights.item4.title'), description: t('hannover.highlights.item4.description') },
              { title: t('hannover.highlights.item5.title'), description: t('hannover.highlights.item5.description') },
              { title: t('hannover.highlights.item6.title'), description: t('hannover.highlights.item6.description') }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-linear-to-r from-amber-200 to-orange-200 rounded-2xl blur opacity-40"></div>
                <div className="relative bg-white/95 p-6 rounded-2xl shadow-lg border border-amber-100 h-full">
                  <h3 className="text-2xl font-bold mb-3 bg-linear-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
