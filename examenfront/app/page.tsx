"use client"

import { useState } from "react"
import AnimatedEntrance from "./components/animated-entrance"
import TaskApp from "./components/task-app"
import { AnimatePresence, motion } from "framer-motion"

export default function Home() {
  const [showEntrance, setShowEntrance] = useState(true)

  const handleEnterApp = () => {
    setShowEntrance(false)
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {showEntrance ? (
          <motion.div
            key="entrance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedEntrance onEnter={handleEnterApp} />
          </motion.div>
        ) : (
          <motion.div
            key="task-app"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TaskApp />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
