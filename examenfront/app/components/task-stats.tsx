"use client"

import { motion } from "framer-motion"
import type { Task } from "../types/task"

interface TaskStatsProps {
  tasks: Task[]
}

export default function TaskStats({ tasks }: TaskStatsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={container} initial="hidden" animate="show">
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300"
        variants={item}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="text-4xl font-bold text-cyan-600 mb-2">{tasks.length}</div>
        <div className="text-lg text-gray-700 font-medium">total tareas</div>
      </motion.div>

      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300"
        variants={item}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="text-4xl font-bold text-green-600 mb-2">{tasks.filter((t) => t.status).length}</div>
        <div className="text-lg text-gray-700 font-medium">completadas</div>
      </motion.div>

      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300"
        variants={item}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="text-4xl font-bold text-rose-600 mb-2">{tasks.filter((t) => !t.status).length}</div>
        <div className="text-lg text-gray-700 font-medium">pendientes</div>
      </motion.div>
    </motion.div>
  )
}
