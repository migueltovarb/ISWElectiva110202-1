"use client"

import { motion, AnimatePresence } from "framer-motion"
import TaskItem from "./task-item"
import type { Task } from "../types/task"
import { Loader2 } from "lucide-react"

interface TaskListProps {
  tasks: Task[]
  editingTask: Task | null
  toggleTask: (id: number) => void
  deleteTask: (id: number) => void
  startEditing: (task: Task) => void
  saveEdit: () => void
  cancelEdit: () => void
  setEditingTask: (task: Task | null) => void
  loading: boolean
}

export default function TaskList({
  tasks,
  editingTask,
  toggleTask,
  deleteTask,
  startEditing,
  saveEdit,
  cancelEdit,
  setEditingTask,
  loading,
}: TaskListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 text-fuchsia-500 animate-spin" />
        <span className="ml-4 text-lg text-fuchsia-700">cargando tareitas....</span>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {tasks.length === 0 ? (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              ease: "easeInOut",
            }}
          >
            📝
          </motion.div>
          <p className="text-2xl text-fuchsia-800 font-semibold mb-2">todavia no has agregado tareitas</p>
          <p className="text-lg text-fuchsia-700">crea la primera tarea para organizar esto.</p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.07,
              },
            },
          }}
        >
          <AnimatePresence>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                editingTask={editingTask}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                startEditing={startEditing}
                saveEdit={saveEdit}
                cancelEdit={cancelEdit}
                setEditingTask={setEditingTask}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
