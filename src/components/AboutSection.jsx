
'use client'
import { useState, memo, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaGithub,
  FaInstagram,
  FaTiktok,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaWhatsapp,
  FaCode,
  FaUsers,
  FaLightbulb,
} from 'react-icons/fa'
import { SiTailwindcss, SiNextdotjs, SiFigma, SiGmail } from 'react-icons/si'

// Global Constants for UI Consistency
const ICON_BASE_SIZE = 'text-3xl sm:text-4xl'
const ICON_TAB_SIZE = 'text-base sm:text-lg'
const FONT_SIZE_SM_TO_MD = 'text-sm md:text-base'
const FONT_SIZE_XS_TO_SM = 'text-xs sm:text-sm'
const TRANSITION_SPRING_FAST = { type: 'spring', stiffness: 300, damping: 20 }
const TRANSITION_SPRING_MEDIUM = { type: 'spring', stiffness: 200, damping: 20 }

// Framer Motion Variants
const fadeInDown = {
  hidden: { y: -30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, type: 'spring', bounce: 0.5 } },
}

const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, type: 'spring', bounce: 0.5 } },
}

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6, type: 'spring', damping: 15 } },
}

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

const tabButtonVariants = {
  rest: { scale: 1, boxShadow: 'none', backgroundColor: 'rgba(0, 255, 255, 0.1)' },
  hover: { scale: 1.05, backgroundColor: 'rgba(0, 255, 255, 0.2)', transition: TRANSITION_SPRING_FAST },
  tap: { scale: 0.95 },
  active: (description) => ({
    scale: 1.02,
    backgroundColor: description.activeBgValue,
    color: description.activeTextColorValue,
    boxShadow: `0 0 15px ${description.shadowColor}80`,
    transition: { scale: { duration: 0.3 }, backgroundColor: { duration: 0.3 }, color: { duration: 0.3 }, boxShadow: { duration: 0.3 } },
  }),
}

const tabContentVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.3, ease: 'easeIn' } },
}

const profileCardVariants = (cardState) => ({
  transform: `perspective(1000px) rotateX(${cardState.rotateX}deg) rotateY(${cardState.rotateY}deg) scale3d(1, 1, 1)`,
  boxShadow: '0 25px 50px rgba(0, 255, 255, 0.3)',
  transition: { type: 'spring', stiffness: 100, damping: 12, mass: 0.8 },
})

