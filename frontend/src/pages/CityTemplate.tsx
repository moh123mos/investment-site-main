import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { motion } from 'framer-motion';

import { useTranslation } from 'react-i18next';

export default function CityTemplate() {
    const { slug } = useParams();
    const { i18n } = useTranslation();
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

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!city) return <div className="min-h-screen flex items-center justify-center">City not found</div>;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={city.heroImage}
                        alt={city.name}
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
                        {city.name}
                    </motion.h1>
                </div>
            </section>

            {/* Intro Section */}
            <section className="relative py-20 px-4 bg-linear-to-br from-amber-50 via-orange-50/50 to-white overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white/95 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-amber-100 text-center"
                    >
                        <p className="text-2xl text-slate-700 leading-relaxed font-medium">
                            {city.introText}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Dynamic Sections */}
            {city.sections?.map((section: any, index: number) => (
                <section
                    key={index}
                    className={`relative py-20 px-4 overflow-hidden ${index % 2 === 0
                        ? 'bg-linear-to-br from-emerald-50 via-teal-50/50 to-white'
                        : 'bg-linear-to-br from-rose-50 via-pink-50/50 to-white'
                        }`}
                >
                    <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className={index % 2 !== 0 ? 'order-2 md:order-1' : ''}
                        >
                            <h2 className="text-5xl font-extrabold mb-8 text-gray-800">
                                {section.title}
                            </h2>
                            <p className="text-lg text-slate-700 leading-relaxed">
                                {section.content}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className={`relative group ${index % 2 !== 0 ? 'order-1 md:order-2' : ''}`}
                        >
                            {section.image && (
                                <img
                                    src={section.image}
                                    alt={section.title}
                                    className="relative rounded-3xl shadow-xl border-4 border-white w-full object-cover h-96"
                                />
                            )}
                        </motion.div>
                    </div>
                </section>
            ))}

            {/* Activities Section */}
            {city.activities && city.activities.length > 0 && (
                <section className="relative py-20 px-4 bg-linear-to-br from-indigo-50 via-purple-50/50 to-white overflow-hidden">
                    <div className="max-w-6xl mx-auto relative z-10">
                        <h2 className="text-5xl font-extrabold mb-12 text-center text-indigo-900">
                            Weekly Activities
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {city.activities.map((item: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative group"
                                >
                                    <div className="relative bg-white/95 p-6 rounded-2xl shadow-lg border border-indigo-100">
                                        <h3 className="text-2xl font-bold mb-3 text-indigo-700">
                                            {item.day}
                                        </h3>
                                        <p className="text-slate-700 leading-relaxed">{item.activity}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
