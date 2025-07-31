'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

// Framer Motion variants
const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
};

// Glowing Divider Component
const DividerGlow = () => (
  <motion.div
    className="w-full h-[4px] bg-gradient-to-r from-transparent via-purple-700 to-transparent my-14 relative overflow-hidden rounded-full"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 1.2, ease: "easeInOut" }}
  >
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/60 to-transparent blur-lg animate-pulse-glow"></span>
  </motion.div>
);

const Footer = () => {
  const [year] = useState(new Date().getFullYear());
  const [particleStyles, setParticleStyles] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
    const generateParticleStyles = () => {
      const styles = [];
      for (let i = 0; i < 50; i++) {
        styles.push({
          width: `${Math.random() * 6 + 2}px`,
          height: `${Math.random() * 6 + 2}px`,
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          animationDuration: `${Math.random() * 12 + 6}s`,
          animationDelay: `${Math.random() * 4}s`,
        });
      }
      setParticleStyles(styles);
    };

    if (typeof window !== 'undefined') {
      generateParticleStyles();
    }
  }, []);

  return (
    <motion.footer
      className="relative bg-gradient-to-br from-[#0a0f1c] via-[#1a1e3a] to-[#2a1a4a] text-white px-8 py-20 overflow-hidden border-t-4 border-purple-800/30 shadow-[0_-10px_40px_rgba(162,89,255,0.25)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={footerVariants}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(162,89,255,0.2),_transparent_70%)] opacity-60"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700/15 blur-4xl rounded-full animate-float-slow -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-700/15 blur-4xl rounded-full animate-float-alt-slow translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="particles-container">
          {particleStyles.map((style, i) => (
            <div
              key={i}
              className={`particle particle-variant-${i % 5}`}
              style={{
                width: style.width,
                height: style.height,
                left: style.left,
                top: style.top,
                animationDuration: style.animationDuration,
                animationDelay: style.animationDelay,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center text-center md:text-left">
        {/* Left - Name and Role */}
        <motion.div className="space-y-4" variants={sectionVariants}>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
            whileHover={{ scale: 1.04, textShadow: "0 0 20px rgba(162,89,255,0.6)" }}
            transition={{ type: "spring", stiffness: 400 }}
            data-aos="fade-right"
          >
            Risna Ahmad.A
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 font-medium tracking-wide"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            Frontend Dev • UI Visionary
          </motion.p>
        </motion.div>

        {/* Right - Manifesto */}
        <motion.div className="text-center md:text-right space-y-4" variants={sectionVariants}>
          <motion.p
            className="text-lg md:text-xl italic text-gray-100 font-light tracking-tight"
            whileHover={{ x: -5, color: "#a855f7" }}
            transition={{ duration: 0.2 }}
            data-aos="fade-left"
          >
            "Designing tomorrow’s interfaces with today’s passion."
          </motion.p>
          <motion.p
            className="text-sm md:text-base text-gray-300"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            Let’s build the future together!
          </motion.p>
        </motion.div>
      </div>

      {/* Divider Glow Line */}
      <DividerGlow />

      {/* Copyright */}
      <motion.p
        className="text-center text-sm md:text-base text-gray-300 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        data-aos="fade-up"
      >
        © {year} Risna Ahmad Apriyansyah. Powered by Next.js & Tailwind CSS.
      </motion.p>

      {/* CSS for animations and particles */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(25px); }
        }
        @keyframes float-alt-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(25px) translateX(-25px); }
        }
        .animate-float-slow {
          animation: float-slow 18s ease-in-out infinite;
        }
        .animate-float-alt-slow {
          animation: float-alt-slow 20s ease-in-out infinite 1.5s;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scaleX(0.85); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          background: radial-gradient(circle, rgba(162, 89, 255, 0.4), transparent);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(162, 89, 255, 0.3);
          animation: particle-move linear infinite;
          opacity: 0;
        }

        .particle-variant-0 { animation-name: particle-move-0; }
        .particle-variant-1 { animation-name: particle-move-1; }
        .particle-variant-2 { animation-name: particle-move-2; }
        .particle-variant-3 { animation-name: particle-move-3; }
        .particle-variant-4 { animation-name: particle-move-4; }

        @keyframes particle-move-0 {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 0.9; }
          100% { transform: translate(calc(var(--particle-dest-x, -250) * 1px), calc(var(--particle-dest-y, -250) * 1px)); opacity: 0; }
        }
        @keyframes particle-move-1 {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 0.9; }
          100% { transform: translate(calc(var(--particle-dest-x, 250) * 1px), calc(var(--particle-dest-y, -250) * 1px)); opacity: 0; }
        }
        @keyframes particle-move-2 {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 0.9; }
          100% { transform: translate(calc(var(--particle-dest-x, -250) * 1px), calc(var(--particle-dest-y, 250) * 1px)); opacity: 0; }
        }
        @keyframes particle-move-3 {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 0.9; }
          100% { transform: translate(calc(var(--particle-dest-x, 250) * 1px), calc(var(--particle-dest-y, 250) * 1px)); opacity: 0; }
        }
        @keyframes particle-move-4 {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 0.9; }
          100% { transform: translate(calc(var(--particle-dest-x, 0) * 1px), calc(var(--particle-dest-y, -300) * 1px)); opacity: 0; }
        }
      `}</style>
    </motion.footer>
  );
};

export default Footer;