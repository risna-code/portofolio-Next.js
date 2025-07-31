
'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { IoMdDownload } from 'react-icons/io'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaFigma } from 'react-icons/fa'
import { SiNextdotjs, SiTailwindcss } from 'react-icons/si'

const FloatingTechIcons = ({ techIcons }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {techIcons.map((tech, i) => {
        const positions = [
          { left: '10%', top: '20%' },
          { left: '85%', top: '25%' },
          { left: '15%', top: '70%' },
          { left: '80%', top: '65%' },
          { left: '25%', top: '40%' },
          { left: '75%', top: '50%' },
          { left: '50%', top: '80%' },
          { left: '30%', top: '15%' },
          { left: '70%', top: '30%' }
        ]
        const { left, top } = positions[i % positions.length]
        return (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center"
            style={{ left, top, color: tech.color }}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{
              opacity: [0.5, 1, 0.5],
              y: [-15, 15, -15],
              scale: [0.9, 1.3, 0.9],
              rotate: [-3, 3, -3]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.5, 1]
            }}
            whileHover={{ scale: 1.4, boxShadow: `0 0 25px ${tech.color}99` }}
          >
            <motion.div
              className="p-4 rounded-2xl backdrop-blur-md bg-[#0a0e17]/60 border border-[#61DAFB]/40 shadow-[0_0_12px_#61DAFB33]"
              animate={{
                boxShadow: [
                  `0 0 8px ${tech.color}33`,
                  `0 0 20px ${tech.color}66`,
                  `0 0 8px ${tech.color}33`
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {tech.icon}
            </motion.div>
            <span className="text-sm mt-2 text-white font-mono bg-[#0a0e17]/80 px-3 py-1 rounded-lg shadow-[0_0_8px_#ffffff33]">
              {tech.name}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function HomeSection({ onNavigate }) {
  const [textIndex, setTextIndex] = useState(0)
  const containerRef = useRef(null)
  const btnRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const yStars = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacityStars = useTransform(scrollYProgress, [0, 1], [1, 0.5])

  const rotatingTexts = [
    'Front End Developer Visioner',
    'Arsitek Pengalaman Digital',
    'Spesialis UI Futuristik',
    'Pioneer Teknologi Web Modern',
    'Pengembang Solusi AI'
  ]

  const techIcons = [
    { icon: <FaHtml5 size={34} />, name: 'HTML5', color: '#E34F26' },
    { icon: <FaCss3Alt size={34} />, name: 'CSS3', color: '#1572B6' },
    { icon: <FaJs size={34} />, name: 'JavaScript', color: '#F7DF1E' },
    { icon: <FaReact size={34} />, name: 'React', color: '#61DAFB' },
    { icon: <SiNextdotjs size={34} />, name: 'Next.js', color: '#FFFFFF' },
    { icon: <SiTailwindcss size={34} />, name: 'Tailwind', color: '#38BDF8' },
    { icon: <FaFigma size={34} />, name: 'Figma', color: '#A259FF' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  useGSAP(() => {
    gsap.fromTo(
      btnRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'elastic.out(1, 0.7)',
        delay: 0.9
      }
    )
    gsap.to(containerRef.current, {
      backgroundPosition: '50% 100%',
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, [])

  const downloadCV = useCallback(() => {
    try {
      const link = document.createElement('a')
      link.href = '/Risna_Ahmad_Frontend_Developer.pdf'
      link.download = 'Risna_Ahmad_Frontend_Developer.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch {
      alert('Gagal mengunduh CV. Silakan coba lagi.')
    }
  }, [])

  const scrollToNext = () => {
    if (onNavigate) onNavigate('about')
    else window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen w-full overflow-hidden bg-[#0a0e17]">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: yBg,
          background: `
            linear-gradient(to bottom, #0a0e17 0%, #1a2744 100%),
            radial-gradient(circle at 20% 30%, rgba(97, 218, 251, 0.2) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(128, 0, 255, 0.2) 0%, transparent 40%)
          `,
          backgroundSize: '200% 200%',
          backgroundPosition: '50% 50%'
        }}
      />
      <motion.div
        className="absolute inset-0 z-5"
        style={{
          y: yStars,
          opacity: opacityStars,
          background: `
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.8)"/><circle cx="150" cy="200" r="1.5" fill="rgba(97,218,251,0.7)"/><circle cx="300" cy="100" r="2.5" fill="rgba(255,255,255,0.6)"/><circle cx="450" cy="300" r="1" fill="rgba(128,0,255,0.7)"/><circle cx="600" cy="150" r="2" fill="rgba(255,255,255,0.8)"/><circle cx="750" cy="250" r="1.5" fill="rgba(97,218,251,0.6)"/><circle cx="900" cy="350" r="2" fill="rgba(255,255,255,0.7)"/><circle cx="200" cy="400" r="1" fill="rgba(128,0,255,0.6)"/><circle cx="350" cy="500" r="2" fill="rgba(255,255,255,0.8)"/><circle cx="500" cy="600" r="1.5" fill="rgba(97,218,251,0.7)"/><circle cx="650" cy="700" r="2" fill="rgba(255,255,255,0.6)"/><circle cx="800" cy="800" r="1" fill="rgba(128,0,255,0.7)"/></svg>') repeat,
            radial-gradient(circle at 50% 50%, rgba(97, 218, 251, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '1000px 1000px, 200% 200%'
        }}
        animate={{
          backgroundPosition: ['0 0, 50% 50%', '1000px 1000px, 60% 60%'],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.5, 1]
          }}
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 30%),
              radial-gradient(circle at 70% 80%, rgba(128, 0, 255, 0.05) 0%, transparent 30%)
            `
          }}
        />
      </motion.div>

      <FloatingTechIcons techIcons={techIcons} />

      <motion.div
        className="relative z-20 container mx-auto px-6 py-32 text-center"
        style={{ y: yText }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61DAFB] via-[#8000ff] to-[#38BDF8] animate-pulse">
            Risna
          </span>{' '}
          <span className="text-white tracking-wide">Ahmad.A</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-lg md:text-xl text-gray-200 mb-10"
        >
          <span className="inline-block bg-[#0a0e17]/70 border border-[#8000ff]/50 px-5 py-3 rounded-xl backdrop-blur-md shadow-[0_0_15px_#8000ff33]">
            Membangun masa depan digital yang imersif
          </span>
        </motion.p>

        <motion.div
          className="text-xl md:text-3xl text-gray-100 h-16 md:h-20 mb-12 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={textIndex}
              className="inline-flex items-center text-[#61DAFB] font-mono px-8 py-4 rounded-xl bg-[#0a0e17]/80 border border-[#8000ff]/40 shadow-[0_0_18px_#8000ff33] backdrop-blur-md"
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div className="w-2 h-2 rounded-full bg-[#8000ff] mr-4 animate-pulse" />
              {rotatingTexts[textIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-center">
          <button
            ref={btnRef}
            onClick={downloadCV}
            className="
              relative group px-8 py-4 rounded-2xl font-semibold text-base
              bg-gradient-to-r from-[#61DAFB] via-[#8000ff] to-[#38BDF8]
              text-[#0a0e17] shadow-[0_0_20px_#8000ff66] hover:shadow-[0_0_45px_#8000ff99]
              transition-all duration-400 ease-in-out overflow-hidden
            "
          >
            <span className="relative z-10 flex items-center gap-2">
              <IoMdDownload size={20} />
              Download CV
            </span>
            <span
              className="
                absolute inset-0 bg-[#8000ff]/25
                -translate-x-full group-hover:translate-x-full
                transition-transform duration-600 ease-in-out
              "
            />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 50% 50%, #8000ff33 0%, transparent 70%)',
                  'radial-gradient(circle at 50% 50%, #61DAFB33 0%, transparent 70%)',
                  'radial-gradient(circle at 50% 50%, #8000ff33 0%, transparent 70%)'
                ]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            />
          </button>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        animate={{ y: [0, 12, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 rounded-full border-2 border-[#8000ff] flex justify-center shadow-[0_0_10px_#8000ff66]">
            <motion.div
              className="w-1.5 h-3 bg-[#8000ff] rounded-full mt-1.5"
              animate={{ y: [0, 6, 0], scaleY: [1, 1.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="text-xs text-[#8000ff] mt-2 font-mono tracking-wide">SCROLL</span>
        </div>
      </motion.div>
    </section>
  )
}