"use client"

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Filter, 
  Search, 
  Eye, 
  MessageSquare, 
  Archive,
  Clock,
  User,
  AlertCircle
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface FormSubmission {
  id: string
  form_type: string
  status: string
  priority: string
  first_name: string | null
  last_name: string | null
  email: string
  phone: string | null
  company: string | null
  job_title: string | null
  form_data: Record<string, unknown>
  ip_address: string | null
  user_agent: string | null
  referrer_url: string | null
  page_url: string | null
  assigned_to: string | null
  notes: string | null
  created_at: string
  updated_at: string
  read_at: string | null
  replied_at: string | null
}

const formTypeLabels = {
  contact: 'Contact Form',
  demo: 'Demo Request',
  consultation: 'Consultation',
  newsletter: 'Newsletter',
  signup: 'Sign Up'
}

const statusLabels = {
  new: 'New',
  read: 'Read',
  replied: 'Replied',
  archived: 'Archived'
}

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent'
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
  read: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700',
  replied: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
  archived: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600',
  medium: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
  high: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
  urgent: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700'
}

export default function FormSubmissionsPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null)

  const supabase = createClient()
  const router = useRouter()

  const fetchSubmissions = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/admin/login')
        return
      }

      const { data: submissionsData, error: submissionsError } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (submissionsError) throw submissionsError

      setSubmissions(submissionsData || [])
    } catch (error) {
      console.error('Error fetching submissions:', error)
      setError('Failed to load form submissions')
    } finally {
      setIsLoading(false)
    }
  }, [supabase, router])

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  const updateSubmissionStatus = async (id: string, status: string) => {
    try {
      const updateData: Record<string, unknown> = { status }
      
      if (status === 'read' && !submissions.find(s => s.id === id)?.read_at) {
        updateData.read_at = new Date().toISOString()
      }
      
      if (status === 'replied' && !submissions.find(s => s.id === id)?.replied_at) {
        updateData.replied_at = new Date().toISOString()
      }

      const { error } = await supabase
        .from('form_submissions')
        .update(updateData)
        .eq('id', id)

      if (error) throw error

      // Update local state
      setSubmissions(prev => prev.map(submission => 
        submission.id === id 
          ? { ...submission, ...updateData }
          : submission
      ))

      if (selectedSubmission?.id === id) {
        setSelectedSubmission(prev => prev ? { ...prev, ...updateData } : null)
      }
    } catch (error) {
      console.error('Error updating submission:', error)
      setError('Failed to update submission status')
    }
  }

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = searchTerm === '' || 
      submission.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.company?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter
    const matchesType = typeFilter === 'all' || submission.form_type === typeFilter
    const matchesPriority = priorityFilter === 'all' || submission.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getFormTypeIcon = (type: string) => {
    switch (type) {
      case 'contact': return <MessageSquare className="h-4 w-4" />
      case 'demo': return <Eye className="h-4 w-4" />
      case 'consultation': return <Phone className="h-4 w-4" />
      case 'newsletter': return <Mail className="h-4 w-4" />
      case 'signup': return <User className="h-4 w-4" />
      default: return <MessageSquare className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading submissions..." variant="css" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Form Submissions</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage and respond to all form submissions from your website
        </p>
      </div>

      {/* Form Types Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Form Types Overview
          </CardTitle>
          <CardDescription>
            Click on any form type to filter submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {/* All Types Button - First */}
            <button
              onClick={() => setTypeFilter('all')}
              className={`p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
                typeFilter === 'all' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <div className="flex flex-col items-center space-y-1.5">
                <div className="p-1.5 rounded-full bg-primary/10">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-xs">All Types</div>
                  <div className={`text-xs ${typeFilter === 'all' ? 'text-primary' : 'text-muted-foreground'}`}>
                    {submissions.length}
                  </div>
                </div>
              </div>
            </button>

            {Object.entries(formTypeLabels).map(([type, label]) => {
              const count = submissions.filter(sub => sub.form_type === type).length
              const isActive = typeFilter === type
              
              return (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
                    isActive 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1.5">
                    <div className="p-1.5 rounded-full bg-primary/10">
                      {getFormTypeIcon(type)}
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-xs">{label}</div>
                      <div className={`text-xs ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                        {count}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Form Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="contact">Contact Form</SelectItem>
                  <SelectItem value="demo">Demo Request</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="signup">Sign Up</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Results</label>
              <div className="flex items-center h-10 px-3 text-sm text-muted-foreground border rounded-md bg-muted/50">
                {filteredSubmissions.length} submission{filteredSubmissions.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredSubmissions.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground py-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p>No form submissions found</p>
                  <p className="text-sm">Submissions will appear here when users submit forms</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredSubmissions.map((submission) => (
              <Card 
                key={submission.id} 
                className={`cursor-pointer transition-colors ${
                  selectedSubmission?.id === submission.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedSubmission(submission)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        {getFormTypeIcon(submission.form_type)}
                        <span className="font-medium">
                          {submission.first_name} {submission.last_name}
                        </span>
                        <Badge variant="outline" className={statusColors[submission.status as keyof typeof statusColors]}>
                          {statusLabels[submission.status as keyof typeof statusLabels]}
                        </Badge>
                        <Badge variant="outline" className={priorityColors[submission.priority as keyof typeof priorityColors]}>
                          {priorityLabels[submission.priority as keyof typeof priorityLabels]}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {submission.email}
                        </div>
                        {submission.company && (
                          <div className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {submission.company}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(submission.created_at)}
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <span className="font-medium">{formTypeLabels[submission.form_type as keyof typeof formTypeLabels]}</span>
                        {submission.form_data?.message && (
                          <p className="text-muted-foreground mt-1 line-clamp-2">
                            {typeof submission.form_data.message === 'string' ? submission.form_data.message : String(submission.form_data.message)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      {submission.status === 'new' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateSubmissionStatus(submission.id, 'read')
                          }}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Mark Read
                        </Button>
                      )}
                      {submission.status === 'read' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateSubmissionStatus(submission.id, 'replied')
                          }}
                        >
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Mark Replied
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Submission Details */}
        <div className="lg:col-span-1">
          {selectedSubmission ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getFormTypeIcon(selectedSubmission.form_type)}
                  Submission Details
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className={statusColors[selectedSubmission.status as keyof typeof statusColors]}>
                    {statusLabels[selectedSubmission.status as keyof typeof statusLabels]}
                  </Badge>
                  <Badge variant="outline" className={priorityColors[selectedSubmission.priority as keyof typeof priorityColors]}>
                    {priorityLabels[selectedSubmission.priority as keyof typeof priorityLabels]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedSubmission.first_name} {selectedSubmission.last_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedSubmission.email}</span>
                    </div>
                    {selectedSubmission.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedSubmission.phone}</span>
                      </div>
                    )}
                    {selectedSubmission.company && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedSubmission.company}</span>
                      </div>
                    )}
                    {selectedSubmission.job_title && (
                      <div className="text-muted-foreground">
                        {selectedSubmission.job_title}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Form Data</h4>
                  <div className="bg-muted/50 rounded-md p-3 text-sm">
                    <pre className="whitespace-pre-wrap text-xs">
                      {JSON.stringify(selectedSubmission.form_data, null, 2)}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Timeline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Submitted: {formatDate(selectedSubmission.created_at)}</span>
                    </div>
                    {selectedSubmission.read_at && (
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span>Read: {formatDate(selectedSubmission.read_at)}</span>
                      </div>
                    )}
                    {selectedSubmission.replied_at && (
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span>Replied: {formatDate(selectedSubmission.replied_at)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  {selectedSubmission.status === 'new' && (
                    <Button
                      size="sm"
                      onClick={() => updateSubmissionStatus(selectedSubmission.id, 'read')}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Mark Read
                    </Button>
                  )}
                  {selectedSubmission.status === 'read' && (
                    <Button
                      size="sm"
                      onClick={() => updateSubmissionStatus(selectedSubmission.id, 'replied')}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Mark Replied
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateSubmissionStatus(selectedSubmission.id, 'archived')}
                  >
                    <Archive className="h-3 w-3 mr-1" />
                    Archive
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground py-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p>Select a submission to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