// Memoized Child Components
const SkillItem = memo(({ skill }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative flex min-w-[90px] flex-col items-center p-2 sm:min-w-[100px] sm:p-3 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.15, y: -8, transition: TRANSITION_SPRING_FAST }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative z-10 rounded-full bg-[#0a0e17]/60 p-3 backdrop-blur-md border border-[#00f0ff]/40 shadow-[0_0_15px_#00f0ff44]">
        {skill.icon}
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute bottom-0 font-medium ${FONT_SIZE_XS_TO_SM} text-[#00f0ff] whitespace-nowrap bg-[#0a0e17]/90 backdrop-blur-md px-2 py-1 rounded-full shadow-[0_0_10px_#00f0ff66]`}
          >
            {skill.name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

SkillItem.displayName = 'SkillItem'

const SocialLink = memo(({ social, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      className="relative flex flex-col items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
      variants={textVariants}
    >
      <motion.a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${social.bg} ${social.color} flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-lg shadow-lg backdrop-blur-md border border-[#00f0ff]/40 z-10`}
        whileHover={{
          y: -6,
          scale: 1.2,
          boxShadow: `0 0 25px ${social.color.replace('text-', '')}80`,
          transition: TRANSITION_SPRING_FAST,
        }}
        whileTap={{ scale: 0.9 }}
        aria-label={`Link to ${social.name}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {social.icon}
      </motion.a>
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-full mt-2 font-medium text-xs text-[#00f0ff] whitespace-nowrap bg-[#0a0e17]/90 backdrop-blur-md px-2 py-1 rounded-full shadow-[0_0_10px_#00f0ff66]"
          >
            {social.name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

SocialLink.displayName = 'SocialLink'

const TabButton = memo(({ tab, activeTab, descriptions, setActiveTab, index }) => {
  const isActive = activeTab === tab.id
  const description = descriptions[tab.id]

  return (
    <motion.button
      onClick={() => setActiveTab(tab.id)}
      className={`group relative flex cursor-pointer items-center overflow-hidden rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 backdrop-blur-md border border-[#00f0ff]/40
        ${isActive ? `${description.activeBg} ${description.activeColorClass}` : 'bg-[#0a0e17]/20 text-[#00f0ff] hover:bg-[#0a0e17]/30'}`}
      custom={description}
      variants={tabButtonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      animate={activeTab === tab.id ? 'active' : 'rest'}
      aria-label={`Switch to ${tab.label} tab`}
      aria-selected={isActive}
      role="tab"
      initial="hidden"
      animate="visible"
      variants={textVariants}
      custom={index * 0.1 + 0.2}
    >
      {tab.icon}
      <motion.span className="ml-2" initial="hidden" animate="visible" variants={textVariants}>
        {tab.label}
      </motion.span>
    </motion.button>
  )
})

TabButton.displayName = 'TabButton'

const Badge = memo(({ badge, index }) => (
  <motion.div
    className={`cursor-default rounded-xl px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-md border border-[#00f0ff]/40 ${badge.color}`}
    aria-label={badge.name}
    whileHover={{
      scale: 1.1,
      y: -4,
      boxShadow: '0 6px 16px rgba(0, 255, 255, 0.3)',
      transition: TRANSITION_SPRING_FAST,
    }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{
      delay: index * 0.08,
      duration: 0.5,
      type: 'spring',
      damping: 15,
    }}
  >
    {badge.name}
  </motion.div>
))

Badge.displayName = 'Badge'

// Main AboutSection Component
export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('developer')
  const [cardState, setCardState] = useState({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
    glowOpacity: 0,
  })

  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget
    const box = card.getBoundingClientRect()
    const x = e.clientX - box.left
    const y = e.clientY - box.top
    const centerX = box.width / 2
    const centerY = box.height / 2
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15
    const glowX = (x / box.width) * 100
    const glowY = (y / box.height) * 100

    setCardState({
      rotateX,
      rotateY,
      glowX,
      glowY,
      glowOpacity: 0.5,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setCardState((prevState) => ({
      ...prevState,
      rotateX: 0,
      rotateY: 0,
      glowOpacity: 0,
    }))
  }, [])

  // Memoized data structures
  const skills = useMemo(
    () => [
      {
        name: 'HTML5',
        icon: <FaHtml5 className={`text-[#ff4d4f] ${ICON_BASE_SIZE}`} />,
        desc: 'Struktur Website',
        category: 'Frontend',
      },
      {
        name: 'CSS3',
        icon: <FaCss3Alt className={`text-[#00f0ff] ${ICON_BASE_SIZE}`} />,
        desc: 'Styling Modern',
        category: 'Frontend',
      },
      {
        name: 'JavaScript',
        icon: <FaJsSquare className={`text-[#f0db4f] ${ICON_BASE_SIZE}`} />,
        desc: 'Interaktivitas',
        category: 'Frontend',
      },
      {
        name: 'React.js',
        icon: <FaReact className={`text-[#00f0ff] ${ICON_BASE_SIZE}`} />,
        desc: 'Library UI',
        category: 'Frontend',
      },
      {
        name: 'Next.js',
        icon: <SiNextdotjs className={`text-[#ffffff] ${ICON_BASE_SIZE}`} />,
        desc: 'Framework Fullstack',
        category: 'Fullstack',
      },
      {
        name: 'Tailwind CSS',
        icon: <SiTailwindcss className={`text-[#00f0ff] ${ICON_BASE_SIZE}`} />,
        desc: 'Utility-first CSS',
        category: 'Styling',
      },
      {
        name: 'Figma',
        icon: <SiFigma className={`text-[#ff2a6d] ${ICON_BASE_SIZE}`} />,
        desc: 'Desain UI/UX',
        category: 'Design',
      },
    ],
    [],
  )

  const doubleSkills = useMemo(() => [...skills, ...skills], [skills])

  const socialLinks = useMemo(
  () => [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      href: 'https://github.com/risna-code',
      color: 'text-[#ffffff]',
      bg: 'bg-[#0a0e17]/20',
      hoverShadow: '0 0 25px rgba(0, 255, 255, 0.8)',
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      href: 'https://www.instagram.com/risna_ahmadd?igsh=MTd3aDZnaTVycW1pdQ==',
      color: 'text-[#ff2a6d]',
      bg: 'bg-[#0a0e17]/20',
      hoverShadow: '0 0 25px rgba(255, 42, 109, 0.8)',
    },
    {
      name: 'TikTok',
      icon: <FaTiktok />,
      href: 'https://tiktok.com/@risnaahmad',
      color: 'text-[#00f0ff]',
      bg: 'bg-[#0a0e17]/20',
      hoverShadow: '0 0 25px rgba(0, 240, 255, 0.8)',
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      href: 'https://wa.me/62895391095526',
      color: 'text-[#25d366]',
      bg: 'bg-[#0a0e17]/20',
      hoverShadow: '0 0 25px rgba(37, 211, 102, 0.8)',
    },
    {
      name: 'Gmail',
      icon: <SiGmail />,
      href: 'mailto:risnaahmad727@gmail.com?subject=Halo%20Risna&body=Saya%20tertarik%20dengan%20portofolio%20Anda.',
      color: 'text-[#ff2a6d]',
      bg: 'bg-[#0a0e17]/20',
      hoverShadow: '0 0 25px rgba(255, 42, 109, 0.8)',
    },
  ],
  [],
)


  const tabs = useMemo(
    () => [
      { id: 'developer', icon: <FaCode className={ICON_TAB_SIZE} />, label: 'Developer' },
      { id: 'leader', icon: <FaUsers className={ICON_TAB_SIZE} />, label: 'Leader' },
      { id: 'values', icon: <FaLightbulb className={ICON_TAB_SIZE} />, label: 'Values' },
    ],
    [],
  )

  const descriptions = useMemo(
    () => ({
      developer: {
        title: 'Front-End Developer',
        highlight: 'HTML, CSS, JavaScript, React/Next.js',
        content: 'Saya membangun pengalaman pengguna yang intuitif dan menarik dengan struktur kode yang rapi dan efisien, fokus pada performa dan skalabilitas.',
        color: 'text-[#00f0ff]',
        activeColorClass: 'text-[#ffffff]',
        bg: 'bg-[#00f0ff]/10',
        activeBg: 'bg-gradient-to-r from-[#00f0ff] to-[#0077b6]',
        activeBgValue: 'linear-gradient(to right, #00f0ff, #0077b6)',
        activeTextColorValue: 'rgb(255, 255, 255)',
        shadowColor: 'rgb(0, 240, 255)',
      },
      leader: {
        title: 'Community Leader',
        highlight: 'Ketua Karang Taruna & Remaja Masjid',
        content: 'Berpengalaman dalam mengorganisasi kegiatan sosial dan keagamaan, serta membina generasi muda dengan pendekatan yang inspiratif dan kolaboratif.',
        color: 'text-[#ff2a6d]',
        activeColorClass: 'text-[#ffffff]',
        bg: 'bg-[#ff2a6d]/10',
        activeBg: 'bg-gradient-to-r from-[#ff2a6d] to-[#c71585]',
        activeBgValue: 'linear-gradient(to right, #ff2a6d, #c71585)',
        activeTextColorValue: 'rgb(255, 255, 255)',
        shadowColor: 'rgb(255, 42, 109)',
      },
      values: {
        title: 'Core Values',
        highlight: 'Adaptif, Visioner, Kontributif',
        content: 'Saya memegang teguh nilai-nilai adaptif terhadap perubahan, visioner dalam melihat peluang, dan kontributif dalam setiap peran yang saya emban.',
        color: 'text-[#a100ff]',
        activeColorClass: 'text-[#ffffff]',
        bg: 'bg-[#a100ff]/10',
        activeBg: 'bg-gradient-to-r from-[#a100ff] to-[#6a0dad]',
        activeBgValue: 'linear-gradient(to right, #a100ff, #6a0dad)',
        activeTextColorValue: 'rgb(255, 255, 255)',
        shadowColor: 'rgb(161, 0, 255)',
      },
    }),
    [],
  )

  const badges = useMemo(
    () => [
      { name: 'Responsive Design', color: 'bg-[#00f0ff]/20 text-[#ffff]' },
      { name: 'UI/UX Driven', color: 'bg-[#ff2a6d]/20 text-[#fff]' },
      { name: 'Clean Code Principles', color: 'bg-[#a100ff]/20 text-#ffff]' },
      { name: 'Strong Leadership', color: 'bg-[#00f0ff]/20 text-[#fff]' },
      { name: 'Creative Problem Solving', color: 'bg-[#ff2a6d]/20 text-[#fff]' },
      { name: 'Community Engagement', color: 'bg-[#a100ff]/20 text-[#fff]' },
    ],
    [],
  )

  const currentDesc = descriptions[activeTab]

  return (
    <section
      id="about"
      className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-[#0a0e17] px-4 py-16 sm:min-h-screen sm:py-12 md:py-14"
      style={{
        background: `
          linear-gradient(to bottom, #0a0e17 0%, #1a1a3b 100%),
          linear-gradient(45deg, rgba(0, 240, 255, 0.1) 0%, rgba(255, 42, 109, 0.1) 50%, rgba(161, 0, 255, 0.1) 100%),
          url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect x="0" y="0" width="100" height="100" fill="none" stroke="rgba(0,240,255,0.05)" stroke-width="1"/><circle cx="10" cy="10" r="1" fill="rgba(0,240,255,0.5)"/><circle cx="90" cy="90" r="1" fill="rgba(255,42,109,0.5)"/><circle cx="50" cy="50" r="1.5" fill="rgba(161,0,255,0.5)"/></svg>') repeat,
          radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.15) 0%, transparent 40%)
        `,
        backgroundSize: 'auto, auto, 100px 100px, 150% 150%',
        backgroundPosition: '0 0, 0 0, 0 0, 50% 50%',
      }}
      aria-label="About Me Section"
    >
      {/* Main Content Wrapper */}
      <div className="relative z-10 mx-auto w-full max-w-6xl space-y-10 px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInDown}
        >
          <motion.h1
            className="text-4xl font-extrabold sm:text-5xl md:text-6xl relative inline-block leading-tight"
            style={{
              backgroundImage: `linear-gradient(90deg, #00f0ff, #ff2a6d, #a100ff)`,
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
            }}
            animate={{
              backgroundImage: [
                `linear-gradient(90deg, #00f0ff, #ff2a6d, #a100ff)`,
                `linear-gradient(90deg, #a100ff, #00f0ff, #ff2a6d)`,
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          >
            Tentang Saya
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#00f0ff] to-[#ff2a6d] rounded-full" />
          </motion.h1>
          <motion.p
            className={`mx-auto mt-4 max-w-2xl ${FONT_SIZE_SM_TO_MD} text-[#b3e5fc]`}
            variants={fadeInUp}
          >
            Perjalanan, keterampilan, dan nilai-nilai saya sebagai seorang pengembang dan pemimpin.
          </motion.p>
        </motion.div>

        {/* Content Tabs & Profile Card */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-center gap-8 md:gap-12">
          {/* Left Column: Tabs and Badges */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div
              className="mb-5 flex flex-wrap justify-center gap-3"
              role="tablist"
              aria-label="About Me Tabs"
            >
              {tabs.map((tab, index) => (
                <TabButton
                  key={tab.id}
                  tab={tab}
                  activeTab={activeTab}
                  descriptions={descriptions}
                  setActiveTab={setActiveTab}
                  index={index}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`rounded-2xl border-l-4 p-6 shadow-xl bg-[#0a0e17]/30 backdrop-blur-md border border-[#00f0ff]/40`}
                style={{ borderLeftColor: currentDesc.activeBgValue }}
                role="tabpanel"
                aria-labelledby={`${activeTab}-tab`}
                aria-live="polite"
              >
                <motion.h2
                  className={`mb-3 font-bold text-xl sm:text-2xl ${currentDesc.color}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                  id={`${activeTab}-tab`}
                >
                  {currentDesc.title}
                </motion.h2>
                <motion.p
                  className={`${FONT_SIZE_SM_TO_MD} mb-4 leading-relaxed text-[#b3e5fc]`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                >
                  {currentDesc.content}
                </motion.p>
                <motion.p
                  className={`font-semibold ${FONT_SIZE_SM_TO_MD} text-[#b3e5fc]`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                >
                  Fokus Utama: <span className={`${currentDesc.color} font-bold`}>{currentDesc.highlight}</span>
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6">
              <motion.h3
                className="text-lg font-semibold mb-4 text-center text-[#00f0ff]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.2}
                variants={textVariants}
                style={{
                  textShadow: '0 0 8px rgba(0, 240, 255, 0.6), 0 0 12px rgba(0, 240, 255, 0.4)',
                  fontWeight: 'bold',
                  letterSpacing: '0.05em',
                }}
              >
                Keahlian Utama
              </motion.h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Skills Badges">
                {badges.map((badge, index) => (
                  <Badge key={index} badge={badge} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Profile Card and Social Links */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.div
              className="relative group max-w-xs sm:max-w-sm w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100, delay: 0.5 } }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* Profile Card with 3D Effect */}
              <motion.div
                className="relative h-72 w-full rounded-3xl overflow-hidden shadow-2xl z-10 border border-[#00f0ff]/40"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                variants={profileCardVariants(cardState)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img src="/hero.png" alt="Risna Ahmad" className="w-full h-full object-cover" />
                </div>

                {/* Text Overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-[#0a0e17]/80 via-[#0a0e17]/40 to-transparent text-white"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <motion.h3
                    className="text-2xl sm:text-3xl font-extrabold mb-1 bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, #00f0ff, #ff2a6d)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: 'glitch 2s linear infinite',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    Risna Ahmad
                  </motion.h3>
                  <motion.p
                    className="font-semibold text-base sm:text-lg bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, #ff2a6d, #a100ff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    Front-End Developer
                  </motion.p>
                </div>

                {/* Glare effect */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                  <motion.div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at ${cardState.glowX}% ${cardState.glowY}%, rgba(0, 240, 255, 0.5), transparent 70%)`,
                      opacity: cardState.glowOpacity,
                    }}
                  />
                </div>
              </motion.div>

              {/* Contact Me Section */}
              <div className="mt-8 text-center w-full">
                <motion.h3
                  className="inline-block text-xl font-bold mb-4 bg-clip-text text-transparent relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    type: 'spring',
                    bounce: 0.4,
                  }}
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #00f0ff, #ff2a6d, #a100ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 8px rgba(0, 240, 255, 0.6), 0 0 12px rgba(255, 42, 109, 0.4)',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                  }}
                >
                  Hubungi Saya
                </motion.h3>
                <div className="flex justify-center gap-4 sm:gap-5" aria-label="Social Media Links">
                  {socialLinks.map((social, index) => (
                    <SocialLink key={index} social={social} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-extrabold mb-5 bg-clip-text text-transparent relative z-10"
              initial={{ y: -15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
              viewport={{ once: true, amount: 0.5 }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #00f0ff, #ff2a6d, #a100ff, #00f0ff)',
                backgroundSize: '300% 100%',
                animation: 'textGlowSlide 6s ease-in-out infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 8px rgba(0, 240, 255, 0.6), 0 0 12px rgba(255, 42, 109, 0.7), 0 0 16px rgba(161, 0, 255, 0.5)',
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 'bold',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Tech Stack
            </motion.h2>
            <motion.p
              className={`mx-auto max-w-2xl ${FONT_SIZE_SM_TO_MD} text-[#b3e5fc] mb-7`}
              initial={{ y: 15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Teknologi dan alat yang saya kuasai untuk membangun produk digital inovatif dan berkualitas.
            </motion.p>
          </motion.div>

          {/* Scrolling Skills Carousel */}
          <div className="relative overflow-hidden py-6 rounded-2xl shadow-inner bg-[#0a0e17]/30 backdrop-blur-md border border-[#00f0ff]/40">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0e17] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0e17] to-transparent" />
            <motion.div
              className="flex items-center"
              variants={{
                animate: {
                  x: ['0%', '-50%'],
                  transition: { duration: 50, repeat: Infinity, ease: 'linear' },
                },
              }}
              animate="animate"
            >
              {doubleSkills.map((skill, idx) => (
                <SkillItem key={`carousel-${skill.name}-${idx}`} skill={skill} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Global Gradient and Glitch Animation Keyframes */}
      <style jsx>{`
        @keyframes textGlowSlide {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          2% { transform: translate(2px, 1px) skew(1deg); }
          4% { transform: translate(-2px, -1px) skew(-1deg); }
          6% { transform: translate(0); }
          100% { transform: translate(0); }
        }
      `}</style>
    </section>
  )
}

