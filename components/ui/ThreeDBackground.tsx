'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function ThreeDBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 3D PERSPECTIVE HORIZON GRID (Tilted 3D Floor Effect) */}
      <div className="absolute inset-0 [perspective:800px] opacity-25">
        <div
          className="absolute inset-x-0 bottom-0 h-[70vh] origin-bottom [transform:rotateX(62deg)]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(74, 126, 184, 0.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(74, 126, 184, 0.18) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0.5) 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0.5) 60%, transparent 100%)',
          }}
        />
      </div>

      {/* AMBIENT 3D VOLUMETRIC LIGHT CONES */}
      <div className="absolute -top-40 left-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#4A7EB8]/10 via-[#2563eb]/5 to-transparent blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-purple-600/8 via-[#4A7EB8]/5 to-transparent blur-3xl" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-600/6 via-blue-900/5 to-transparent blur-3xl" />

      {/* FLOATING 3D SPATIAL PARTICLES */}
      <motion.div
        animate={{
          y: [-15, 20, -15],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-[#7bb0ed] shadow-[0_0_12px_#7bb0ed]"
      />
      <motion.div
        animate={{
          y: [20, -20, 20],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
      />
      <motion.div
        animate={{
          y: [-20, 15, -20],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc]"
      />
    </div>
  );
}

export default ThreeDBackground;
