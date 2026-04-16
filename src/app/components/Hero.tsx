"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Shield, Clock, ChevronDown } from "lucide-react";

/**
 * Detects if we're on a mobile/tablet device where background
 * video frame extraction won't work reliably.
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;
    setIsMobile(check);
  }, []);
  return isMobile;
}

/**
 * Extracts video frames to ImageBitmap array for instant canvas drawing.
 * Only runs on desktop — mobile gets a simple video fallback.
 */
function useVideoFrames(src: string, totalFrames: number, enabled: boolean) {
  const [frames, setFrames] = useState<ImageBitmap[]>([]);
  const [firstFrame, setFirstFrame] = useState<ImageBitmap | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    const extract = async () => {
      try {
        const video = document.createElement("video");
        video.src = src;
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        video.crossOrigin = "anonymous";

        await new Promise<void>((resolve, reject) => {
          if (video.readyState >= 2) {
            resolve();
          } else {
            video.addEventListener("loadeddata", () => resolve(), { once: true });
            video.addEventListener("error", () => reject(), { once: true });
          }
        });

        if (cancelled) return;

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
        const duration = video.duration;

        const grabFrame = async (time: number): Promise<ImageBitmap> => {
          video.currentTime = time;
          await new Promise<void>((r) =>
            video.addEventListener("seeked", () => r(), { once: true })
          );
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          return createImageBitmap(canvas);
        };

        const frame0 = await grabFrame(0);
        if (cancelled) return;
        setFirstFrame(frame0);

        const extracted: ImageBitmap[] = [frame0];
        for (let i = 1; i < totalFrames; i++) {
          if (cancelled) return;
          const time = (i / (totalFrames - 1)) * duration;
          const bitmap = await grabFrame(time);
          extracted.push(bitmap);
        }

        if (!cancelled) {
          setFrames(extracted);
          setReady(true);
        }
      } catch {
        // Frame extraction failed — fallback video will show
      }
    };

    extract();
    return () => {
      cancelled = true;
    };
  }, [src, totalFrames, enabled]);

  return { frames, firstFrame, ready };
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoFallbackRef = useRef<HTMLVideoElement>(null);
  const currentFrameRef = useRef(-1);
  const canvasSizedRef = useRef(false);
  const isMobile = useIsMobile();

  // Only extract frames on desktop
  const { frames, firstFrame, ready } = useVideoFrames(
    "/hero-video.mp4",
    60,
    !isMobile
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Draw a single frame to canvas (desktop only)
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !frames[index]) return;
      if (index === currentFrameRef.current) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      currentFrameRef.current = index;
      ctx.drawImage(frames[index], 0, 0, canvas.width, canvas.height);
    },
    [frames]
  );

  // Show first frame on canvas immediately
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !firstFrame || canvasSizedRef.current) return;
    canvas.width = firstFrame.width;
    canvas.height = firstFrame.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(firstFrame, 0, 0, canvas.width, canvas.height);
      canvasSizedRef.current = true;
    }
  }, [firstFrame]);

  // Once all frames ready, draw current scroll position
  useEffect(() => {
    if (!ready || frames.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = frames[0].width;
    canvas.height = frames[0].height;
    const value = scrollYProgress.get();
    const idx = Math.min(
      Math.floor(value * (frames.length - 1)),
      frames.length - 1
    );
    drawFrame(Math.max(0, idx));
  }, [ready, frames, drawFrame, scrollYProgress]);

  // Scroll → frame on desktop
  useEffect(() => {
    if (!ready) return;
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const idx = Math.min(
        Math.floor(value * (frames.length - 1)),
        frames.length - 1
      );
      drawFrame(Math.max(0, idx));
    });
    return unsubscribe;
  }, [scrollYProgress, frames, ready, drawFrame]);

  // Mobile: autoplay the video in a loop
  useEffect(() => {
    if (!isMobile || !videoFallbackRef.current) return;
    videoFallbackRef.current.play().catch(() => {
      // Autoplay blocked — that's fine, poster will show
    });
  }, [isMobile]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-stone-950"
      style={{ height: isMobile ? "100vh" : "400vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          {/* Video fallback — always present, visible on mobile or if canvas fails */}
          <video
            ref={videoFallbackRef}
            src="/hero-video.mp4"
            muted
            playsInline
            loop
            autoPlay
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              // On desktop: hidden once canvas takes over. On mobile: always visible.
              opacity: isMobile ? 1 : firstFrame ? 0 : 1,
              transition: "opacity 0.5s ease",
            }}
          />

          {/* Canvas overlay — desktop only, takes over once frames are extracted */}
          {!isMobile && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: firstFrame ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            />
          )}

          {/* Gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative h-full pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
              >
                <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-white/80 tracking-wide uppercase">
                  Now Booking Summer 2026 Projects
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight text-white"
              >
                Transform
                <br />
                Your Home Into
                <br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-warm-400 bg-clip-text text-transparent">
                  Something Beautiful
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-lg"
              >
                From kitchen remodels to complete home renovations, we craft
                living spaces that inspire. Award-winning craftsmanship with a
                personal touch.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-stone-900 bg-gradient-to-r from-amber-300 to-amber-400 rounded-full hover:shadow-xl hover:shadow-amber-400/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Start Your Project
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  View Our Work
                </a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="mt-12 flex flex-wrap gap-8"
              >
                {[
                  { icon: Star, label: "4.9 Rating", sub: "200+ Reviews" },
                  { icon: Shield, label: "Licensed", sub: "& Insured" },
                  { icon: Clock, label: "15+ Years", sub: "Experience" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm text-amber-400">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.label}
                      </p>
                      <p className="text-xs text-white/50">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium text-white/50 tracking-widest uppercase">
            Scroll to explore
          </span>
          <ChevronDown size={20} className="text-white/50 animate-bounce" />
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
