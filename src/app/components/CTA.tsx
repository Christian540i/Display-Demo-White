"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-28 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-50/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-warm-50/50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold text-amber-500 tracking-widest uppercase mb-4"
            >
              Get Started Today
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight"
            >
              Ready to Transform
              <br />
              Your Home?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-stone-400 text-lg max-w-md"
            >
              Schedule a free consultation and get a detailed quote within 48
              hours. No obligation, no pressure — just expert advice.
            </motion.p>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 space-y-4"
            >
              {[
                {
                  icon: Phone,
                  label: "(555) 123-4567",
                  sub: "Mon-Fri, 8am-6pm",
                },
                {
                  icon: Mail,
                  label: "hello@havenimprovement.com",
                  sub: "We reply within 24hrs",
                },
                {
                  icon: MapPin,
                  label: "Cleveland, Ohio",
                  sub: "Serving Greater Cleveland",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center group-hover:bg-amber-50 transition-colors duration-300">
                    <item.icon
                      size={18}
                      className="text-stone-400 group-hover:text-amber-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-700">
                      {item.label}
                    </p>
                    <p className="text-xs text-stone-400">{item.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-stone-200/40 border border-stone-100">
              <h3 className="text-xl font-bold text-stone-800 mb-2">
                Request a Free Quote
              </h3>
              <p className="text-sm text-stone-400 mb-8">
                Tell us about your project and we&apos;ll get back to you
                promptly.
              </p>

              <form className="space-y-5">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all"
                  />
                </div>

                {/* Service type */}
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-2">
                    Service Interested In
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-700 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all bg-white appearance-none">
                    <option value="">Select a service...</option>
                    <option>Kitchen Remodeling</option>
                    <option>Bathroom Renovation</option>
                    <option>Interior Design</option>
                    <option>Home Additions</option>
                    <option>Flooring & Tile</option>
                    <option>Outdoor Living</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-2">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project vision..."
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="button"
                  className="w-full group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-gradient-to-r from-warm-500 to-amber-500 rounded-xl hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Send Request
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
