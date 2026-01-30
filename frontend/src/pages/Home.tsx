import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import {
  Sparkles,
  TrendingUp,
  Award,
  Youtube,
  Play
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [videos, setVideos] = useState<any[]>([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_URL}/api/videos`, {
      headers: { 'Accept-Language': i18n.language }
    })
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.error(err));
  }, [API_URL, i18n.language]);

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="w-full overflow-hidden bg-background transition-colors duration-300">
      {/* Section 1: Why Real Estate */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="font-bold text-sm tracking-wide">PREMIUM INVESTMENT GUIDE</span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent leading-tight">
                {t("home.section1.title")}
              </h2>
              <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground leading-relaxed">{t("home.section1.text")}</p>
                </CardContent>
              </Card>
              <motion.div whileHover={{ scale: 1.02 }} className="relative overflow-hidden bg-primary p-[2px] rounded-2xl shadow-xl">
                <div className="bg-primary p-6 rounded-2xl text-primary-foreground">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-8 h-8" />
                    <p className="text-2xl font-bold">{t("home.section1.signature")}</p>
                  </div>
                  <p className="text-primary-foreground/80 font-medium text-lg ml-11">🌐 {t("home.section1.website")}</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 animate-pulse transition-opacity" />
                <img src="/m-reda.jpg" alt="Dr. M. Reda Sholkami" className="relative rounded-3xl shadow-2xl w-full max-w-md object-cover border-4 border-card group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-primary p-3 rounded-full shadow-xl">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Quote */}
      <section className="relative py-24 px-4 bg-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-rose-500/5 dark:from-pink-500/10 dark:to-rose-500/10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-40 animate-pulse" />
              <Card className="relative border-0 shadow-xl bg-card/90 backdrop-blur-sm">
                <CardContent className="px-10 py-8">
                  <p className="text-3xl md:text-4xl font-script text-transparent bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 bg-clip-text italic leading-relaxed px-4" style={{ fontFamily: "Dancing Script, cursive" }}>
                    {t("home.section2.quote")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[1, 2, 3].map((i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.15 }} viewport={{ once: true }} className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <img src={`/family-${i}.jpg`} alt={`Family ${i}`} className="relative rounded-2xl shadow-xl w-full h-64 object-cover border-4 border-card" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Property Guide */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10" />

        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" alt="Real Estate" className="relative rounded-3xl shadow-xl w-full object-cover border-4 border-card" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-6">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              {t("home.section3.title")}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">{t("home.section3.text")}</p>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Blog Image */}
      <section className="relative py-24 px-4 bg-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 dark:from-amber-500/10 dark:to-orange-500/10" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="group">
            <a href="https://newsroom.apobank.de/latest_news" target="_blank" rel="noopener noreferrer" className="block relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="/Blog Gesundheitsmarkt.png" alt="Blog" className="relative rounded-3xl shadow-xl w-full object-cover border-4 border-card" />
            </a>
            <div className="mt-8 text-center">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">{t("home.section4.title")}</h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Videos Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Play className="w-4 h-4" />
              <span className="text-sm font-medium">Video Gallery</span>
            </div>
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Featured Videos
            </h2>
          </motion.div>

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
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
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
                        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                          Invalid Video URL
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-foreground line-clamp-2">{video.title}</h3>
                      {video.description && <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{video.description}</p>}
                      <a href={video.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-red-500 dark:text-red-400 font-medium hover:text-red-600 dark:hover:text-red-300 transition-colors">
                        <Youtube size={20} /> Watch on YouTube
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {videos.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Youtube className="w-8 h-8" />
                </div>
                <p>No videos available. Add them in the Admin Panel.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
