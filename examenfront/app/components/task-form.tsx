"use client"

import type React from "react"

import { Plus } from "lucide-react"
import { motion } from "framer-motion"

interface TaskFormProps {
  newTask: {
    name: string
    description: string
  }
  setNewTask: (task: { name: string; description: string }) => void
  addTask: () => void
}

export default function TaskForm({ newTask, setNewTask, addTask }: TaskFormProps) {
  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      action()
    }
  }

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 transform hover:scale-105 transition-all duration-300"
      whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">crear nueva tareaita</h2>
      <div className="space-y-4">
        <motion.div
          className="relative"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <input
            type="text"
            placeholder="que tienes que hacer?"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            onKeyPress={(e) => handleKeyPress(e, addTask)}
            className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-fuchsia-300/50 focus:border-fuchsia-400 outline-none transition-all duration-300 placeholder-gray-400 bg-white/50"
          />
        </motion.div>
        <motion.div
          className="relative"
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <textarea
            placeholder="quiero los detalles hombre de la tareita river"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey && newTask.name.trim()) {
                e.preventDefault()
                addTask()
              }
            }}
            className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-fuchsia-300/50 focus:border-fuchsia-400 outline-none transition-all duration-300 placeholder-gray-400 bg-white/50 resize-none"
            rows={3}
          />
        </motion.div>
        <motion.button
          onClick={addTask}
          disabled={!newTask.name.trim()}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 text-white font-semibold text-lg rounded-xl hover:from-violet-500 hover:to-fuchsia-500 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:hover:scale-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Plus size={24} />
          agregar tareita
        </motion.button>
      </div>
    </motion.div>
  )
}
