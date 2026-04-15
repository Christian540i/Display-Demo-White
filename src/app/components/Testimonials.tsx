"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah & Michael Chen",
    location: "Westlake, OH",
    project: "Kitchen Remodel",
    rating: 5,
    text: "Our kitchen went from cramped and outdated to an open, light-filled space we actually love spending time in. The team kept us informed every step and finished on schedule.",
    initials: "SC",
    avatar: "from-amber-300 to-orange-400",
    accent: "amber",
  },
  {
    name: "David & Lisa Hartmann",
    location: "Avon, OH",
    project: "Bathroom Renovation",
    rating: 5,
    text: "They turned our primary bath into a proper retreat. The attention to detail in the tilework alone blew us away. Worth every penny — feels like a brand-new home.",
    initials: "DH",
    avatar: "from-blue-300 to-indigo-400",
    accent: "blue",
  },
  {
    name: "Jennifer Rodriguez",
    location: "Rocky River, OH",
    project: "Full Home Renovation",
    rating: 5,
    text: "We were nervous about a whole-home renovation, but they made the process seamless. Communication was excellent and the craftsmanship is genuinely stunning.",
    initials: "JR",
    avatar: "from-rose-300 to-pink-400",
    accent: "rose",
  },
  {
    name: "Thomas & Emily Park",
    location: "Bay Village, OH",
    project: "Outdoor Living Space",
    rating: 5,
    text: "Our backyard is now our favorite room. The deck, pergola, and outdoor kitchen are perfect for entertaining. Neighbors can't stop complimenting it!",
    initials: "TP",
    avatar: "from-emerald-300 to-teal-400",
    accent: "emerald",
  },
];

// Star rating display
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 * i, duration: 0.3 }}
        >
          <Star size={16} className="fill-amber-400 text-amber-400" />
        </motion.div>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((p) => (p + 1) % testimonials.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section
      id="testimonials"
      className="py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-900 to-stone-800" />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-warm-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative" ref={ref}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
          >
            Loved by Homeowners
          </motion.h2>
        </div>

        {/* Main testimonial showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative grid lg:grid-cols-5 gap-8 items-center">
            {/* Left - Large quote card */}
            <div className="lg:col-span-3 relative">
              <div className="relative bg-white/[0.06] backdrop-blur-xl rounded-3xl p-10 md:p-14 border border-white/10 min-h-[360px] flex flex-col justify-between overflow-hidden">
                {/* Large decorative quote */}
                <div className="absolute -top-4 -left-2 text-white/[0.04] pointer-events-none">
                  <Quote size={200} strokeWidth={1} />
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative"
                  >
                    {/* Stars */}
                    <StarRating count={t.rating} />

                    {/* Quote */}
                    <p className="mt-6 text-xl md:text-2xl lg:text-[26px] text-white/90 leading-relaxed font-medium">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="mt-10 flex items-center gap-4">
                      {/* Avatar with gradient ring */}
                      <div className="relative">
                        <div
                          className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.avatar} flex items-center justify-center ring-2 ring-white/20`}
                        >
                          <span className="text-sm font-bold text-white">
                            {t.initials}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">
                          {t.name}
                        </p>
                        <p className="text-sm text-white/40">
                          {t.project} &bull; {t.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right - Navigation + mini cards */}
            <div className="lg:col-span-2 space-y-4">
              {testimonials.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + 0.08 * i }}
                  className={`w-full text-left rounded-2xl p-5 transition-all duration-400 border ${
                    i === current
                      ? "bg-white/10 border-white/20 shadow-lg shadow-white/5"
                      : "bg-transparent border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.avatar} flex items-center justify-center flex-shrink-0 ${
                        i === current ? "ring-2 ring-white/30" : "opacity-50"
                      } transition-all duration-300`}
                    >
                      <span className="text-xs font-bold text-white">
                        {item.initials}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-semibold truncate transition-colors duration-300 ${
                          i === current ? "text-white" : "text-white/40"
                        }`}
                      >
                        {item.name}
                      </p>
                      <p
                        className={`text-xs truncate transition-colors duration-300 ${
                          i === current ? "text-white/50" : "text-white/20"
                        }`}
                      >
                        {item.project}
                      </p>
                    </div>

                    {/* Active indicator */}
                    {i === current && (
                      <motion.div
                        layoutId="activeTestimonial"
                        className="ml-auto w-2 h-2 rounded-full bg-amber-400 flex-shrink-0"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </motion.button>
              ))}

              {/* Nav arrows */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <ChevronLeft size={18} className="text-white/60" />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <ChevronRight size={18} className="text-white/60" />
                </button>
                {/* Progress bar */}
                <div className="flex-1 flex items-center pl-4">
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-400 to-warm-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{
                        width: `${((current + 1) / testimonials.length) * 100}%`,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: "200+", label: "5-Star Reviews" },
            { value: "98%", label: "Would Recommend" },
            { value: "4.9", label: "Average Rating" },
            { value: "#1", label: "In Greater Cleveland" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-warm-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs text-white/30 mt-1 font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
