'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  maxTilt?: number; // max tilt angle in degrees, default 14
  depth?: number; // visual scale elevation on hover, default 1.025
  glare?: boolean; // enable specular glare highlight, default true
  pedestal?: boolean; // enable 3D floating shadow underneath, default true
  glowColor?: string; // e.g. 'rgba(74, 126, 184, 0.4)'
}

export function ThreeDCard({
  children,
  className = '',
  containerClassName = '',
  maxTilt = 12,
  depth = 1.025,
  glare = true,
  pedestal = true,
  glowColor = 'rgba(74, 126, 184, 0.35)',
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates normalized from -1 to 1
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth physics spring interpolation
  const springConfig = { damping: 22, stiffness: 280, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  // Specular glare position
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  // Pedestal shadow offset (moves inversely to tilt for physical ground illusion)
  const shadowX = useSpring(useTransform(x, [-0.5, 0.5], [18, -18]), springConfig);
  const shadowY = useSpring(useTransform(y, [-0.5, 0.5], [24, -12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize coordinates between -0.5 and 0.5
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative [perspective:1200px] select-none ${containerClassName}`}
    >
      {/* 3D FLOATING PEDESTAL SHADOW */}
      {pedestal && (
        <motion.div
          style={{
            x: shadowX,
            y: shadowY,
            opacity: isHovered ? 0.75 : 0.35,
            scale: isHovered ? 1.05 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute -bottom-3 inset-x-6 h-6 rounded-full blur-xl transition-opacity"
          aria-hidden="true"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(ellipse at center, ${glowColor} 0%, rgba(0,0,0,0.8) 70%, transparent 100%)`,
            }}
          />
        </motion.div>
      )}

      {/* 3D TILT BODY */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? depth : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`relative w-full h-full [transform-style:preserve-3d] ${className}`}
      >
        {children}

        {/* SPECULAR GLARE SWEEP */}
        {glare && (
          <motion.div
            style={{
              background: `radial-gradient(circle 320px at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 45%, transparent 75%)`,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] transition-opacity [transform:translateZ(1px)]"
            aria-hidden="true"
          />
        )}

        {/* HOLOGRAPHIC RIM HIGHLIGHT */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-[inherit] border transition-opacity duration-300 [transform:translateZ(2px)] ${
            isHovered ? 'border-[#7bb0ed]/40 shadow-[inset_0_0_20px_rgba(74,126,184,0.15)]' : 'border-transparent'
          }`}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}

// Sub-component to elevate nested elements along the Z-axis in 3D space
interface ThreeDLayerProps {
  children: React.ReactNode;
  depth?: number; // Z-axis translation in pixels (e.g. 20, 40, 60)
  className?: string;
}

export function ThreeDLayer({ children, depth = 30, className = '' }: ThreeDLayerProps) {
  return (
    <div
      style={{
        transform: `translateZ(${depth}px)`,
        transformStyle: 'preserve-3d',
      }}
      className={`relative [transform-style:preserve-3d] transition-transform duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export default ThreeDCard;
