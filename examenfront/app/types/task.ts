export interface Task {
  id: number
  name: string
  description: string
  status: boolean
  createdAt?: string
  color?: string
  category?: string | null
}