"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Pencil, HardHat, Key } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consultation",
    desc: "We listen to your vision, assess your space, and discuss possibilities. Every great project starts with a conversation.",
    gradient: "from-amber-400 to-orange-400",
    bgGradient: "from-amber-50 to-orange-50",
    glowColor: "shadow-amber-200/50",
    image: "from-amber-100 via-amber-50 to-warm-50",
  },
  {
    number: "02",
    icon: Pencil,
    title: "Design & Plan",
    desc: "Our designers create detailed 3D renderings so you can see your future space before a single nail is driven.",
    gradient: "from-blue-400 to-indigo-400",
    bgGradient: "from-blue-50 to-indigo-50",
    glowColor: "shadow-blue-200/50",
    image: "from-blue-100 via-sky-50 to-indigo-50",
  },
  {
    number: "03",
    icon: HardHat,
    title: "Build & Craft",
    desc: "Our skilled craftsmen bring the design to life with premium materials and meticulous attention to every detail.",
    gradient: "from-warm-400 to-warm-500",
    bgGradient: "from-warm-50 to-warm-100",
    glowColor: "shadow-warm-200/50",
    image: "from-warm-100 via-warm-50 to-amber-50",
  },
  {
    number: "04",
    icon: Key,
    title: "Reveal & Enjoy",
    desc: "The moment you've been waiting for. Walk into your transformed space and fall in love with your home all over again.",
    gradient: "from-emerald-400 to-green-400",
    bgGradient: "from-emerald-50 to-green-50",
    glowColor: "shadow-emerald-200/50",
    image: "from-emerald-100 via-green-50 to-teal-50",
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Animated progress line fills as user scrolls through section
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section id="process" className="py-32 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-50/40 to-warm-50/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-gradient-to-br from-emerald-50/30 to-blue-50/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative" ref={sectionRef}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-amber-500 tracking-widest uppercase mb-4"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight"
          >
            From Vision to Reality
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-lg text-stone-400 max-w-xl mx-auto"
          >
            A seamless four-step journey that turns your dream home into your
            everyday reality.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical progress line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            {/* Track */}
            <div className="absolute inset-0 bg-stone-100 rounded-full" />
            {/* Fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-amber-300 via-blue-300 via-warm-300 to-emerald-300 rounded-full origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 60 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 * i }}
                  className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    isEven ? "" : "lg:direction-rtl"
                  }`}
                >
                  {/* Timeline node (desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg ${step.glowColor} ring-4 ring-white`}
                    >
                      <step.icon size={22} className="text-white" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`${isEven ? "lg:pr-20" : "lg:pl-20 lg:col-start-2 lg:row-start-1"}`}
                  >
                    <div className="group relative bg-white rounded-3xl p-8 md:p-10 border border-stone-100 hover:border-stone-200 hover:shadow-2xl hover:shadow-stone-100/60 transition-all duration-500">
                      {/* Large watermark number */}
                      <div className="absolute top-4 right-6 text-[120px] font-black leading-none text-stone-50 select-none pointer-events-none group-hover:text-stone-100/80 transition-colors duration-500">
                        {step.number}
                      </div>

                      {/* Mobile icon */}
                      <div
                        className={`lg:hidden w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-5 shadow-md ${step.glowColor}`}
                      >
                        <step.icon size={20} className="text-white" />
                      </div>

                      <div className="relative">
                        <span
                          className={`inline-block text-xs font-bold tracking-widest uppercase bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent mb-3`}
                        >
                          Step {step.number}
                        </span>
                        <h3 className="text-2xl font-bold text-stone-800 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-stone-400 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual card */}
                  <div
                    className={`${isEven ? "lg:pl-20 lg:col-start-2" : "lg:pr-20 lg:col-start-1 lg:row-start-1"}`}
                  >
                    <div className="group relative">
                      <div
                        className={`rounded-3xl aspect-[4/3] bg-gradient-to-br ${step.image} overflow-hidden border border-stone-100 shadow-lg hover:shadow-2xl transition-shadow duration-500`}
                      >
                        {/* Decorative interior illustration */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            {/* Animated rings */}
                            <motion.div
                              className={`absolute inset-0 rounded-full border-2 border-dashed opacity-20`}
                              style={{
                                borderColor:
                                  i === 0
                                    ? "#f59e0b"
                                    : i === 1
                                      ? "#3b82f6"
                                      : i === 2
                                        ? "#c08552"
                                        : "#10b981",
                                width: "140px",
                                height: "140px",
                                top: "-30px",
                                left: "-30px",
                              }}
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 20 + i * 5,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            <div
                              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl ${step.glowColor} group-hover:scale-110 transition-transform duration-500`}
                            >
                              <step.icon size={32} className="text-white" />
                            </div>
                          </div>
                        </div>

                        {/* Subtle grid pattern */}
                        <div
                          className="absolute inset-0 opacity-[0.04]"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle, currentColor 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
