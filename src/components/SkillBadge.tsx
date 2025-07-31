"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  name: string
  icon: string
  level: number
}

export default function SkillBadge({ name, icon, level }: SkillBadgeProps) {
  return (
    <motion.div
      className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-2"
      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(8, 145, 178, 0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium text-gray-700 dark:text-gray-300">{name}</span>
      <div className="ml-2 w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-cyan-500 rounded-full"
          style={{ width: `${level}%` }}
        />
      </div>
    </motion.div>
  )
}