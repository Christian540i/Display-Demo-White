"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const categories = ["All", "Kitchen", "Bathroom", "Living Room", "Outdoor"];

const projects = [
  {
    title: "Modern Minimalist Kitchen",
    category: "Kitchen",
    gradient: "from-warm-200 via-warm-100 to-amber-50",
    tag: "Complete Remodel",
    size: "large",
  },
  {
    title: "Spa Bathroom Retreat",
    category: "Bathroom",
    gradient: "from-blue-100 via-sky-50 to-white",
    tag: "Luxury Upgrade",
    size: "small",
  },
  {
    title: "Open Concept Living",
    category: "Living Room",
    gradient: "from-stone-200 via-stone-100 to-warm-50",
    tag: "Wall Removal",
    size: "small",
  },
  {
    title: "Chef's Dream Kitchen",
    category: "Kitchen",
    gradient: "from-amber-100 via-yellow-50 to-white",
    tag: "Custom Cabinetry",
    size: "medium",
  },
  {
    title: "Outdoor Entertainment",
    category: "Outdoor",
    gradient: "from-emerald-100 via-green-50 to-white",
    tag: "Deck & Patio",
    size: "medium",
  },
  {
    title: "Luxury Primary Bath",
    category: "Bathroom",
    gradient: "from-rose-100 via-pink-50 to-white",
    tag: "Full Renovation",
    size: "large",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="py-28 bg-gradient-to-b from-white via-stone-50/50 to-white relative"
    >
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold text-amber-500 tracking-widest uppercase mb-4"
            >
              Our Portfolio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight"
            >
              Featured Projects
            </motion.h2>
          </div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-2 mt-6 md:mt-0 flex-wrap"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-stone-800 text-white shadow-lg"
                    : "bg-white text-stone-500 border border-stone-200 hover:border-stone-300 hover:text-stone-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer ${
                project.size === "large"
                  ? "md:col-span-2 md:row-span-1"
                  : ""
              }`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
              />

              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern
                      id={`pattern-${i}`}
                      x="0"
                      y="0"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="20" cy="20" r="1" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill={`url(#pattern-${i})`}
                  />
                </svg>
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                {/* Tag */}
                <div className="flex justify-between items-start">
                  <span className="inline-flex px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full text-xs font-medium text-stone-600">
                    {project.tag}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight size={16} className="text-stone-700" />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <p className="text-xs text-stone-400 font-medium uppercase tracking-wider mb-1">
                    {project.category}
                  </p>
                  <h3 className="text-xl font-bold text-stone-800 group-hover:text-stone-900 transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-14"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-stone-700 bg-white border border-stone-200 rounded-full hover:border-stone-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            View All Projects
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
