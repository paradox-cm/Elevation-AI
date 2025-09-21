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
import { cn } from '@/lib/utils'

interface TodoItem {
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
}

const todoItems: TodoItem[] = [
  // Phase 1: Critical Infrastructure
  {
    id: 'email-service-setup',
    title: 'Set up email service (SendGrid/Resend)',
    description: 'Integrate email service provider and connect form submissions to send notifications',
    phase: 'critical',
    category: 'Email System',
    status: 'pending',
    priority: 'urgent',
    estimatedEffort: 'medium',
    tags: ['email', 'forms', 'notifications']
  },
  {
    id: 'form-email-notifications',
    title: 'Connect form submissions to email notifications',
    description: 'Implement automated email notifications for new form submissions to admin team',
    phase: 'critical',
    category: 'Email System',
    status: 'pending',
    priority: 'urgent',
    dependencies: ['email-service-setup'],
    estimatedEffort: 'medium',
    tags: ['email', 'forms', 'automation']
  },
  {
    id: 'google-analytics-implementation',
    title: 'Implement Google Analytics with proper tracking',
    description: 'Set up Google Analytics 4 with proper event tracking and data layer implementation',
    phase: 'critical',
    category: 'Analytics & Tracking',
    status: 'pending',
    priority: 'high',
    estimatedEffort: 'medium',
    tags: ['analytics', 'tracking', 'ga4']
  },
  {
    id: 'cookie-consent-integration',
    title: 'Connect cookie consent banner to actual tracking',
    description: 'Make cookie consent banner functional and integrate with Google Analytics consent mode',
    phase: 'critical',
    category: 'Analytics & Tracking',
    status: 'pending',
    priority: 'high',
    dependencies: ['google-analytics-implementation'],
    estimatedEffort: 'quick',
    tags: ['cookies', 'consent', 'privacy']
  },
  {
    id: 'sitemap-creation',
    title: 'Create sitemap.xml and robots.txt',
    description: 'Generate XML sitemap for all pages and create robots.txt for search engine crawling',
    phase: 'critical',
    category: 'SEO & Search Optimization',
    status: 'pending',
    priority: 'high',
    estimatedEffort: 'quick',
    tags: ['seo', 'sitemap', 'robots']
  },
  {
    id: 'production-env-config',
    title: 'Configure production environment variables',
    description: 'Set up all necessary environment variables for production deployment',
    phase: 'critical',
    category: 'Production Environment',
    status: 'pending',
    priority: 'urgent',
    estimatedEffort: 'quick',
    tags: ['environment', 'deployment', 'config']
  },
  {
    id: 'error-monitoring-setup',
    title: 'Set up error monitoring (Sentry)',
    description: 'Implement error tracking and monitoring service for production debugging',
    phase: 'critical',
    category: 'Security & Performance',
    status: 'pending',
    priority: 'high',
    estimatedEffort: 'quick',
    tags: ['monitoring', 'errors', 'sentry']
  },

  // Phase 2: SEO & Performance
  {
    id: 'structured-data-markup',
    title: 'Add structured data markup for all pages',
    description: 'Implement JSON-LD schema markup for better search engine understanding',
    phase: 'high',
    category: 'SEO & Search Optimization',
    status: 'pending',
    priority: 'medium',
    estimatedEffort: 'extensive',
    tags: ['seo', 'schema', 'structured-data']
  },
  {
    id: 'meta-tags-optimization',
    title: 'Optimize meta tags for each page',
    description: 'Ensure all pages have unique, optimized title tags, descriptions, and Open Graph tags',
    phase: 'high',
    category: 'SEO & Search Optimization',
    status: 'pending',
    priority: 'medium',
    estimatedEffort: 'medium',
    tags: ['seo', 'meta', 'opengraph']
  },
  {
    id: 'security-headers',
    title: 'Implement security headers',
    description: 'Add Content Security Policy, HSTS, and other security headers',
    phase: 'high',
    category: 'Security & Performance',
    status: 'pending',
    priority: 'high',
    estimatedEffort: 'medium',
    tags: ['security', 'headers', 'csp']
  },
  {
    id: 'performance-monitoring',
    title: 'Set up performance monitoring',
    description: 'Implement real user monitoring and Core Web Vitals tracking',
    phase: 'high',
    category: 'Security & Performance',
    status: 'pending',
    priority: 'medium',
    estimatedEffort: 'quick',
    tags: ['performance', 'monitoring', 'web-vitals']
  },
  {
    id: 'api-rate-limiting',
    title: 'Add rate limiting to API endpoints',
    description: 'Implement rate limiting to prevent abuse of form submission and other API endpoints',
    phase: 'high',
    category: 'Security & Performance',
    status: 'pending',
    priority: 'medium',
    estimatedEffort: 'medium',
    tags: ['api', 'rate-limiting', 'security']
  },

  // Phase 3: Content & UX
  {
    id: 'form-validation-real',
    title: 'Replace mock form validation with real validation',
    description: 'Remove simulated form validation and implement proper client/server validation',
    phase: 'medium',
    category: 'Content & UX Polish',
    status: 'pending',
    priority: 'medium',
    estimatedEffort: 'medium',
    tags: ['forms', 'validation', 'ux']
  },
  {
    id: 'error-boundaries-implementation',
    title: 'Implement proper error boundaries',
    description: 'Add comprehensive error boundaries throughout the application',
    phase: 'medium',
    category: 'Content & UX Polish',
    status: 'pending',
    priority: 'medium',
    estimatedEffort: 'medium',
    tags: ['errors', 'boundaries', 'ux']
  },
  {
    id: 'loading-states-comprehensive',
    title: 'Add comprehensive loading states',
    description: 'Ensure all async operations have proper loading states and user feedback',
    phase: 'medium',
    category: 'Content & UX Polish',
    status: 'pending',
    priority: 'low',
    estimatedEffort: 'extensive',
    tags: ['loading', 'ux', 'feedback']
  },
  {
    id: 'accessibility-testing',
    title: 'Test and fix accessibility issues',
    description: 'Comprehensive accessibility audit and fixes for WCAG compliance',
    phase: 'medium',
    category: 'Content & UX Polish',
    status: 'pending',
    priority: 'medium',
    estimatedEffort: 'extensive',
    tags: ['accessibility', 'a11y', 'wcag']
  },
  {
    id: 'mobile-optimization-review',
    title: 'Mobile optimization review',
    description: 'Comprehensive mobile testing and optimization across different devices',
    phase: 'medium',
    category: 'Content & UX Polish',
    status: 'pending',
    priority: 'medium',
    estimatedEffort: 'medium',
    tags: ['mobile', 'responsive', 'testing']
  },

  // Phase 4: Testing & Launch
  {
    id: 'unit-tests-critical',
    title: 'Add unit tests for critical components',
    description: 'Implement unit tests for forms, API endpoints, and core functionality',
    phase: 'low',
    category: 'Testing & Quality Assurance',
    status: 'pending',
    priority: 'low',
    estimatedEffort: 'extensive',
    tags: ['testing', 'unit-tests', 'quality']
  },
  {
    id: 'cross-browser-testing',
    title: 'Cross-browser testing',
    description: 'Test application across different browsers and devices',
    phase: 'low',
    category: 'Testing & Quality Assurance',
    status: 'pending',
    priority: 'medium',
    estimatedEffort: 'medium',
    tags: ['testing', 'browsers', 'compatibility']
  },
  {
    id: 'load-testing',
    title: 'Load testing for production traffic',
    description: 'Perform load testing to ensure application can handle production traffic',
    phase: 'low',
    category: 'Testing & Quality Assurance',
    status: 'pending',
    priority: 'medium',
    estimatedEffort: 'medium',
    tags: ['testing', 'load', 'performance']
  },
  {
    id: 'backup-disaster-recovery',
    title: 'Backup and disaster recovery setup',
    description: 'Implement database backup strategy and disaster recovery procedures',
    phase: 'low',
    category: 'Production Environment',
    status: 'pending',
    priority: 'high',
    estimatedEffort: 'medium',
    tags: ['backup', 'disaster-recovery', 'production']
  },
  {
    id: 'security-audit',
    title: 'Final security audit',
    description: 'Comprehensive security review and penetration testing',
    phase: 'low',
    category: 'Security & Performance',
    status: 'pending',
    priority: 'high',
    estimatedEffort: 'extensive',
    tags: ['security', 'audit', 'penetration-testing']
  }
]

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
  const [todos, setTodos] = useState<TodoItem[]>(todoItems)
  const [filterPhase, setFilterPhase] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCompleted, setShowCompleted] = useState(true)

  const filteredTodos = todos.filter(todo => {
    const matchesPhase = filterPhase === 'all' || todo.phase === filterPhase
    const matchesStatus = filterStatus === 'all' || todo.status === filterStatus
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCompleted = showCompleted || todo.status !== 'completed'
    
    return matchesPhase && matchesStatus && matchesSearch && matchesCompleted
  })

  const toggleTodoStatus = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { 
            ...todo, 
            status: todo.status === 'completed' ? 'pending' : 
                   todo.status === 'pending' ? 'in_progress' : 'completed'
          }
        : todo
    ))
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

  const phaseStats = getPhaseStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Production Readiness To-Do</h1>
        <p className="text-muted-foreground">
          Comprehensive checklist of items to complete before deploying to production
        </p>
      </div>

      {/* Stats Overview */}
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
          return (
            <Card key={todo.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => toggleTodoStatus(todo.id)}
                    className="mt-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {todo.status === 'completed' ? (
                      <CheckSquare className="h-5 w-5 text-green-600" />
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
                            {todo.estimatedEffort.charAt(0).toUpperCase() + todo.estimatedEffort.slice(1)} effort
                          </Badge>
                        </div>

                        {todo.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {todo.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {todo.dependencies && todo.dependencies.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">
                              Dependencies: {todo.dependencies.join(', ')}
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
    </div>
  )
}
