import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HomeIcon, TrendingUp, Award, Heart, MapPin, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  const isRTL = i18n.language === 'ar';

  const services = [
    { icon: HomeIcon, key: "buying", gradient: "from-blue-500 to-cyan-500" },
    { icon: TrendingUp, key: "selling", gradient: "from-emerald-500 to-teal-500" },
    { icon: Award, key: "consulting", gradient: "from-purple-500 to-pink-500" },
    { icon: Heart, key: "management", gradient: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=900&fit=crop"
            alt="Real Estate Offers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20"
            >
              <span className="text-primary font-medium">{t("angebote.hero.subtitle")}</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-extrabold text-foreground mb-6">
              {t("angebote.hero.title")}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {t("angebote.services.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("angebote.services.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <CardContent className="p-8 relative">
                    <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                      {t(`angebote.services.${item.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`angebote.services.${item.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-24 px-4 bg-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10" />

        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              {t("angebote.whyUs.title")}
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
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
            <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
              alt="Professional Service"
              className="relative rounded-3xl shadow-xl border-4 border-card"
            />
          </motion.div>
        </div>
      </section>

      {/* Investment Locations */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Locations</span>
            </div>
            <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {t("angebote.locations.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("angebote.locations.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              [...Array(6)].map((_, i) => (
                <Card key={i} className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="h-8 bg-muted rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))
            ) : cities.length > 0 ? (
              cities.map((city, i) => (
                <motion.div
                  key={city._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/city/${city.slug}`}>
                    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                      <CardContent className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                            {getCityName(city)}
                          </h3>
                        </div>
                        <ArrowRight className={`w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-200 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <MapPin className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-xl text-muted-foreground">
                  {t("angebote.locations.noCities", "لا توجد مدن متاحة حالياً")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="relative py-24 px-4 bg-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-pink-500/5 dark:from-rose-500/10 dark:to-pink-500/10" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-2xl bg-card/90 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5" />
              <CardContent className="p-12 relative">
                <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  {t("angebote.contact.title")}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {t("angebote.contact.text")}
                </p>
                <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  medical-invest.de
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
