'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const headerRef = useRef(null)
  
  const { scrollY } = useScroll()
  const headerHeight = useTransform(scrollY, [0, 100], [80, 60])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9])
  const logoOpacity = useTransform(scrollY, [0, 50], [1, 0.9])
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10)
  })

  // Intersection Observer untuk section aktif
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setActiveSection(entry.target.id)
        }
      })
    }, { threshold: [0.1, 0.5, 1] })

    sections.forEach(section => observer.observe(section))
    
    return () => sections.forEach(section => observer.unobserve(section))
  }, [])

  const navItems = [
    { id: 'home', name: 'Beranda' },
    { id: 'about', name: 'Tentang' },
    { id: 'projects', name: 'Proyek' },
  ]

  // Variants untuk animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: { 
      scale: 1.05,
      color: '#22d3ee',
      textShadow: '0 0 8px rgba(34, 211, 238, 0.7)',
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: { scale: 0.95 }
  }

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    }
  }

  const menuVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  }

  // Animasi partikel untuk logo
  const Particle = ({ size, x, y, delay }) => (
    <motion.span
      className="absolute rounded-full bg-cyan-400"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        x: [`${x}%`, `${x + 50}%`],
        y: [`${y}%`, `${y - 50}%`],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        delay,
        ease: "easeOut"
      }}
    />
  )

  return (
    <motion.header
      ref={headerRef}
      style={{ height: headerHeight }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      className={`fixed top-0 w-full z-50 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-xl' 
          : 'bg-gray-900/80'
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-full">
          {/* Logo dengan efek partikel canggih */}
          <motion.div 
            className="flex items-center group relative"
            style={{ scale: logoScale, opacity: logoOpacity }}
            onHoverStart={() => setIsLogoHovered(true)}
            onHoverEnd={() => setIsLogoHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              PORTOFOLIO
            </motion.h1>
            
            <motion.div 
              className="ml-2 flex space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-cyan-400"
                  animate={{
                    y: [0, -3, 0],
                    opacity: [0.6, 1, 0.6],
                    scale: isLogoHovered ? [1, 1.5, 1] : 1
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
            
            {/* Efek partikel saat hover logo */}
            <AnimatePresence>
              {isLogoHovered && (
                <>
                  <Particle size={4} x={20} y={40} delay={0.1} />
                  <Particle size={3} x={40} y={60} delay={0.3} />
                  <Particle size={5} x={60} y={30} delay={0.5} />
                  <Particle size={2} x={80} y={50} delay={0.7} />
                  <Particle size={4} x={30} y={20} delay={0.2} />
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Desktop Navigation dengan animasi lebih halus */}
          <motion.nav 
            className="hidden md:flex items-center gap-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                className="relative"
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <a
                  href={`#${item.id}`}
                  className={`relative px-4 py-2 text-sm font-medium block ${
                    activeSection === item.id 
                      ? 'text-cyan-400' 
                      : 'text-gray-300 hover:text-white'
                  } transition-colors`}
                >
                  {item.name}
                </a>
                {activeSection === item.id && (
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 rounded-full"
                    layoutId="activeIndicator"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 400, 
                      damping: 25,
                      duration: 0.4
                    }}
                  />
                )}
              </motion.div>
            ))}
          </motion.nav>

          {/* Mobile Menu Button dengan animasi morphing */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 -mr-2 rounded-lg focus:outline-none relative z-60"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <motion.div 
              className="w-8 h-8 relative"
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="absolute top-3 left-0 w-full h-0.5 bg-white rounded-full"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 0 }
                }}
              />
              <motion.span
                className="absolute top-3 left-0 w-full h-0.5 bg-white rounded-full"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0, rotate: -45 }
                }}
              />
              <motion.span
                className="absolute top-3 left-0 w-full h-0.5 bg-white rounded-full"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: 0 }
                }}
              />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu dengan animasi yang lebih canggih */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden overflow-hidden bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-xl"
          >
            <motion.div 
              className="px-6 py-6 space-y-6"
              variants={containerVariants}
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block text-xl font-medium relative pl-8 ${
                    activeSection === item.id 
                      ? 'text-cyan-400' 
                      : 'text-gray-200'
                  }`}
                  variants={mobileItemVariants}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ 
                    x: 10,
                    color: '#22d3ee',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400"
                    animate={{ 
                      scale: activeSection === item.id ? [1, 1.4, 1] : 1,
                      boxShadow: activeSection === item.id 
                        ? '0 0 10px rgba(34, 211, 238, 0.8)' 
                        : 'none'
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                  />
                  {item.name}
                  
                  {activeSection === item.id && (
                    <motion.span 
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 4, opacity: 0 }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                      style={{ backgroundColor: '#22d3ee' }}
                    />
                  )}
                </motion.a>
              ))}
              
              <motion.div 
                className="pt-4 mt-4 border-t border-gray-700"
                variants={mobileItemVariants}
              >
                <motion.button
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-lg font-bold text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Hubungi Saya
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}