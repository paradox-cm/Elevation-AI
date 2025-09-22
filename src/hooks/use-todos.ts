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
      
      const data = await response.json()
      // Map database field names to camelCase
      const mappedTodos = (data.todos || []).map((todo: any) => ({
        ...todo,
        estimatedEffort: todo.estimated_effort || todo.estimatedEffort,
        createdAt: todo.created_at,
        updatedAt: todo.updated_at,
        completedAt: todo.completed_at,
        createdBy: todo.created_by,
        assignedTo: todo.assigned_to
      }))
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
        body: JSON.stringify(todoData),
      })

      if (!response.ok) {
        throw new Error('Failed to create todo')
      }

      const data = await response.json()
      // Map database field names to camelCase
      const mappedTodo = {
        ...data.todo,
        estimatedEffort: data.todo.estimated_effort || data.todo.estimatedEffort,
        createdAt: data.todo.created_at,
        updatedAt: data.todo.updated_at,
        completedAt: data.todo.completed_at,
        createdBy: data.todo.created_by,
        assignedTo: data.todo.assigned_to
      }
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
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error('Failed to update todo')
      }

      const data = await response.json()
      // Map database field names to camelCase
      const mappedTodo = {
        ...data.todo,
        estimatedEffort: data.todo.estimated_effort || data.todo.estimatedEffort,
        createdAt: data.todo.created_at,
        updatedAt: data.todo.updated_at,
        completedAt: data.todo.completed_at,
        createdBy: data.todo.created_by,
        assignedTo: data.todo.assigned_to
      }
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
