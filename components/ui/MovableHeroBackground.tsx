'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Eye, Move } from 'lucide-react';

interface MovableHeroBackgroundProps {
  src: string;
  alt: string;
  objectPosition?: string;
  brightness?: string;
  contrast?: string;
  gradientOverlayRight?: string;
  gradientOverlayBottom?: string;
  interactiveBadgeText?: string;
}

export function MovableHeroBackground({
  src,
  alt,
  objectPosition = 'object-center',
  brightness = 'brightness-110',
  contrast = 'contrast-105',
  gradientOverlayRight,
  gradientOverlayBottom,
  interactiveBadgeText = 'Interactive 3D Viewport • Move cursor to explore',
}: MovableHeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking normalized from -0.5 to 0.5
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Smooth physics spring for mouse parallax
  const springConfig = { damping: 28, stiffness: 140, mass: 0.8 };
  const mouseX = useSpring(useTransform(rawMouseX, [-0.5, 0.5], [-35, 35]), springConfig);
  const mouseY = useSpring(useTransform(rawMouseY, [-0.5, 0.5], [-25, 25]), springConfig);
  const mouseRotate = useSpring(useTransform(rawMouseX, [-0.5, 0.5], [-1.5, 1.5]), springConfig);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scrollTranslateY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = e.clientX / innerWidth - 0.5;
      const yNorm = e.clientY / innerHeight - 0.5;
      rawMouseX.set(xNorm);
      rawMouseY.set(yNorm);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none [perspective:1200px]"
      aria-hidden="true"
    >
      {/* 3D MOVABLE IMAGE WRAPPER WITH PARALLAX & AMBIENT FLOATING */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          rotate: mouseRotate,
          translateY: scrollTranslateY,
          scale: scrollScale,
          transformStyle: 'preserve-3d',
        }}
        className="absolute -inset-10 sm:-inset-16 w-[calc(100%+5rem)] sm:w-[calc(100%+8rem)] h-[calc(100%+5rem)] sm:h-[calc(100%+8rem)] [transform-style:preserve-3d]"
      >
        {/* AMBIENT CINEMATIC BREATHING & FLOATING MOTION */}
        <motion.div
          animate={{
            scale: [1.02, 1.06, 1.02],
            x: [-8, 8, -8],
            y: [-6, 6, -6],
            rotate: [-0.4, 0.4, -0.4],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="relative w-full h-full"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            quality={95}
            sizes="100vw"
            className={`object-cover ${objectPosition} ${brightness} ${contrast} transition-all duration-700`}
          />

          {/* DYNAMIC SPECULAR LIGHT BEAM SWEEP */}
          <motion.div
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 0.35, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute -inset-full bg-gradient-to-r from-transparent via-[#7bb0ed]/20 to-transparent rotate-25 pointer-events-none"
          />
        </motion.div>
      </motion.div>

      {/* GRADIENT OVERLAYS FOR MAXIMUM TEXT LEGIBILITY & VIBRANT DEPTH */}
      <div
        className={
          gradientOverlayRight ||
          'absolute inset-0 bg-gradient-to-r from-[#09090b]/75 via-[#09090b]/30 to-transparent pointer-events-none'
        }
      />
      <div
        className={
          gradientOverlayBottom ||
          'absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-[#09090b]/25 pointer-events-none'
        }
      />

      {/* AMBIENT 3D RADIAL SPOTLIGHT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(74,126,184,0.12)_0%,transparent_60%)] pointer-events-none" />

      {/* INTERACTIVE MOTION BADGE (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-white/15 backdrop-blur-md text-[11px] font-medium text-slate-300 shadow-xl pointer-events-auto select-none">
        <span className="w-2 h-2 rounded-full bg-[#7bb0ed] animate-ping" />
        <Move className="w-3.5 h-3.5 text-[#4A7EB8]" />
        <span>{interactiveBadgeText}</span>
      </div>
    </div>
  );
}

export default MovableHeroBackground;
