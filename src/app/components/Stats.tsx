"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "500+", label: "Projects Completed", suffix: "" },
  { value: "15+", label: "Years of Experience", suffix: "" },
  { value: "98%", label: "Client Satisfaction", suffix: "" },
  { value: "$0", label: "Hidden Fees. Ever.", suffix: "" },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-gradient-to-r from-stone-50 via-warm-50/30 to-stone-50 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute left-0 top-0 w-32 h-32 bg-amber-100/30 rounded-full blur-2xl" />
      <div className="absolute right-0 bottom-0 w-40 h-40 bg-warm-100/30 rounded-full blur-2xl" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="text-center group"
            >
              <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2 group-hover:scale-105 transition-transform duration-300 inline-block">
                {stat.value}
              </div>
              <p className="text-sm text-stone-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
