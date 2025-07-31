'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function FloatingParticles({ count = 15 }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: count }, () => ({
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 8 + 2}px`,
        height: `${Math.random() * 8 + 2}px`,
        background: `hsl(${Math.random() * 60 + 200}, 80%, 60%)`,
        opacity: Math.random() * 0.3 + 0.1
      },
      animate: {
        y: [0, Math.random() * 100 - 50],
        x: [0, Math.random() * 100 - 50],
      },
      transition: {
        duration: Math.random() * 15 + 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }))
    setParticles(newParticles)
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={p.style}
          animate={p.animate}
          transition={p.transition}
        />
      ))}
    </div>
  )
}