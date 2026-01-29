import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Halberstadt() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/halberstadt-0.jpg"
            alt="Halberstadt City"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-blue-900/70 via-blue-900/50 to-blue-900/70"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-extrabold text-white text-center"
          >
            HALBERSTADT
          </motion.h1>
        </div>
      </section>

      {/* Medizincampus Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-blue-50 via-sky-50/50 to-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-extrabold mb-8 bg-linear-to-r from-blue-700 to-sky-700 bg-clip-text text-transparent">
              {t("halberstadt.medical.title")}
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>{t("halberstadt.medical.text1")}</p>
              <p>{t("halberstadt.medical.text2")}</p>
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
              src="/halberstadt-1.jpg"
              alt="Medical Campus"
              className="relative rounded-3xl shadow-xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-emerald-50 via-teal-50/50 to-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group order-2 md:order-1"
          >
            <div className="absolute -inset-3 bg-linear-to-r from-emerald-200 to-teal-200 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <img
              src="/halberstadt-2.jpg"
              alt="Historic Halberstadt"
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
            <h2 className="text-5xl font-extrabold mb-8 bg-linear-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
              {t("halberstadt.history.title")}
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              {t("halberstadt.history.text")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Halberstädter Wagen Section */}
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
              {t("halberstadt.wagon.title")}
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>{t("halberstadt.wagon.text1")}</p>
              <p>{t("halberstadt.wagon.text2")}</p>
              <p>{t("halberstadt.wagon.text3")}</p>
              <p>{t("halberstadt.wagon.text4")}</p>
              <p>{t("halberstadt.wagon.text5")}</p>
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
              src="/halberstadt-3.jpg"
              alt="Historic Transport"
              className="relative rounded-3xl shadow-xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Herz am rechten Fleck Section */}
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
              src="https://images.unsplash.com/photo-1533094602577-198d3beab8ea?w=800&h=600&fit=crop"
              alt="Halberstadt People"
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
              {t("halberstadt.heart.title")}
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              {t("halberstadt.heart.text")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Transportation Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-indigo-50 via-purple-50/50 to-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-extrabold mb-8 bg-linear-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              {t("halberstadt.transport.title")}
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>{t("halberstadt.transport.text1")}</p>
              <p>{t("halberstadt.transport.text2")}</p>
              <p>{t("halberstadt.transport.text3")}</p>
              <p>{t("halberstadt.transport.text4")}</p>
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
              src="/halberstadt-4.jpg"
              alt="Transportation Network"
              className="relative rounded-3xl shadow-xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
