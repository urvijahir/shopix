import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../../data/heroSlides";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-[#0F0A1F] dark:via-[#18122B] dark:to-[#1F1B33]">
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-8 sm:px-8 sm:pb-10 lg:px-12 lg:pt-20 lg:pb-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT */}

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                {slide.badge}
              </span>

              <h1 className="mt-6 max-w-xl text-4xl font-black leading-[1.05] text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
                Find Your <br />
                <span className="text-zinc-900 dark:text-white">Perfect </span>
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                  Style
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                {slide.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-2xl dark:shadow-violet-900/40">
                  {slide.button}
                </button>

                <button className="rounded-xl border border-zinc-300 bg-white px-7 py-4 font-semibold text-zinc-800 transition-all duration-300 hover:border-violet-600 hover:text-violet-600 dark:border-violet-900 dark:bg-[#221D38] dark:text-white">
                  {slide.secondaryButton}
                </button>
              </div>

              <div className="mt-12 flex flex-wrap gap-8">
                <div>
                  <h3 className="text-3xl font-bold text-violet-600">10K+</h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Happy Customers
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-violet-600">500+</h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Premium Products
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-violet-600">4.9★</h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Customer Rating
                  </p>
                </div>
              </div>

              {/* Dots */}

              <div className="mt-8 flex gap-3">
                {heroSlides.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "w-8 bg-violet-600"
                        : "bg-zinc-300 dark:bg-zinc-600"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT */}

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.image}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-400/30 via-fuchsia-300/20 to-pink-300/20 blur-[90px] dark:from-violet-700/30 dark:via-fuchsia-600/20 dark:to-pink-700/20"></div>

              <img
                src={slide.image}
                alt={slide.title}
                className="relative z-10 mx-auto h-[450px] w-full max-w-md object-contain drop-shadow-[0_35px_55px_rgba(109,93,246,0.35)] sm:h-[520px] lg:h-[720px] lg:max-w-xl"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute left-2 top-6 rounded-2xl border border-white/30 bg-white/80 p-4 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-[#221D38]/80"
              >
                <p className="text-lg font-bold text-violet-600">
                  {slide.offer}
                </p>

                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Limited Time
                </p>
              </motion.div>

              {/* Navigation */}

              <button
                onClick={prevSlide}
                className="absolute left-10 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur transition hover:bg-violet-600 hover:text-white dark:bg-[#221D38]/90"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-10 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur transition hover:bg-violet-600 hover:text-white dark:bg-[#221D38]/90"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
