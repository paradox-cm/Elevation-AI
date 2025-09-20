"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { H1, H2, H3, P, BodySmall } from '@/components/ui/typography'
import { 
  Clock,
  Users,
  MessageSquare,
  Handshake,
  Calendar,
  Mail
} from 'lucide-react'
import Icon from '@/components/ui/icon'
import { EmailTemplatePreview } from '@/components/admin/email-template-preview'

interface EmailTemplate {
  id: string
  name: string
  description: string
  category: 'confirmation' | 'marketing' | 'notification' | 'transactional'
  status: 'active' | 'draft' | 'archived'
  lastModified: string
  usage: number
  icon: string
  color: string
}

const emailTemplates: EmailTemplate[] = [
  {
    id: 'newsletter-welcome',
    name: 'Newsletter Welcome',
    description: 'Welcome email for new newsletter subscribers',
    category: 'marketing',
    status: 'active',
    lastModified: '2025-01-15',
    usage: 0,
    icon: 'mail-line',
    color: 'text-blue-500'
  },
  {
    id: 'contact-confirmation',
    name: 'Contact Form Confirmation',
    description: 'Confirmation email after contact form submission',
    category: 'confirmation',
    status: 'active',
    lastModified: '2025-01-14',
    usage: 0,
    icon: 'mail-send-line',
    color: 'text-green-500'
  },
  {
    id: 'demo-request-confirmation',
    name: 'Demo Request Confirmation',
    description: 'Confirmation email for demo requests',
    category: 'confirmation',
    status: 'active',
    lastModified: '2025-01-13',
    usage: 0,
    icon: 'calendar-line',
    color: 'text-purple-500'
  },
  {
    id: 'partnership-application',
    name: 'Partnership Application Confirmation',
    description: 'Confirmation email for partnership applications',
    category: 'confirmation',
    status: 'active',
    lastModified: '2025-01-12',
    usage: 0,
    icon: 'user-settings-line',
    color: 'text-orange-500'
  },
  {
    id: 'consultation-request',
    name: 'Consultation Request Confirmation',
    description: 'Confirmation email for consultation requests',
    category: 'confirmation',
    status: 'active',
    lastModified: '2025-01-11',
    usage: 0,
    icon: 'user-line',
    color: 'text-indigo-500'
  },
  {
    id: 'account-created',
    name: 'Account Created Welcome',
    description: 'Welcome email for new account creation',
    category: 'transactional',
    status: 'active',
    lastModified: '2025-01-10',
    usage: 0,
    icon: 'user-add-line',
    color: 'text-cyan-500'
  },
  {
    id: 'password-reset',
    name: 'Password Reset',
    description: 'Password reset instructions and security information',
    category: 'transactional',
    status: 'active',
    lastModified: '2025-01-15',
    usage: 0,
    icon: 'lock-line',
    color: 'text-red-500'
  },
  {
    id: 'security-code',
    name: 'Security Code',
    description: 'One-time security code for account verification',
    category: 'notification',
    status: 'active',
    lastModified: '2025-01-15',
    usage: 0,
    icon: 'shield-check-line',
    color: 'text-red-500'
  },
  {
    id: 'monthly-digest',
    name: 'Monthly Digest',
    description: 'Monthly newsletter with platform updates',
    category: 'marketing',
    status: 'active',
    lastModified: '2025-01-10',
    usage: 0,
    icon: 'calendar-line',
    color: 'text-purple-500'
  }
]

const categories = [
  { id: 'all', name: 'All Templates', count: emailTemplates.length },
  { id: 'confirmation', name: 'Confirmations', count: emailTemplates.filter(t => t.category === 'confirmation').length },
  { id: 'marketing', name: 'Marketing', count: emailTemplates.filter(t => t.category === 'marketing').length },
  { id: 'transactional', name: 'Transactional', count: emailTemplates.filter(t => t.category === 'transactional').length },
  { id: 'notification', name: 'Notifications', count: emailTemplates.filter(t => t.category === 'notification').length }
]

export default function EmailsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredTemplates = selectedCategory === 'all' 
    ? emailTemplates 
    : emailTemplates.filter(template => template.category === selectedCategory)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'confirmation': return 'check-circle-line'
      case 'marketing': return 'megaphone-line'
      case 'transactional': return 'file-text-line'
      case 'notification': return 'bell-line'
      default: return 'mail-line'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <H1>Email Templates</H1>
          <P className="text-muted-foreground">
            Manage and customize all email templates for your application
          </P>
        </div>
      </div>

      {/* Categories Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <Icon name={getCategoryIcon(category.id)} className="h-4 w-4" />
                {category.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - Templates List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Templates List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`w-full p-3 rounded-md text-left transition-colors ${
                    selectedTemplate?.id === template.id
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-muted border border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Icon name={template.icon} className={`h-4 w-4 ${template.color} flex-shrink-0`} />
                      <span className="text-sm font-medium truncate">{template.name}</span>
                    </div>
                    <Badge className={`text-xs flex-shrink-0 ml-2 ${getStatusColor(template.status)}`}>
                      {template.status}
                    </Badge>
                  </div>
                  <BodySmall className="text-muted-foreground mb-2 line-clamp-2">
                    {template.description}
                  </BodySmall>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="truncate">{template.usage} sent</span>
                    <span className="flex-shrink-0 ml-2">{template.lastModified}</span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {selectedTemplate ? (
            <div className="space-y-4">
              {/* Template Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name={selectedTemplate.icon} className={`h-6 w-6 ${selectedTemplate.color}`} />
                      <div>
                        <H3 className="text-lg font-semibold">{selectedTemplate.name}</H3>
                        <P className="text-sm text-muted-foreground">{selectedTemplate.description}</P>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(selectedTemplate.status)}>
                        {selectedTemplate.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Template Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Template Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <EmailTemplatePreview template={selectedTemplate} />
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                <H2>Select a Template</H2>
                <P className="text-muted-foreground text-center">
                  Choose a template from the sidebar to preview it.
                </P>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
