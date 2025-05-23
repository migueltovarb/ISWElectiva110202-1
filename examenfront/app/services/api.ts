import axios from "axios"
import type { Task } from "../types/task"

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks/")
  return response.data
}

export const getTask = async (id: number): Promise<Task> => {
  const response = await api.get(`/tasks/${id}/`)
  return response.data
}

export const createTask = async (taskData: { name: string; description: string }): Promise<Task> => {
  const response = await api.post("/tasks/create/", taskData)
  return response.data
}

export const updateTask = async (
  id: number,
  taskData: { name: string; description: string; status: boolean },
): Promise<Task> => {
  const response = await api.put(`/tasks/update/${id}/`, taskData)
  return response.data
}

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/delete/${id}/`)
}

export const toggleTaskStatus = async (id: number): Promise<Task> => {
  const response = await api.post(`/tasks/${id}/toggle-status/`)
  return response.data
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  },
)

export default api