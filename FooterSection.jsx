'use client'

import { useEffect } from 'react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <footer
      className="relative bg-cover bg-center text-white mt-10"
      style={{ backgroundImage: "url('/hero.jpeg')" }}
    >
      <div className="bg-black/60 backdrop-brightness-50 w-full h-full py-10">
        <div
          className="container mx-auto px-6 text-center flex flex-col items-center justify-center space-y-6"
          data-aos="fade-up"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            “Berproses hari ini untuk menjadi lebih baik esok hari.” 💫
          </h2>

          <div className="flex space-x-6 text-2xl">
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300 hover:text-pink-400"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300 hover:text-blue-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300 hover:text-rose-400"
            >
              <FaInstagram />
            </a>
          </div>

          <p className="text-sm opacity-80">
            &copy; {new Date().getFullYear()} Risna | Dibuat dengan ❤️ dan semangat belajar tinggi
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
