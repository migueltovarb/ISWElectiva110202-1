"use client"

import type React from "react"

import { Check, X, Edit2, Save, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import type { Task } from "../types/task"

interface TaskItemProps {
  task: Task
  editingTask: Task | null
  toggleTask: (id: number) => void
  deleteTask: (id: number) => void
  startEditing: (task: Task) => void
  saveEdit: () => void
  cancelEdit: () => void
  setEditingTask: (task: Task | null) => void
}

export default function TaskItem({
  task,
  editingTask,
  toggleTask,
  deleteTask,
  startEditing,
  saveEdit,
  cancelEdit,
  setEditingTask,
}: TaskItemProps) {
  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      action()
    }
  }

  const isEditing = editingTask && editingTask.id === task.id

  const rotation = Math.random() * 2 - 2

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: task.status ? rotation + 1 : rotation,
      }}
      exit={{ opacity: 0, scale: 0.8, rotate: rotation }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      whileHover={{
        scale: 1.05,
        rotate: task.status ? rotation + 1 : rotation - 1,
        transition: { duration: 0.2 },
      }}
      className={`${task.color} ${
        task.status ? "opacity-75" : ""
      } p-6 rounded-2xl border-2 shadow-lg relative min-h-[250px] flex flex-col`}
    >
      {isEditing ? (
        <motion.div
          className="space-y-4 flex-1 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <input
            type="text"
            value={editingTask.name}
            onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
            onKeyPress={(e) => handleKeyPress(e, saveEdit)}
            className="w-full px-3 py-2 text-lg font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent outline-none bg-white/70"
            autoFocus
          />
          <textarea
            value={editingTask.description}
            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                saveEdit()
              }
            }}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent outline-none resize-none bg-white/70 flex-1"
            rows={4}
          />
          <div className="flex gap-2 mt-auto">
            <motion.button
              onClick={saveEdit}
              className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save size={16} />
              guardar tareita
            </motion.button>
            <motion.button
              onClick={cancelEdit}
              className="flex items-center gap-1 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={16} />
              cancelar
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <motion.button
              onClick={() => toggleTask(task.id)}
              className={`w-7 h-7 rounded-full border-3 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                task.status
                  ? "bg-green-500 border-green-600 text-white shadow-lg"
                  : "border-gray-400 hover:border-green-500 bg-white/70"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {task.status && <Check size={18} strokeWidth={3} />}
            </motion.button>
            <div className="flex gap-1">
              <motion.button
                onClick={() => startEditing(task)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white/50 rounded-lg transition-all duration-300 transform hover:scale-110"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                whileTap={{ scale: 0.9 }}
              >
                <Edit2 size={16} />
              </motion.button>
              <motion.button
                onClick={() => deleteTask(task.id)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-white/50 rounded-lg transition-all duration-300 transform hover:scale-110"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 size={16} />
              </motion.button>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <motion.h3
              className={`text-xl font-bold mb-3 leading-tight ${
                task.status ? "text-gray-600 line-through" : "text-gray-800"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {task.name}
            </motion.h3>

            {task.description && (
              <motion.p
                className={`text-sm mb-4 leading-relaxed flex-1 ${task.status ? "text-gray-500" : "text-gray-700"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {task.description}
              </motion.p>
            )}

            {task.category && (
              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-block px-2 py-1 bg-white/50 rounded-full text-xs font-medium">
                  {task.category}
                </span>
              </motion.div>
            )}

            <motion.div
              className="text-xs text-gray-500 mt-auto pt-4 border-t border-gray-300/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="font-mono">#{task.id}</div>
              <div>{new Date(task.createdAt || Date.now()).toLocaleDateString()}</div>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
