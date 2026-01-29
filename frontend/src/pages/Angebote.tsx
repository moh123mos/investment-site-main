import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HomeIcon, TrendingUp, Award, Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface City {
  _id: string;
  name: string;
  nameAr?: string;
  nameDe?: string;
  slug: string;
}

export default function Angebote() {
  const { t, i18n } = useTranslation();
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${API_URL}/api/cities`, {
          headers: { "Accept-Language": i18n.language },
        });
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [API_URL, i18n.language]);

  const getCityName = (city: City) => {
    const currentLang = i18n.language;
    if (currentLang === "ar" && city.nameAr) return city.nameAr;
    if (currentLang === "de" && city.nameDe) return city.nameDe;
    return city.name;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=900&fit=crop"
            alt="Real Estate Offers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-slate-900/50 to-slate-900/70"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6">
              {t("angebote.hero.title")}
            </h1>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto px-4">
              {t("angebote.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-20 px-4 bg-linear-to-br from-blue-50 via-slate-50/50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-extrabold mb-6 bg-linear-to-r from-blue-700 to-slate-700 bg-clip-text text-transparent">
              {t("angebote.services.title")}
            </h2>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              {t("angebote.services.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: HomeIcon, key: "buying" },
              { icon: TrendingUp, key: "selling" },
              { icon: Award, key: "consulting" },
              { icon: Heart, key: "management" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-linear-to-r from-blue-200 to-slate-200 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-white/95 p-8 rounded-2xl shadow-lg border border-blue-100 h-full">
                  <div className="w-16 h-16 mb-6 bg-linear-to-br from-blue-600 to-slate-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-blue-700 to-slate-700 bg-clip-text text-transparent">
                    {t(`angebote.services.${item.key}.title`)}
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {t(`angebote.services.${item.key}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-emerald-50 via-teal-50/50 to-white overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-extrabold mb-8 bg-linear-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
              {t("angebote.whyUs.title")}
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>{t("angebote.whyUs.text1")}</p>
              <p>{t("angebote.whyUs.text2")}</p>
              <p>{t("angebote.whyUs.text3")}</p>
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
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
              alt="Professional Service"
              className="relative rounded-3xl shadow-xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Investment Locations */}
      <section className="relative py-20 px-4 bg-linear-to-br from-indigo-50 via-purple-50/50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-extrabold mb-6 bg-linear-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              {t("angebote.locations.title")}
            </h2>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              {t("angebote.locations.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              [...Array(6)].map((_, i) => (
                <div key={i} className="group relative">
                  <div className="absolute -inset-1 bg-linear-to-r from-indigo-200 to-purple-200 rounded-2xl blur opacity-40"></div>
                  <div className="relative bg-white/95 p-6 rounded-2xl shadow-lg border border-indigo-100 text-center">
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : cities.length > 0 ? (
              cities.map((city, i) => (
                <motion.div
                  key={city._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-linear-to-r from-indigo-200 to-purple-200 rounded-2xl blur opacity-40"></div>
                  <div className="relative bg-white/95 p-6 rounded-2xl shadow-lg border border-indigo-100 text-center hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold bg-linear-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                      {getCityName(city)}
                    </h3>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-slate-600">
                <p className="text-xl">
                  {t("angebote.locations.noCities", "لا توجد مدن متاحة حالياً")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-rose-50 via-pink-50/50 to-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-rose-100"
          >
            <h2 className="text-5xl font-extrabold mb-6 bg-linear-to-r from-rose-700 to-pink-700 bg-clip-text text-transparent">
              {t("angebote.contact.title")}
            </h2>
            <p className="text-xl text-slate-700 leading-relaxed mb-8">
              {t("angebote.contact.text")}
            </p>
            <div className="text-2xl font-bold text-slate-800">
              medical-invest.de
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
