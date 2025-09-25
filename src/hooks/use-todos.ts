import { useState, useEffect, useCallback } from 'react'

export interface TodoItem {
  id: string
  title: string
  description: string
  phase: 'critical' | 'high' | 'medium' | 'low'
  category: string
  status: 'pending' | 'in_progress' | 'completed'
  priority: 'urgent' | 'high' | 'medium' | 'low'
  dependencies?: string[]
  estimatedEffort: 'quick' | 'medium' | 'extensive'
  tags: string[]
  notes?: string
  created_at?: string
  updated_at?: string
  completed_at?: string
  created_by?: string
  assigned_to?: string
  createdAt?: string
  updatedAt?: string
  completedAt?: string
  createdBy?: string
  assignedTo?: string
}

type RawTodo = {
  id: string
  title: string
  description: string
  phase: TodoItem['phase']
  category: string
  status: TodoItem['status']
  priority: TodoItem['priority']
  estimated_effort?: TodoItem['estimatedEffort']
  estimatedEffort?: TodoItem['estimatedEffort']
  tags?: string[] | null
  dependencies?: string[] | null
  notes?: string | null
  created_at?: string | null
  updated_at?: string | null
  completed_at?: string | null
  created_by?: string | null
  assigned_to?: string | null
}

const mapRawTodo = (todo: RawTodo): TodoItem => {
  const estimatedEffort = todo.estimated_effort ?? todo.estimatedEffort ?? 'medium'

  return {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    phase: todo.phase,
    category: todo.category,
    status: todo.status,
    priority: todo.priority,
    estimatedEffort,
    tags: todo.tags ?? [],
    dependencies: todo.dependencies ?? [],
    notes: todo.notes ?? undefined,
    created_at: todo.created_at ?? undefined,
    updated_at: todo.updated_at ?? undefined,
    completed_at: todo.completed_at ?? undefined,
    created_by: todo.created_by ?? undefined,
    assigned_to: todo.assigned_to ?? undefined,
    createdAt: todo.created_at ?? undefined,
    updatedAt: todo.updated_at ?? undefined,
    completedAt: todo.completed_at ?? undefined,
    createdBy: todo.created_by ?? undefined,
    assignedTo: todo.assigned_to ?? undefined
  }
}

const serializeTodoPayload = (data: Partial<TodoItem>) => {
  const payload: Record<string, unknown> = {}

  if (data.title !== undefined) payload.title = data.title
  if (data.description !== undefined) payload.description = data.description
  if (data.phase !== undefined) payload.phase = data.phase
  if (data.category !== undefined) payload.category = data.category
  if (data.status !== undefined) payload.status = data.status
  if (data.priority !== undefined) payload.priority = data.priority
  if (data.estimatedEffort !== undefined) payload.estimated_effort = data.estimatedEffort
  if (data.tags !== undefined) payload.tags = data.tags
  if (data.dependencies !== undefined) payload.dependencies = data.dependencies
  if (data.notes !== undefined) payload.notes = data.notes
  if (data.created_by !== undefined) payload.created_by = data.created_by
  if (data.assigned_to !== undefined) payload.assigned_to = data.assigned_to

  return payload
}

export function useTodos() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch todos from database
  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/todos')
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      
      const data = (await response.json()) as { todos?: RawTodo[] }
      const mappedTodos = (data.todos ?? []).map(mapRawTodo)
      setTodos(mappedTodos)
    } catch (err) {
      console.error('Error fetching todos:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch todos')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Create new todo
  const createTodo = useCallback(async (todoData: Omit<TodoItem, 'id' | 'status' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serializeTodoPayload(todoData)),
      })

      if (!response.ok) {
        throw new Error('Failed to create todo')
      }

      const data = (await response.json()) as { todo: RawTodo }
      const mappedTodo = mapRawTodo(data.todo)
      setTodos(prev => [mappedTodo, ...prev])
      return mappedTodo
    } catch (err) {
      console.error('Error creating todo:', err)
      setError(err instanceof Error ? err.message : 'Failed to create todo')
      throw err
    }
  }, [])

  // Update todo
  const updateTodo = useCallback(async (id: string, updates: Partial<TodoItem>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serializeTodoPayload(updates)),
      })

      if (!response.ok) {
        throw new Error('Failed to update todo')
      }

      const data = (await response.json()) as { todo: RawTodo }
      const mappedTodo = mapRawTodo(data.todo)
      setTodos(prev => prev.map(todo => 
        todo.id === id ? mappedTodo : todo
      ))
      return mappedTodo
    } catch (err) {
      console.error('Error updating todo:', err)
      setError(err instanceof Error ? err.message : 'Failed to update todo')
      throw err
    }
  }, [])

  // Delete todo
  const deleteTodo = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }

      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (err) {
      console.error('Error deleting todo:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete todo')
      throw err
    }
  }, [])

  // Toggle todo status
  const toggleTodoStatus = useCallback(async (id: string) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return

    const statusOrder = ['pending', 'in_progress', 'completed']
    const currentIndex = statusOrder.indexOf(todo.status)
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length] as 'pending' | 'in_progress' | 'completed'

    try {
      await updateTodo(id, { status: nextStatus })
    } catch (err) {
      console.error('Error toggling todo status:', err)
    }
  }, [todos, updateTodo])

  // Load todos on mount
  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return {
    todos,
    isLoading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodoStatus,
    refetch: fetchTodos
  }
}
