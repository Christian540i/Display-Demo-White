"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ChefHat,
  Bath,
  PaintBucket,
  Hammer,
  Layers,
  Sun,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: ChefHat,
    title: "Kitchen Remodeling",
    desc: "Custom cabinetry, countertops, and layouts designed for how you actually live and cook.",
    color: "from-amber-50 to-orange-50",
    iconColor: "text-amber-500",
    accent: "bg-amber-500",
  },
  {
    icon: Bath,
    title: "Bathroom Renovation",
    desc: "Spa-inspired bathrooms with premium fixtures, tilework, and smart storage solutions.",
    color: "from-blue-50 to-cyan-50",
    iconColor: "text-blue-500",
    accent: "bg-blue-500",
  },
  {
    icon: PaintBucket,
    title: "Interior Design",
    desc: "Cohesive color palettes, furnishing curation, and spaces that feel uniquely yours.",
    color: "from-rose-50 to-pink-50",
    iconColor: "text-rose-400",
    accent: "bg-rose-400",
  },
  {
    icon: Hammer,
    title: "Home Additions",
    desc: "Seamless expansions that add livable square footage while maintaining architectural harmony.",
    color: "from-warm-50 to-warm-100",
    iconColor: "text-warm-500",
    accent: "bg-warm-500",
  },
  {
    icon: Layers,
    title: "Flooring & Tile",
    desc: "Hardwood, luxury vinyl, natural stone, and custom tile installations that anchor every room.",
    color: "from-emerald-50 to-green-50",
    iconColor: "text-emerald-500",
    accent: "bg-emerald-500",
  },
  {
    icon: Sun,
    title: "Outdoor Living",
    desc: "Decks, patios, pergolas, and outdoor kitchens for year-round entertaining.",
    color: "from-yellow-50 to-amber-50",
    iconColor: "text-yellow-500",
    accent: "bg-yellow-500",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-28 bg-white relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-amber-500 tracking-widest uppercase mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight"
          >
            Crafted Services for
            <br />
            Every Corner of Home
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-stone-400 text-lg"
          >
            We bring expertise, artistry, and care to every project — big or
            small.
          </motion.p>
        </div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group relative p-8 rounded-3xl bg-white border border-stone-100 hover:border-stone-200 hover:shadow-xl hover:shadow-stone-100/50 transition-all duration-500 cursor-pointer"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon size={24} className={service.iconColor} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-stone-800 mb-3 group-hover:text-stone-900 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed mb-6">
                {service.desc}
              </p>

              {/* Link arrow */}
              <div className="flex items-center gap-2 text-sm font-medium text-stone-400 group-hover:text-amber-500 transition-colors">
                <span>Learn more</span>
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </div>

              {/* Accent line at bottom */}
              <div
                className={`absolute bottom-0 left-8 right-8 h-0.5 ${service.accent} rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
