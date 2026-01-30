import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Calendar, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function CityTemplate() {
    const { slug } = useParams();
    const { i18n, t } = useTranslation();
    const [city, setCity] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const res = await fetch(`${API_URL}/api/cities/${slug}`, {
                    headers: {
                        'Accept-Language': i18n.language
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setCity(data);
                } else {
                    console.error('City not found');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchCity();
    }, [slug, i18n.language]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    if (!city) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Card className="border-0 shadow-xl">
                    <CardContent className="p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                            <MapPin className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">City not found</h2>
                        <p className="text-muted-foreground">The requested city could not be found.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Alternating gradient colors for sections
    const sectionGradients = [
        { light: 'from-emerald-500/5 to-teal-500/5', dark: 'dark:from-emerald-500/10 dark:to-teal-500/10', text: 'from-emerald-500 to-teal-500' },
        { light: 'from-rose-500/5 to-pink-500/5', dark: 'dark:from-rose-500/10 dark:to-pink-500/10', text: 'from-rose-500 to-pink-500' },
        { light: 'from-blue-500/5 to-cyan-500/5', dark: 'dark:from-blue-500/10 dark:to-cyan-500/10', text: 'from-blue-500 to-cyan-500' },
        { light: 'from-amber-500/5 to-orange-500/5', dark: 'dark:from-amber-500/10 dark:to-orange-500/10', text: 'from-amber-500 to-orange-500' },
    ];

    return (
        <div className="min-h-screen bg-background transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={city.heroImage}
                        alt={city.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
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
                            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20"
                        >
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-primary font-medium">Investment Location</span>
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-extrabold text-foreground">
                            {city.name}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 dark:from-amber-500/10 dark:to-orange-500/10" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-0 shadow-2xl bg-card/90 backdrop-blur-sm overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />
                            <CardContent className="p-12 text-center relative">
                                <p className="text-2xl text-muted-foreground leading-relaxed font-medium">
                                    {city.introText}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Dynamic Sections */}
            {city.sections?.map((section: any, index: number) => {
                const gradient = sectionGradients[index % sectionGradients.length];
                const isEven = index % 2 === 0;

                return (
                    <section
                        key={index}
                        className={`relative py-24 px-4 overflow-hidden ${isEven ? '' : 'bg-muted/30'}`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient.light} ${gradient.dark}`} />

                        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className={isEven ? '' : 'order-2 md:order-1'}
                            >
                                <h2 className={`text-5xl font-extrabold mb-8 bg-gradient-to-r ${gradient.text} bg-clip-text text-transparent`}>
                                    {section.title}
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {section.content}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className={`relative group ${isEven ? '' : 'order-1 md:order-2'}`}
                            >
                                {section.image && (
                                    <>
                                        <div className={`absolute -inset-3 bg-gradient-to-r ${gradient.text} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity`} />
                                        <img
                                            src={section.image}
                                            alt={section.title}
                                            className="relative rounded-3xl shadow-xl border-4 border-card w-full object-cover h-96"
                                        />
                                    </>
                                )}
                            </motion.div>
                        </div>
                    </section>
                );
            })}

            {/* Activities Section */}
            {city.activities && city.activities.length > 0 && (
                <section className="relative py-24 px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10" />

                    <div className="max-w-6xl mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">Schedule</span>
                            </div>
                            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                                {t('city.activities', 'Weekly Activities')}
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {city.activities.map((item: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                                        <CardContent className="p-6 relative">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shrink-0">
                                                    <Calendar className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                                                        {item.day}
                                                    </h3>
                                                    <p className="text-muted-foreground leading-relaxed">{item.activity}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
