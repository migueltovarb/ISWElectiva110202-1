"use client"

import { useState, useEffect } from "react"
import AppSidebar from "./app-sidebar"
import TaskContent from "./task-content"
import type { Task } from "../types/task"
import { useIsMobile } from "../hooks/use-mobile"
import { getAllTasks, createTask, updateTask, deleteTask, toggleTaskStatus } from "../services/api"


export const stickyColors = [
  "bg-yellow-200 border-yellow-300 shadow-yellow-200/50",
  "bg-pink-200 border-pink-300 shadow-pink-200/50",
  "bg-blue-200 border-blue-300 shadow-blue-200/50",
  "bg-green-200 border-green-300 shadow-green-200/50",
  "bg-purple-200 border-purple-300 shadow-purple-200/50",
  "bg-orange-200 border-orange-300 shadow-orange-200/50",
]

export default function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState({ name: "", description: "" })
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        const data = await getAllTasks()
        setTasks(data)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch tasks:", err)
        setError("Failed to load tasks. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const addTask = async () => {
    if (newTask.name.trim()) {
      try {
        const createdTask = await createTask({
          name: newTask.name.trim(),
          description: newTask.description.trim(),
        })

        const taskWithColor = {
          ...createdTask,
          color: stickyColors[Math.floor(Math.random() * stickyColors.length)],
          category: selectedCategory,
        }

        setTasks([...tasks, taskWithColor])
        setNewTask({ name: "", description: "" })
      } catch (err) {
        console.error("Failed to create task:", err)
        setError("Failed to create task. Please try again.")
      }
    }
  }

  const toggleTask = async (id: number) => {
    try {
      const updatedTask = await toggleTaskStatus(id)
      setTasks(tasks.map((task) => (task.id === id ? { ...task, status: updatedTask.status } : task)))
    } catch (err) {
      console.error("Failed to toggle task status:", err)
      setError("Failed to update task status. Please try again.")
    }
  }

  const deleteTaskItem = async (id: number) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (err) {
      console.error("Failed to delete task:", err)
      setError("Failed to delete task. Please try again.")
    }
  }

  const startEditing = (task: Task) => {
    setEditingTask({ ...task })
  }

  const saveEdit = async () => {
    if (editingTask && editingTask.name.trim()) {
      try {
        const updatedTask = await updateTask(editingTask.id, {
          name: editingTask.name.trim(),
          description: editingTask.description.trim(),
          status: editingTask.status,
        })

        setTasks(tasks.map((task) => (task.id === editingTask.id ? { ...task, ...updatedTask } : task)))
        setEditingTask(null)
      } catch (err) {
        console.error("Failed to update task:", err)
        setError("Failed to update task. Please try again.")
      }
    }
  }

  const cancelEdit = () => {
    setEditingTask(null)
  }

  const filteredTasks = selectedCategory
    ? selectedCategory === "completed"
      ? tasks.filter((task) => task.status)
      : selectedCategory === "pending"
        ? tasks.filter((task) => !task.status)
        : tasks.filter((task) => task.category === selectedCategory)
    : tasks

  return (
    <div className="min-h-screen font-[family-name:var(--font-poppins)] flex">
      <AppSidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        taskCount={{
          total: tasks.length,
          completed: tasks.filter((t) => t.status).length,
          pending: tasks.filter((t) => !t.status).length,
        }}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isMobile={isMobile}
      />
      <TaskContent
        tasks={filteredTasks}
        newTask={newTask}
        setNewTask={setNewTask}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        addTask={addTask}
        toggleTask={toggleTask}
        deleteTask={deleteTaskItem}
        startEditing={startEditing}
        saveEdit={saveEdit}
        cancelEdit={cancelEdit}
        selectedCategory={selectedCategory}
        isMobile={isMobile}
        loading={loading}
        error={error}
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  )
}
