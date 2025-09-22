"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  AlertTriangle, 
  CheckSquare, 
  Square,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react'
import { TodoCreationForm } from '@/components/admin/todo-creation-form'
import { useTodos, TodoItem } from '@/hooks/use-todos'
import { cn } from '@/lib/utils'

// Original todos are now stored in the database and loaded via the useTodos hook

const phaseColors = {
  critical: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200'
}

const priorityColors = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500'
}

const statusIcons = {
  pending: Circle,
  in_progress: Clock,
  completed: CheckCircle
}

export default function TodoPage() {
  const { todos, isLoading, error, createTodo, updateTodo, toggleTodoStatus } = useTodos()
  const [filterPhase, setFilterPhase] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCompleted, setShowCompleted] = useState(true)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Handle save status feedback
  const handleSaveStatus = (status: 'saving' | 'saved') => {
    setSaveStatus(status)
    if (status === 'saved') {
      setTimeout(() => setSaveStatus(null), 2000)
    }
  }

  const filteredTodos = todos.filter(todo => {
    const matchesPhase = filterPhase === 'all' || todo.phase === filterPhase
    const matchesStatus = filterStatus === 'all' || todo.status === filterStatus
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCompleted = showCompleted || todo.status !== 'completed'
    
    return matchesPhase && matchesStatus && matchesSearch && matchesCompleted
  }).sort((a, b) => {
    // Sort by status: completed first, then in_progress, then pending
    const statusOrder = { completed: 0, in_progress: 1, pending: 2 }
    return statusOrder[a.status] - statusOrder[b.status]
  })

  const handleToggleTodoStatus = async (id: string) => {
    try {
      handleSaveStatus('saving')
      await toggleTodoStatus(id)
      handleSaveStatus('saved')
    } catch (error) {
      console.error('Error toggling todo status:', error)
    }
  }

  const handleSaveNewTodo = async (newTodo: Omit<TodoItem, 'id' | 'status' | 'created_at' | 'updated_at'>) => {
    try {
      handleSaveStatus('saving')
      await createTodo(newTodo)
      setShowCreateForm(false)
      handleSaveStatus('saved')
    } catch (error) {
      console.error('Error saving new todo:', error)
    }
  }

  const getPhaseStats = () => {
    const stats = { critical: 0, high: 0, medium: 0, low: 0 }
    todos.forEach(todo => {
      if (todo.status !== 'completed') {
        stats[todo.phase]++
      }
    })
    return stats
  }

  const getStatusStats = () => {
    const stats = { pending: 0, in_progress: 0, completed: 0 }
    todos.forEach(todo => {
      stats[todo.status]++
    })
    return stats
  }

  const phaseStats = getPhaseStats()
  const statusStats = getStatusStats()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Production Readiness To-Do</h1>
          <p className="text-muted-foreground">
            Loading your saved progress...
          </p>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Production Readiness To-Do</h1>
          <p className="text-muted-foreground">
            Error loading todos
          </p>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center space-x-2 text-red-600 mb-4">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Failed to load todos</span>
            </div>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Production Readiness To-Do</h1>
            <p className="text-muted-foreground">
              Comprehensive checklist of items to complete before deploying to production
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {saveStatus && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                {saveStatus === 'saving' && (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span>Saving...</span>
                  </>
                )}
                {saveStatus === 'saved' && (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Saved</span>
                  </>
                )}
              </div>
            )}
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Todo</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className={cn("border-orange-200", statusStats.in_progress > 0 && "bg-orange-50/50")}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">In Progress</span>
            </div>
            <div className="text-2xl font-bold mt-1 text-orange-600">{statusStats.in_progress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Circle className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">Pending</span>
            </div>
            <div className="text-2xl font-bold mt-1">{statusStats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Completed</span>
            </div>
            <div className="text-2xl font-bold mt-1 text-green-600">{statusStats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Phase Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium">Critical</span>
            </div>
            <div className="text-2xl font-bold mt-1">{phaseStats.critical}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium">High</span>
            </div>
            <div className="text-2xl font-bold mt-1">{phaseStats.high}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium">Medium</span>
            </div>
            <div className="text-2xl font-bold mt-1">{phaseStats.medium}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Low</span>
            </div>
            <div className="text-2xl font-bold mt-1">{phaseStats.low}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            
            <select
              value={filterPhase}
              onChange={(e) => setFilterPhase(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Phases</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-completed"
                checked={showCompleted}
                onCheckedChange={(checked) => setShowCompleted(checked as boolean)}
              />
              <label htmlFor="show-completed" className="text-sm">
                Show completed
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Todo List */}
      <div className="space-y-4">
        {filteredTodos.map((todo) => {
          const StatusIcon = statusIcons[todo.status]
          const isInProgress = todo.status === 'in_progress'
          return (
            <Card 
              key={todo.id} 
              className={cn(
                "hover:shadow-md transition-shadow",
                isInProgress && "border-orange-200 bg-orange-50/50 shadow-orange-100"
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => handleToggleTodoStatus(todo.id)}
                    className="mt-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {todo.status === 'completed' ? (
                      <CheckSquare className="h-5 w-5 text-green-600" />
                    ) : todo.status === 'in_progress' ? (
                      <div className="relative">
                        <Square className="h-5 w-5 text-orange-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    ) : (
                      <Square className="h-5 w-5" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={cn(
                          "text-lg font-semibold",
                          todo.status === 'completed' && "line-through text-muted-foreground"
                        )}>
                          {todo.title}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {todo.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge className={phaseColors[todo.phase]}>
                            {todo.phase.charAt(0).toUpperCase() + todo.phase.slice(1)}
                          </Badge>
                          <Badge variant="outline">{todo.category}</Badge>
                          <Badge variant="outline" className="flex items-center space-x-1">
                            <StatusIcon className="h-3 w-3" />
                            <span className="capitalize">{todo.status.replace('_', ' ')}</span>
                          </Badge>
                          <Badge variant="outline" className="flex items-center space-x-1">
                            <div className={cn("w-2 h-2 rounded-full", priorityColors[todo.priority])}></div>
                            <span className="capitalize">{todo.priority}</span>
                          </Badge>
                          <Badge variant="outline">
                            {(todo.estimatedEffort || 'medium').charAt(0).toUpperCase() + (todo.estimatedEffort || 'medium').slice(1)} effort
                          </Badge>
                        </div>

                        {(todo.tags || []).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(todo.tags || []).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {(todo.dependencies || []).length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">
                              Dependencies: {(todo.dependencies || []).join(', ')}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredTodos.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No todos match your current filters.</p>
          </CardContent>
        </Card>
      )}

      {/* Todo Creation Form */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <TodoCreationForm
              onSave={handleSaveNewTodo}
              onCancel={() => setShowCreateForm(false)}
              existingTodos={todos}
            />
          </div>
        </div>
      )}
    </div>
  )
}
