"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, CheckSquare, Clock, Plus } from "lucide-react"

interface AppSidebarProps {
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  taskCount: {
    total: number
    completed: number
    pending: number
  }
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isMobile: boolean
}

export default function AppSidebar({
  selectedCategory,
  setSelectedCategory,
  taskCount,
  isOpen,
  isMobile,
}: AppSidebarProps) {
  if (isMobile && !isOpen) return null

  return (
    <AnimatePresence>
      {(isOpen || !isMobile) && (
        <motion.div
          initial={isMobile ? { x: -300, opacity: 0 } : { opacity: 1 }}
          animate={isMobile ? { x: 0, opacity: 1 } : { opacity: 1 }}
          exit={isMobile ? { x: -300, opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`${
            isMobile
              ? "fixed inset-y-0 left-0 z-50 w-[280px] bg-white shadow-xl"
              : isOpen
                ? "w-[280px] min-w-[280px]"
                : "w-[70px] min-w-[70px]"
          } h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col gap-4 p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {(!isMobile || isOpen) && <h2 className="text-xl font-bold">Tareas con River</h2>}
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-lg hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300"
            >
              <Plus size={18} />
              {(isOpen || isMobile) && <span>nueva tareita</span>}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="mb-2 text-xs font-semibold uppercase text-gray-500">
                {(isOpen || isMobile) && "Views"}
              </div>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === null
                        ? "bg-violet-100 text-violet-700 font-medium"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Home size={18} />
                    {(isOpen || isMobile) && (
                      <>
                        <span className="flex-1 text-left">todas las tareas</span>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-200">{taskCount.total}</span>
                      </>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedCategory("completed")}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === "completed"
                        ? "bg-violet-100 text-violet-700 font-medium"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <CheckSquare size={18} />
                    {(isOpen || isMobile) && (
                      <>
                        <span className="flex-1 text-left">completadas</span>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-200">{taskCount.completed}</span>
                      </>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedCategory("pending")}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === "pending"
                        ? "bg-violet-100 text-violet-700 font-medium"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Clock size={18} />
                    {(isOpen || isMobile) && (
                      <>
                        <span className="flex-1 text-left">pendientes</span>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-200">{taskCount.pending}</span>
                      </>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
