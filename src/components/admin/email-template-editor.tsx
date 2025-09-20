"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { H1, H2, H3, P, BodyLarge, BodySmall } from '@/components/ui/typography'
import { 
  Save, 
  Eye, 
  Code, 
  Palette, 
  Settings,
  Undo,
  Redo,
  Copy,
  Download
} from 'lucide-react'
import Icon from '@/components/ui/icon'

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

interface EmailTemplateEditorProps {
  template: EmailTemplate
}

export function EmailTemplateEditor({ template }: EmailTemplateEditorProps) {
  const [activeTab, setActiveTab] = useState('content')
  const [subject, setSubject] = useState('Welcome to Elevation AI Newsletter!')
  const [previewText, setPreviewText] = useState('Thank you for subscribing to our newsletter. Get ready for the latest insights...')
  const [htmlContent, setHtmlContent] = useState(`
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
        <div style="color: white; font-size: 24px; font-weight: bold; margin-bottom: 8px;">Welcome to Elevation AI</div>
        <div style="color: rgba(255,255,255,0.9); font-size: 16px;">The business orchestration platform</div>
      </div>
      
      <!-- Main Content -->
      <div style="padding: 40px 20px;">
        <h1 style="color: #1a1a1a; font-size: 28px; margin-bottom: 16px; text-align: center;">Welcome to Our Newsletter!</h1>
        <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          Thank you for subscribing to our newsletter! You're now part of a community that's shaping the future of agentic AI and business automation.
        </p>
        
        <div style="background-color: #f8f9fa; padding: 24px; border-radius: 8px; margin: 24px 0;">
          <h2 style="color: #1a1a1a; font-size: 20px; margin-bottom: 12px;">What to Expect</h2>
          <ul style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
            <li>Weekly insights on agentic AI trends</li>
            <li>Platform updates and new features</li>
            <li>Industry best practices and case studies</li>
            <li>Exclusive content from our expert network</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="#" style="background-color: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
            Explore Our Platform
          </a>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f8f9fa; padding: 24px 20px; text-align: center; border-top: 1px solid #e9ecef;">
        <p style="color: #666666; font-size: 12px; margin: 0;">
          © 2025 Elevation AI. All rights reserved.<br>
          You received this email because you subscribed to our newsletter.
        </p>
      </div>
    </div>
  `)

  const handleSave = () => {
    // Save logic here
    console.log('Saving template...', { subject, previewText, htmlContent })
  }

  const handlePreview = () => {
    // Preview logic here
    console.log('Previewing template...')
  }

  return (
    <div className="space-y-6">
      {/* Editor Header */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 text-xl font-semibold text-foreground">
                <Icon name={template.icon} className={`h-6 w-6 ${template.color}`} />
                Edit: {template.name}
              </CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">{template.description}</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="h-9">
                <Undo className="h-4 w-4 mr-2" />
                Undo
              </Button>
              <Button variant="outline" size="sm" className="h-9">
                <Redo className="h-4 w-4 mr-2" />
                Redo
              </Button>
              <Button variant="outline" size="sm" onClick={handlePreview} className="h-9">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" onClick={handleSave} className="h-9">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Editor Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="content" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
            <Code className="h-4 w-4 mr-2" />
            Content
          </TabsTrigger>
          <TabsTrigger value="design" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
            <Palette className="h-4 w-4 mr-2" />
            Design
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Settings */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-foreground">Basic Settings</CardTitle>
                <CardDescription className="text-muted-foreground">Configure the basic email properties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-foreground">Subject Line</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter email subject line"
                    className="h-10"
                  />
                  <P className="text-xs text-muted-foreground">Keep it concise and engaging</P>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preview" className="text-sm font-medium text-foreground">Preview Text</Label>
                  <Textarea
                    id="preview"
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                    placeholder="Enter preview text (appears in email clients)"
                    rows={3}
                    className="resize-none"
                  />
                  <P className="text-xs text-muted-foreground">This appears in the email preview</P>
                </div>
              </CardContent>
            </Card>

            {/* Template Variables */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-foreground">Template Variables</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Use these variables in your email content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
                    <code className="text-sm font-mono text-foreground">{'{{user_name}}'}</code>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
                    <code className="text-sm font-mono text-foreground">{'{{user_email}}'}</code>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
                    <code className="text-sm font-mono text-foreground">{'{{company_name}}'}</code>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
                    <code className="text-sm font-mono text-foreground">{'{{unsubscribe_url}}'}</code>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* HTML Editor */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground">HTML Content</CardTitle>
                  <CardDescription className="text-muted-foreground mt-1">Edit the raw HTML content of your email</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="h-9">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="h-9">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="Enter your HTML email content here..."
                rows={20}
                className="font-mono text-sm resize-none border-border/50 focus:border-primary/50"
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Design Tab */}
        <TabsContent value="design" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Color Scheme */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Color Scheme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Primary Color</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="color"
                      defaultValue="#667eea"
                      className="w-12 h-8 rounded border"
                    />
                    <Input value="#667eea" className="flex-1" />
                  </div>
                </div>
                <div>
                  <Label>Secondary Color</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="color"
                      defaultValue="#764ba2"
                      className="w-12 h-8 rounded border"
                    />
                    <Input value="#764ba2" className="flex-1" />
                  </div>
                </div>
                <div>
                  <Label>Text Color</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="color"
                      defaultValue="#1a1a1a"
                      className="w-12 h-8 rounded border"
                    />
                    <Input value="#1a1a1a" className="flex-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Typography</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Font Family</Label>
                  <select className="w-full p-2 border rounded mt-2">
                    <option>System Fonts</option>
                    <option>Google Fonts</option>
                    <option>Custom Font</option>
                  </select>
                </div>
                <div>
                  <Label>Heading Size</Label>
                  <select className="w-full p-2 border rounded mt-2">
                    <option>24px</option>
                    <option>28px</option>
                    <option>32px</option>
                  </select>
                </div>
                <div>
                  <Label>Body Text Size</Label>
                  <select className="w-full p-2 border rounded mt-2">
                    <option>14px</option>
                    <option>16px</option>
                    <option>18px</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Layout Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Layout Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Container Width</Label>
                  <select className="w-full p-2 border rounded mt-2">
                    <option>600px (Recommended)</option>
                    <option>700px</option>
                    <option>800px</option>
                  </select>
                </div>
                <div>
                  <Label>Padding</Label>
                  <select className="w-full p-2 border rounded mt-2">
                    <option>20px</option>
                    <option>30px</option>
                    <option>40px</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Template Name</Label>
                  <Input value={template.name} />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={template.description} rows={3} />
                </div>
                <div>
                  <Label>Category</Label>
                  <select className="w-full p-2 border rounded mt-2">
                    <option value="confirmation">Confirmation</option>
                    <option value="marketing">Marketing</option>
                    <option value="transactional">Transactional</option>
                    <option value="notification">Notification</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Delivery Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>From Name</Label>
                  <Input value="Elevation AI" />
                </div>
                <div>
                  <Label>From Email</Label>
                  <Input value="noreply@elevationai.com" />
                </div>
                <div>
                  <Label>Reply To</Label>
                  <Input value="support@elevationai.com" />
                </div>
                <div>
                  <Label>Priority</Label>
                  <select className="w-full p-2 border rounded mt-2">
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Track Opens</Label>
                  <select className="w-full p-2 border rounded mt-2">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <Label>Track Clicks</Label>
                  <select className="w-full p-2 border rounded mt-2">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Email Preview</CardTitle>
              <CardDescription>
                This is how your email will appear to recipients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-3 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="ml-4 text-xs text-muted-foreground">
                      {subject}
                    </div>
                  </div>
                </div>
                <div 
                  className="bg-white max-h-[600px] overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
