'use client'
import { useEffect, useState, useRef } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// --- Project Data ---
const PROJECTS = [
  {
    id: 1,
    title: 'Aplikasi CRUD Perpustakaan',
    description: 'Aplikasi berbasis web yang dibuat dengan PHP dan CSS untuk mengelola data buku, anggota, dan transaksi peminjaman. Termasuk fitur otentikasi pengguna dan laporan.',
    image: '/perpus.png',
    link: 'https://github.com/risna-code/apk_perpustakaan',
    tags: ['PHP', 'CSS', 'MySQL', 'JavaScript'],
    github: 'https://github.com/risna-code/apk_perpustakaan',
  },
  {
    id: 2,
    title: 'Website Login Modern',
    description: 'Website login modern dengan desain responsif. Dibuat menggunakan PHP dan Tailwind CSS, dilengkapi validasi form dan integrasi database.',
    image: '/login.png',
    link: 'https://github.com/risna-code/login',
    tags: ['PHP', 'Tailwind CSS', 'Responsive', 'MySQL'],
    github: 'https://github.com/risna-code/login',
  },
  {
    id: 3,
    title: 'Website Portofolio Responsif',
    description: 'Website landing page portofolio responsif dengan Tailwind CSS, menampilkan proyek-proyek dan informasi kontak pribadi.',
    image: '/porto.png',
    link: 'https://github.com/risna-code/web_porto_Tanlwin',
    tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
    github: 'https://github.com/risna-code/web_porto_Tanlwin.git',
  },
]

// --- Animation Variants ---
const cardVariants = {
  active: {
    opacity: 1,
    scale: 1,
    y: 0,
    boxShadow: '0 12px 30px rgba(0, 240, 255, 0.3)',
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
  inactive: {
    opacity: 0.7,
    scale: 0.95,
    y: 10,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: '0 15px 40px rgba(0, 240, 255, 0.4)',
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
  tap: { scale: 0.98 },
}

const tagVariants = {
  initial: { opacity: 0, y: 5 },
  animate: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, type: 'spring', stiffness: 250 } }),
}

const buttonVariants = {
  hover: { scale: 1.1, boxShadow: '0 6px 20px rgba(0, 240, 255, 0.4)', transition: { type: 'spring', stiffness: 300 } },
  tap: { scale: 0.95 },
}

const textVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  hover: { scale: 1.02, textShadow: '0 0 8px rgba(0, 240, 255, 0.8)', transition: { duration: 0.3 } },
}

