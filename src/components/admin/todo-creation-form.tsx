"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  X, 
  Plus, 
  Save, 
  AlertCircle,
  Edit
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TodoItem } from '@/hooks/use-todos'

export interface TodoFormPayload {
  id?: string
  title: string
  description: string
  phase: 'critical' | 'high' | 'medium' | 'low'
  category: string
  priority: 'urgent' | 'high' | 'medium' | 'low'
  estimatedEffort: 'quick' | 'medium' | 'extensive'
  tags: string[]
  dependencies: string[]
}

interface TodoCreationFormProps {
  mode?: 'create' | 'edit'
  initialTodo?: TodoItem | null
  onSave: (todo: TodoFormPayload) => Promise<void> | void
  onCancel: () => void
  existingTodos?: TodoItem[]
}

interface TodoFormData {
  title: string
  description: string
  phase: 'critical' | 'high' | 'medium' | 'low'
  category: string
  priority: 'urgent' | 'high' | 'medium' | 'low'
  estimatedEffort: 'quick' | 'medium' | 'extensive'
  tags: string[]
  dependencies: string[]
  newTag: string
  newDependency: string
}

const phaseOptions = [
  { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800 border-red-200' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800 border-green-200' }
]

const priorityOptions = [
  { value: 'urgent', label: 'Urgent', color: 'bg-red-500' },
  { value: 'high', label: 'High', color: 'bg-orange-500' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { value: 'low', label: 'Low', color: 'bg-green-500' }
]

const effortOptions = [
  { value: 'quick', label: 'Quick' },
  { value: 'medium', label: 'Medium' },
  { value: 'extensive', label: 'Extensive' }
]

const categoryOptions = [
  'Email System',
  'Analytics & Tracking',
  'SEO & Search Optimization',
  'Production Environment',
  'Security & Performance',
  'Content & UX Polish',
  'Testing & Quality Assurance',
  'Handoff & Delivery',
  'Authentication',
  'Database',
  'API Integration',
  'Frontend Development',
  'Backend Development',
  'DevOps',
  'Documentation',
  'Other'
]

const buildInitialFormState = (todo?: TodoItem | null): TodoFormData => ({
  title: todo?.title ?? '',
  description: todo?.description ?? '',
  phase: (todo?.phase ?? 'medium') as TodoFormData['phase'],
  category: todo?.category ?? '',
  priority: (todo?.priority ?? 'medium') as TodoFormData['priority'],
  estimatedEffort: (todo?.estimatedEffort ?? 'medium') as TodoFormData['estimatedEffort'],
  tags: todo?.tags ?? [],
  dependencies: todo?.dependencies ?? [],
  newTag: '',
  newDependency: ''
})

export function TodoCreationForm({ mode = 'create', initialTodo = null, onSave, onCancel, existingTodos = [] }: TodoCreationFormProps) {
  const [formData, setFormData] = useState<TodoFormData>(() => buildInitialFormState(initialTodo))

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = mode === 'edit' && !!initialTodo

  useEffect(() => {
    setFormData(buildInitialFormState(initialTodo))
    setErrors({})
  }, [initialTodo])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const payload: TodoFormPayload = {
        id: initialTodo?.id,
        title: formData.title.trim(),
        description: formData.description.trim(),
        phase: formData.phase,
        category: formData.category.trim(),
        priority: formData.priority,
        estimatedEffort: formData.estimatedEffort,
        tags: formData.tags,
        dependencies: formData.dependencies
      }

      await onSave(payload)

      if (!isEditMode) {
        setFormData(buildInitialFormState())
        setErrors({})
      }
    } catch (error) {
      console.error('Error saving todo:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addDependency = () => {
    if (formData.newDependency && !formData.dependencies.includes(formData.newDependency)) {
      setFormData(prev => ({
        ...prev,
        dependencies: [...prev.dependencies, prev.newDependency],
        newDependency: ''
      }))
    }
  }

  const removeDependency = (dependencyToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      dependencies: prev.dependencies.filter(dep => dep !== dependencyToRemove)
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      action()
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {isEditMode ? (
            <Edit className="h-5 w-5" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
          <span>{isEditMode ? 'Edit Todo Item' : 'Create New Todo Item'}</span>
        </CardTitle>
        <CardDescription>
          {isEditMode
            ? 'Update the details of this todo item'
            : 'Add a new todo item to the production readiness checklist'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter todo title..."
              className={cn(errors.title && "border-red-500")}
            />
            {errors.title && (
              <p className="text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter detailed description..."
              rows={3}
              className={cn(errors.description && "border-red-500")}
            />
            {errors.description && (
              <p className="text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.description}</span>
              </p>
            )}
          </div>

          {/* Phase and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phase">Phase</Label>
              <Select
                value={formData.phase}
                onValueChange={(value) => setFormData(prev => ({ ...prev, phase: value as TodoFormData['phase'] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {phaseOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        <Badge className={option.color}>
                          {option.label}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as TodoFormData['priority'] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        <div className={cn("w-2 h-2 rounded-full", option.color)}></div>
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category and Effort Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className={cn(errors.category && "border-red-500")}>
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.category}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="effort">Estimated Effort</Label>
              <Select
                value={formData.estimatedEffort}
                onValueChange={(value) => setFormData(prev => ({ ...prev, estimatedEffort: value as TodoFormData['estimatedEffort'] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {effortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={formData.newTag}
                onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
                placeholder="Add tag..."
                onKeyPress={(e) => handleKeyPress(e, addTag)}
              />
              <Button type="button" onClick={addTag} size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Dependencies */}
          <div className="space-y-2">
            <Label>Dependencies</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.dependencies.map((dependency) => (
                <Badge key={dependency} variant="outline" className="flex items-center space-x-1">
                  <span>{dependency}</span>
                  <button
                    type="button"
                    onClick={() => removeDependency(dependency)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Select
                value={formData.newDependency}
                onValueChange={(value) => setFormData(prev => ({ ...prev, newDependency: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select dependency..." />
                </SelectTrigger>
                <SelectContent>
                  {existingTodos
                    .filter(todo => todo.id !== initialTodo?.id)
                    .filter(todo => !formData.dependencies.includes(todo.id))
                    .map((todo) => (
                      <SelectItem key={todo.id} value={todo.id}>
                        {todo.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button 
                type="button" 
                onClick={addDependency} 
                size="sm" 
                variant="outline"
                disabled={!formData.newDependency}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isEditMode ? 'Update Todo' : 'Save Todo'}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
