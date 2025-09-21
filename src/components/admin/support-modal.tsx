"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { 
  HelpCircle, 
  Send, 
  X, 
  AlertTriangle, 
  Bug, 
  Lightbulb, 
  Settings,
  FileText,
  CheckCircle
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const supportTicketSchema = z.object({
  type: z.enum(['bug', 'feature', 'question', 'other']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  stepsToReproduce: z.string().optional(),
  expectedBehavior: z.string().optional(),
  actualBehavior: z.string().optional(),
  browser: z.string().optional(),
  operatingSystem: z.string().optional(),
  url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  includeSystemInfo: z.boolean(),
  includeScreenshots: z.boolean()
})

type SupportTicketData = z.infer<typeof supportTicketSchema>

interface SupportModalProps {
  isOpen: boolean
  onClose: () => void
}

const ticketTypeIcons = {
  bug: Bug,
  feature: Lightbulb,
  question: HelpCircle,
  other: FileText
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<SupportTicketData>({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: {
      type: 'bug',
      priority: 'medium',
      subject: '',
      description: '',
      stepsToReproduce: '',
      expectedBehavior: '',
      actualBehavior: '',
      browser: '',
      operatingSystem: '',
      url: '',
      includeSystemInfo: false,
      includeScreenshots: false
    }
  })

  const ticketType = form.watch('type')
  const TypeIcon = ticketTypeIcons[ticketType]

  const onSubmit = async (data: SupportTicketData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the data to your support system
      console.log('Support ticket submitted:', data)
      
      setIsSubmitted(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        form.reset()
        setIsSubmitted(false)
        onClose()
      }, 3000)
      
    } catch (error) {
      console.error('Error submitting support ticket:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset()
      setIsSubmitted(false)
      onClose()
    }
  }

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center space-y-4 py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Ticket Submitted Successfully!</h3>
              <p className="text-muted-foreground">
                Thank you for your feedback. We'll review your ticket and get back to you soon.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5" />
            <span>Submit Support Ticket</span>
          </DialogTitle>
          <DialogDescription>
            Found a bug or have a suggestion? Let us know and we'll help you out.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Ticket Type and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Ticket Type *</Label>
              <Select
                value={form.watch('type')}
                onValueChange={(value) => form.setValue('type', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">
                    <div className="flex items-center space-x-2">
                      <Bug className="w-4 h-4" />
                      <span>Bug Report</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="feature">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4" />
                      <span>Feature Request</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="question">
                    <div className="flex items-center space-x-2">
                      <HelpCircle className="w-4 h-4" />
                      <span>Question</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="other">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>Other</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.type && (
                <p className="text-sm text-red-600">{form.formState.errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select
                value={form.watch('priority')}
                onValueChange={(value) => form.setValue('priority', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.priority && (
                <p className="text-sm text-red-600">{form.formState.errors.priority.message}</p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              placeholder="Brief description of the issue"
              {...form.register('subject')}
            />
            {form.formState.errors.subject && (
              <p className="text-sm text-red-600">{form.formState.errors.subject.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Please provide a detailed description of the issue or request"
              rows={4}
              {...form.register('description')}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-600">{form.formState.errors.description.message}</p>
            )}
          </div>

          {/* Bug-specific fields */}
          {ticketType === 'bug' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Bug Details</CardTitle>
                <CardDescription>
                  Help us reproduce and fix the issue faster
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stepsToReproduce">Steps to Reproduce</Label>
                  <Textarea
                    id="stepsToReproduce"
                    placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                    rows={3}
                    {...form.register('stepsToReproduce')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expectedBehavior">Expected Behavior</Label>
                    <Textarea
                      id="expectedBehavior"
                      placeholder="What should happen?"
                      rows={2}
                      {...form.register('expectedBehavior')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="actualBehavior">Actual Behavior</Label>
                    <Textarea
                      id="actualBehavior"
                      placeholder="What actually happens?"
                      rows={2}
                      {...form.register('actualBehavior')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">System Information</CardTitle>
              <CardDescription>
                Optional information to help us debug the issue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="browser">Browser</Label>
                  <Input
                    id="browser"
                    placeholder="e.g., Chrome 120, Firefox 119"
                    {...form.register('browser')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operatingSystem">Operating System</Label>
                  <Input
                    id="operatingSystem"
                    placeholder="e.g., Windows 11, macOS 14, Ubuntu 22.04"
                    {...form.register('operatingSystem')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL where issue occurred</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://elevationai.com/page"
                  {...form.register('url')}
                />
                {form.formState.errors.url && (
                  <p className="text-sm text-red-600">{form.formState.errors.url.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeSystemInfo"
                    {...form.register('includeSystemInfo')}
                  />
                  <Label htmlFor="includeSystemInfo" className="text-sm">
                    Include system information (browser details, screen resolution, etc.)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeScreenshots"
                    {...form.register('includeScreenshots')}
                  />
                  <Label htmlFor="includeScreenshots" className="text-sm">
                    I have screenshots to attach (you'll be contacted for these)
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Submit Ticket</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