// --- Project Card Component ---
const ProjectCard = ({ project, isActive }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    setImageLoaded(false)
    setImageError(false)
  }, [project])

  if (!project) {
    return (
      <div className="relative bg-[#1a1a3b] rounded-3xl overflow-hidden shadow-2xl border border-[#00f0ff]/30 h-full flex flex-col items-center justify-center p-4 text-center">
        <p className="text-gray-400 text-lg font-medium">Proyek tidak tersedia.</p>
        <p className="text-gray-500 text-sm mt-2">Silakan periksa daftar proyek atau kembali nanti.</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="inactive"
      animate={isActive ? 'active' : 'inactive'}
      whileHover="hover"
      whileTap="tap"
      className={`relative bg-[#1a1a3b]/80 rounded-3xl overflow-hidden border-2 ${
        isActive ? 'border-[#00f0ff]/80' : 'border-[#00f0ff]/30'
      } backdrop-blur-lg h-full flex flex-col cursor-pointer`}
      data-aos={isActive ? 'zoom-in' : ''}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a3b]/90 via-[#1a1a3b]/50 to-transparent z-10 pointer-events-none"></div>

      <div className="relative w-full h-48 md:h-56 overflow-hidden bg-[#1a1a3b]">
        {(!imageLoaded || imageError) && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a3b] to-[#0a0e17] animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-center">
              {imageError ? (
                <p className="text-sm font-medium text-[#b3e5fc]/90">Gagal memuat gambar</p>
              ) : (
                <>
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00f0ff] mb-3"></div>
                  <p className="text-sm font-medium text-[#b3e5fc]/90">Memuat gambar...</p>
                </>
              )}
            </div>
          </div>
        )}

        {project.image && !imageError && (
          <Image
            src={project.image}
            alt={project.title || 'Gambar Proyek'}
            fill
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            priority={isActive}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </div>

      <div className="p-4 md:p-6 flex-grow flex flex-col z-20 overflow-hidden">
        <div className="flex justify-between items-start gap-4 flex-grow">
          <div className="flex-grow">
            <motion.h3
              variants={textVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className={`text-lg md:text-xl font-bold flex items-center gap-2 ${
                isActive ? 'text-[#00f0ff]' : 'text-white'
              } drop-shadow-lg tracking-wide`}
            >
              {project.title || 'Judul Proyek'}
              {isActive && project.link && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 250 }}
                >
                  <FaExternalLinkAlt className="text-sm text-[#00f0ff]/80" />
                </motion.span>
              )}
            </motion.h3>

            <motion.p
              variants={textVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className={`text-[#b3e5fc]/90 mt-2 text-sm md:text-base ${
                isActive ? 'opacity-100' : 'opacity-70'
              } leading-relaxed tracking-wide`}
            >
              {project.description || 'Deskripsi proyek tidak tersedia.'}
            </motion.p>

            <div className="mt-3 flex gap-2 flex-wrap">
              {(project.tags || []).map((tag, tagIndex) => (
                <motion.span
                  key={tagIndex}
                  variants={tagVariants}
                  initial="initial"
                  animate="animate"
                  custom={tagIndex}
                  className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-[#00f0ff]/30 ${
                    isActive ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'bg-white/10 text-gray-300'
                  } transition-colors duration-300`}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {isActive && project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#00f0ff] text-white shadow-xl border border-[#00f0ff]/50 backdrop-blur-sm flex-shrink-0"
              aria-label={`Kunjungi proyek ${project.title}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <FaExternalLinkAlt className="text-sm md:text-base" />
            </motion.a>
          )}
        </div>

        {isActive && project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="mt-4 inline-flex items-center gap-2 text-sm text-[#b3e5fc]/90 hover:text-[#00f0ff] transition-colors group"
            aria-label="Lihat di GitHub"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 250 }}
          >
            <FaGithub className="text-lg group-hover:text-[#00f0ff] transition-colors" />
            <span className="group-hover:underline">Lihat di GitHub</span>
          </motion.a>
        )}
      </div>
    </motion.div>
  )
}

