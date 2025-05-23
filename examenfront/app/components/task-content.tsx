"use client"

import { motion, AnimatePresence } from "framer-motion"
import TaskForm from "./task-form"
import TaskStats from "./task-stats"
import TaskList from "./task-list"
import type { Task } from "../types/task"
import { AlertCircle, Menu } from "lucide-react"

interface TaskContentProps {
  tasks: Task[]
  newTask: { name: string; description: string }
  setNewTask: (task: { name: string; description: string }) => void
  editingTask: Task | null
  setEditingTask: (task: Task | null) => void
  addTask: () => void
  toggleTask: (id: number) => void
  deleteTask: (id: number) => void
  startEditing: (task: Task) => void
  saveEdit: () => void
  cancelEdit: () => void
  selectedCategory: string | null
  isMobile: boolean
  loading: boolean
  error: string | null
  sidebarOpen: boolean
  toggleSidebar: () => void
}

export default function TaskContent({
  tasks,
  newTask,
  setNewTask,
  editingTask,
  setEditingTask,
  addTask,
  toggleTask,
  deleteTask,
  startEditing,
  saveEdit,
  cancelEdit,
  selectedCategory,
  isMobile,
  loading,
  error,
  toggleSidebar,
}: TaskContentProps) {
  const getTitle = () => {
    if (selectedCategory === null) return "todas las tareas"
    if (selectedCategory === "completed") return "tareas completadas"
    if (selectedCategory === "pending") return "tareas pendientes"
    return `${selectedCategory} tareas`
  }

  return (
    <div
      className={`flex-1 min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-rose-50 transition-all duration-300 ${
        isMobile ? "w-full" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {isMobile && (
          <div className="flex items-center mb-6">
            <button
              onClick={toggleSidebar}
              className="p-2 mr-4 rounded-md bg-white shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>
          </div>
        )}

        <motion.div
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-fuchsia-800 mb-4 drop-shadow-sm">{getTitle()}</h1>
          <p className="text-lg text-fuchsia-700 font-medium">aqui pues voy a poner las tareitas</p>
        </motion.div>

        {error && (
          <motion.div
            className="mb-8 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center justify-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertCircle className="mr-2 h-5 w-5" />
            <span>{error}</span>
          </motion.div>
        )}

        <motion.div
          className="mb-12 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TaskForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
        </motion.div>

        <AnimatePresence>
          {tasks.length > 0 && (
            <motion.div
              className="mb-8 max-w-4xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TaskStats tasks={tasks} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <TaskList
            tasks={tasks}
            editingTask={editingTask}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            startEditing={startEditing}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            setEditingTask={setEditingTask}
            loading={loading}
          />
        </motion.div>
      </div>
    </div>
  )
}
