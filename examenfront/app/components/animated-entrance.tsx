"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface AnimatedEntranceProps {
  onEnter: () => void
}

export default function AnimatedEntrance({ onEnter }: AnimatedEntranceProps) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500)
    const timer2 = setTimeout(() => setStage(2), 1500)
    const timer3 = setTimeout(() => setStage(3), 2500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-900 via-fuchsia-800 to-rose-700 flex items-center justify-center overflow-hidden font-[family-name:var(--font-poppins)] relative">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            initial={{ scale: 0 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.5 }}
          animate={{
            y: 0,
            opacity: stage >= 1 ? 1 : 0,
            scale: stage >= 1 ? 1 : 0.5,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="text-6xl md:text-9xl mb-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
          >
            📝
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{
            y: 0,
            opacity: stage >= 2 ? 1 : 0,
          }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300 bg-clip-text text-transparent">
            Tareas con River
          </h1>
          <p className="text-lg md:text-2xl text-white/80 mb-12 font-light">una aplicacion de tareas que acabamos de hacer para el examen </p>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0, scale: 0.9 }}
          animate={{
            y: 0,
            opacity: stage >= 3 ? 1 : 0,
            scale: stage >= 3 ? 1 : 0.9,
          }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          <button
            onClick={onEnter}
            className="group relative px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-semibold text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 rounded-full shadow-2xl hover:shadow-fuchsia-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-3">
                Iniciar
              <motion.div
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
              >
                →
              </motion.div>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>

        <motion.div
          className="absolute top-10 left-10 w-32 md:w-40 h-32 md:h-40 bg-gradient-to-br from-amber-400/20 to-rose-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 md:w-60 h-40 md:h-60 bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut", delay: 1 }}
        />
      </div>
    </div>
  )
}