// --- Main Project Section Component ---
export default function ProjectSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoSlide, setAutoSlide] = useState(true)
  const [windowHeight, setWindowHeight] = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    })

    let interval
    if (autoSlide && PROJECTS.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % PROJECTS.length)
      }, 5000)
    }

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
        setAutoSlide(false)
      } else if (e.key === 'ArrowRight') {
        nextSlide()
        setAutoSlide(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [autoSlide])

  const nextSlide = () => {
    if (PROJECTS.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % PROJECTS.length)
      setAutoSlide(false)
    }
  }

  const prevSlide = () => {
    if (PROJECTS.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)
      setAutoSlide(false)
    }
  }

  const goToSlide = (index) => {
    if (index >= 0 && index < PROJECTS.length) {
      setCurrentIndex(index)
      setAutoSlide(false)
    }
  }

  const calculateCardHeight = () => {
    if (windowHeight < 600) return 360
    if (windowHeight < 700) return 400
    if (windowHeight < 800) return 450
    if (windowHeight < 900) return 500
    return 540
  }

  if (PROJECTS.length === 0) {
    return (
      <section
        id="projects"
        className="relative px-4 md:px-8 py-12 flex items-center justify-center min-h-[80vh] bg-[#1a1a3b] font-['Poppins','sans-serif']"
        style={{
          background: `
            linear-gradient(to bottom, #1a1a3b 0%, #0a0e17 100%),
            linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(0, 240, 255, 0.08) 100%)
          `,
        }}
      >
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-[#00f0ff] mb-3 tracking-wide">Proyek Saya</h2>
          <p className="text-[#b3e5fc]/90 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Belum ada proyek yang tersedia saat ini.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="projects"
      className="relative px-4 md:px-8 py-8 md:py-12 min-h-[80vh] flex flex-col justify-center overflow-hidden bg-[#1a1a3b] font-['Poppins','sans-serif']"
      style={{
        background: `
          linear-gradient(to bottom, #1a1a3b 0%, #0a0e17 100%),
          linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(0, 240, 255, 0.08) 100%),
          radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.12) 0%, transparent 50%)
        `,
        backgroundSize: 'auto, auto, 200% 200%',
        backgroundPosition: '0 0, 0 0, 50% 50%',
      }}
    >
      <div className="relative z-10 container mx-auto flex flex-col items-center">
        <div className="text-center mb-8 md:mb-10" data-aos="fade-down">
          <motion.h2
            variants={textVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#00f0ff] mb-3 tracking-wide leading-tight"
            style={{
              backgroundSize: '300% 100%',
              animation: 'textGlowSlide 7s ease-in-out infinite',
            }}
          >
            Karya Pilihan Saya
          </motion.h2>

          <motion.p
            variants={textVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="text-[#b3e5fc]/90 max-w-2xl mx-auto text-sm md:text-base leading-relaxed tracking-wide"
          >
            Jelajahi portofolio proyek saya yang menunjukkan kemampuan dan kreativitas dalam pengembangan web.
          </motion.p>
        </div>

        <div
          className="flex items-center justify-center mb-6 md:mb-8 w-full"
          ref={sliderRef}
          onMouseEnter={() => setAutoSlide(false)}
          onMouseLeave={() => setAutoSlide(true)}
        >
          <div
            className="relative w-full max-w-3xl lg:max-w-4xl"
            style={{ height: `${calculateCardHeight()}px` }}
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="absolute left-0 md:-left-8 top-1/2 transform -translate-y-1/2 z-30 bg-[#1a1a3b]/70 hover:bg-[#00f0ff]/30 rounded-full p-2.5 md:p-3 shadow-xl border border-[#00f0ff]/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/70"
              onClick={prevSlide}
              aria-label="Proyek sebelumnya"
            >
              <FaChevronLeft className="text-sm md:text-lg text-[#b3e5fc]" />
            </motion.button>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="absolute right-0 md:-right-8 top-1/2 transform -translate-y-1/2 z-30 bg-[#1a1a3b]/70 hover:bg-[#00f0ff]/30 rounded-full p-2.5 md:p-3 shadow-xl border border-[#00f0ff]/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/70"
              onClick={nextSlide}
              aria-label="Proyek berikutnya"
            >
              <FaChevronRight className="text-sm md:text-lg text-[#b3e5fc]" />
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 25 }}
                className="absolute inset-0 h-full w-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 200
                  if (swipe) {
                    if (offset.x > 0) {
                      prevSlide()
                    } else {
                      nextSlide()
                    }
                  }
                }}
              >
                <ProjectCard project={PROJECTS[currentIndex]} isActive={true} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6">
          <div className="flex space-x-2 md:space-x-3 mb-4">
            {PROJECTS.map((project, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/70 ${
                  index === currentIndex
                    ? 'bg-[#00f0ff] w-6 h-2 md:w-8 md:h-2.5'
                    : 'bg-[#1a1a3b]/50 w-2 h-2 md:w-2.5 md:h-2.5 hover:bg-[#00f0ff]/30 border border-[#00f0ff]/30'
                }`}
                aria-label={`Ke proyek ${project.title}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
                title={project.title}
              />
            ))}
          </div>

          <motion.a
            href="https://github.com/risna-code"
            target="_blank"
            rel="noopener noreferrer"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm md:text-base font-semibold text-white bg-[#00f0ff] rounded-full shadow-lg border border-[#00f0ff]/50 backdrop-blur-sm hover:shadow-[#00f0ff]/40 transform whitespace-nowrap"
            aria-label="Lihat semua proyek di GitHub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            <FaGithub className="text-lg" />
            <span>Lihat Semua Proyek di GitHub</span>
          </motion.a>
        </div>
      </div>

      <style jsx>{`
        @keyframes textGlowSlide {
          0% { background-position: 0% 50%; }
          50% { background-position: 300% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </section>
  )
}