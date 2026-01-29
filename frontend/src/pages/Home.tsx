import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import {
  Sparkles,
  TrendingUp,
  Award,
  Youtube
} from "lucide-react";

export default function Home() {
  const { t } = useTranslation();
  const [videos, setVideos] = useState<any[]>([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_URL}/api/videos`)
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.error(err));
  }, [API_URL]);

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Section 1: Why Real Estate */}
      <section className="relative py-20 px-4 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-slate-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-indigo-100/30 rounded-full blur-2xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-slate-700 to-slate-800 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="font-bold text-sm tracking-wide">PREMIUM INVESTMENT GUIDE</span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-linear-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent leading-tight">
                {t("home.section1.title")}
              </h2>
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-slate-200 to-blue-200 rounded-2xl blur opacity-50"></div>
                <div className="relative bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-slate-200">
                  <p className="text-lg text-slate-700 leading-relaxed">{t("home.section1.text")}</p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} className="relative overflow-hidden bg-linear-to-r from-slate-700 to-slate-800 p-[2px] rounded-2xl shadow-xl">
                <div className="bg-linear-to-r from-slate-700 to-slate-800 p-6 rounded-2xl text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-8 h-8" />
                    <p className="text-2xl font-bold">{t("home.section1.signature")}</p>
                  </div>
                  <p className="text-slate-200 font-medium text-lg ml-11">🌐 {t("home.section1.website")}</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-linear-to-r from-slate-300 via-blue-200 to-indigo-200 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 animate-pulse transition-opacity"></div>
                <img src="/m-reda.jpg" alt="Dr. M. Reda Sholkami" className="relative rounded-3xl shadow-2xl w-full max-w-md object-cover border-4 border-white group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-linear-to-br from-slate-600 to-slate-700 p-3 rounded-full shadow-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Quote */}
      <section className="relative py-20 px-4 bg-linear-to-br from-rose-50 via-pink-50/50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-linear-to-r from-rose-200 via-pink-200 to-rose-200 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
              <div className="relative bg-white/95 backdrop-blur-md px-10 py-8 rounded-3xl shadow-lg border-2 border-rose-100">
                <p className="text-3xl md:text-4xl font-script text-transparent bg-linear-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text italic leading-relaxed px-4" style={{ fontFamily: "Dancing Script, cursive" }}>
                  {t("home.section2.quote")}
                </p>
              </div>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[1, 2, 3].map((i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.15 }} viewport={{ once: true }} className="relative group">
                <img src={`/family-${i}.jpg`} alt={`Family ${i}`} className="rounded-2xl shadow-xl w-full h-64 object-cover border-4 border-white" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Property Guide */}
      <section className="relative py-20 px-4 bg-linear-to-br from-emerald-50 via-teal-50/50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" alt="Real Estate" className="rounded-3xl shadow-xl w-full object-cover border-4 border-white" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-6">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 bg-linear-to-r from-emerald-700 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              {t("home.section3.title")}
            </h3>
            <p className="text-lg text-slate-700 leading-relaxed">{t("home.section3.text")}</p>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Blog Image */}
      <section className="relative py-20 px-4 bg-linear-to-br from-amber-50 via-orange-50/50 to-white overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="group">
            <a href="https://newsroom.apobank.de/latest_news" target="_blank" rel="noopener noreferrer" className="block relative">
              <img src="/Blog Gesundheitsmarkt.png" alt="Blog" className="rounded-3xl shadow-xl w-full object-cover border-4 border-white" />
            </a>
            <div className="mt-8 text-center">
              <h3 className="text-3xl font-bold bg-linear-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">{t("home.section4.title")}</h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Videos Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-indigo-50 via-purple-50/50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-extrabold text-center mb-12 bg-linear-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            Featured Videos
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => {
              const youtubeId = getYoutubeId(video.url);
              return (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100 flex flex-col"
                >
                  <div className="relative aspect-video">
                    {youtubeId ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        Invalid Video URL
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{video.title}</h3>
                    {video.description && <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{video.description}</p>}
                    <a href={video.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-red-600 font-medium hover:text-red-700 mt-auto">
                      <Youtube size={20} /> Watch on YouTube
                    </a>
                  </div>
                </motion.div>
              );
            })}

            {videos.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-12">
                No videos available. Add them in the Admin Panel.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
