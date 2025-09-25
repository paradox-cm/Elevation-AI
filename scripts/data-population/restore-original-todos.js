const { createClient } = require('@supabase/supabase-js')
const crypto = require('crypto')
require('dotenv').config({ path: '.env.local' })

// Generate UUID v4
function generateUUID() {
  return crypto.randomUUID()
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const originalTodos = [
  // Phase 1: Critical Infrastructure
  {
    title: 'Set up email service (SendGrid/Resend)',
    description: 'Integrate email service provider and connect form submissions to send notifications',
    phase: 'critical',
    category: 'Email System',
    status: 'pending',
    priority: 'urgent',
    estimated_effort: 'medium',
    tags: ['email', 'forms', 'notifications'],
    dependencies: []
  },
  {
    title: 'Connect form submissions to email notifications',
    description: 'Implement automated email notifications for new form submissions to admin team',
    phase: 'critical',
    category: 'Email System',
    status: 'pending',
    priority: 'urgent',
    estimated_effort: 'medium',
    tags: ['email', 'forms', 'automation'],
    dependencies: []
  },
  {
    title: 'Implement Google Analytics with proper tracking',
    description: 'Set up Google Analytics 4 with proper event tracking and data layer implementation',
    phase: 'critical',
    category: 'Analytics & Tracking',
    status: 'pending',
    priority: 'high',
    estimated_effort: 'medium',
    tags: ['analytics', 'tracking', 'ga4'],
    dependencies: []
  },
  {
    title: 'Connect cookie consent banner to actual tracking',
    description: 'Make cookie consent banner functional and integrate with Google Analytics consent mode',
    phase: 'critical',
    category: 'Analytics & Tracking',
    status: 'pending',
    priority: 'high',
    estimated_effort: 'quick',
    tags: ['cookies', 'consent', 'privacy'],
    dependencies: []
  },
  {
    title: 'Create sitemap.xml and robots.txt',
    description: 'Generate XML sitemap for all pages and create robots.txt for search engine crawling',
    phase: 'critical',
    category: 'SEO & Search Optimization',
    status: 'pending',
    priority: 'high',
    estimated_effort: 'quick',
    tags: ['seo', 'sitemap', 'robots'],
    dependencies: []
  },
  {
    title: 'Configure production environment variables',
    description: 'Set up all necessary environment variables for production deployment',
    phase: 'critical',
    category: 'Production Environment',
    status: 'pending',
    priority: 'urgent',
    estimated_effort: 'quick',
    tags: ['environment', 'deployment', 'config'],
    dependencies: []
  },
  {
    title: 'Set up error monitoring (Sentry)',
    description: 'Implement error tracking and monitoring service for production debugging',
    phase: 'critical',
    category: 'Security & Performance',
    status: 'pending',
    priority: 'high',
    estimated_effort: 'quick',
    tags: ['monitoring', 'errors', 'sentry'],
    dependencies: []
  },
  {
    title: 'Connect Login and Create Account forms to backend and dashboard',
    description: 'Wire up Login and Create Account to real auth backend (sessions/tokens), route authenticated users to the production admin dashboard, and handle errors/edge cases.',
    phase: 'critical',
    category: 'Authentication',
    status: 'pending',
    priority: 'urgent',
    estimated_effort: 'medium',
    tags: ['auth', 'login', 'signup', 'sessions'],
    dependencies: []
  },

  // Phase 2: SEO & Performance
  {
    title: 'Add structured data markup for all pages',
    description: 'Implement JSON-LD schema markup for better search engine understanding',
    phase: 'high',
    category: 'SEO & Search Optimization',
    status: 'pending',
    priority: 'medium',
    estimated_effort: 'extensive',
    tags: ['seo', 'schema', 'structured-data'],
    dependencies: []
  },
  {
    title: 'Optimize meta tags for each page',
    description: 'Ensure all pages have unique, optimized title tags, descriptions, and Open Graph tags',
    phase: 'high',
    category: 'SEO & Search Optimization',
    status: 'pending',
    priority: 'medium',
    estimated_effort: 'medium',
    tags: ['seo', 'meta', 'opengraph'],
    dependencies: []
  },
  {
    title: 'Implement security headers',
    description: 'Add Content Security Policy, HSTS, and other security headers',
    phase: 'high',
    category: 'Security & Performance',
    status: 'pending',
    priority: 'high',
    estimated_effort: 'medium',
    tags: ['security', 'headers', 'csp'],
    dependencies: []
  },
  {
    title: 'Set up performance monitoring',
    description: 'Implement real user monitoring and Core Web Vitals tracking',
    phase: 'high',
    category: 'Security & Performance',
    status: 'pending',
    priority: 'medium',
    estimated_effort: 'quick',
    tags: ['performance', 'monitoring', 'web-vitals'],
    dependencies: []
  },
  {
    title: 'Add rate limiting to API endpoints',
    description: 'Implement rate limiting to prevent abuse of form submission and other API endpoints',
    phase: 'high',
    category: 'Security & Performance',
    status: 'pending',
    priority: 'medium',
    estimated_effort: 'medium',
    tags: ['api', 'rate-limiting', 'security'],
    dependencies: []
  },

  // Phase 3: Content & UX
  {
    title: 'Replace mock form validation with real validation',
    description: 'Remove simulated form validation and implement proper client/server validation',
    phase: 'medium',
    category: 'Content & UX Polish',
    status: 'pending',
    priority: 'medium',
    estimated_effort: 'medium',
    tags: ['forms', 'validation', 'ux'],
    dependencies: []
  },
  {
    title: 'Implement proper error boundaries',
    description: 'Add comprehensive error boundaries throughout the application',
    phase: 'medium',
    category: 'Content & UX Polish',
    status: 'pending',
    priority: 'medium',
    estimated_effort: 'medium',
    tags: ['errors', 'boundaries', 'ux'],
    dependencies: []
  },
  {
    title: 'Add comprehensive loading states',
    description: 'Ensure all async operations have proper loading states and user feedback',
    phase: 'medium',
    category: 'Content & UX Polish',
    status: 'pending',
    priority: 'low',
    estimated_effort: 'extensive',
    tags: ['loading', 'ux', 'feedback'],
    dependencies: []
  },
  {
    title: 'Test and fix accessibility issues',
    description: 'Comprehensive accessibility audit and fixes for WCAG compliance',
    phase: 'medium',
    category: 'Content & UX Polish',
    status: 'pending',
    priority: 'medium',
    estimated_effort: 'extensive',
    tags: ['accessibility', 'a11y', 'wcag'],
    dependencies: []
  },
  {
    title: 'Mobile optimization review',
    description: 'Comprehensive mobile testing and optimization across different devices',
    phase: 'medium',
    category: 'Content & UX Polish',
    status: 'pending',
    priority: 'medium',
    estimated_effort: 'medium',
    tags: ['mobile', 'responsive', 'testing'],
    dependencies: []
  },

  // Phase 4: Testing & Launch
  {
    title: 'Add unit tests for critical components',
    description: 'Implement unit tests for forms, API endpoints, and core functionality',
    phase: 'low',
    category: 'Testing & Quality Assurance',
    status: 'pending',
    priority: 'low',
    estimated_effort: 'extensive',
    tags: ['testing', 'unit-tests', 'quality'],
    dependencies: []
  },
  {
    title: 'Cross-browser testing',
    description: 'Test application across different browsers and devices',
    phase: 'low',
    category: 'Testing & Quality Assurance',
    status: 'pending',
    priority: 'medium',
    estimated_effort: 'medium',
    tags: ['testing', 'browsers', 'compatibility'],
    dependencies: []
  },
  {
    title: 'Load testing for production traffic',
    description: 'Perform load testing to ensure application can handle production traffic',
    phase: 'low',
    category: 'Testing & Quality Assurance',
    status: 'pending',
    priority: 'medium',
    estimated_effort: 'medium',
    tags: ['testing', 'load', 'performance'],
    dependencies: []
  },
  {
    title: 'Backup and disaster recovery setup',
    description: 'Implement database backup strategy and disaster recovery procedures',
    phase: 'low',
    category: 'Production Environment',
    status: 'pending',
    priority: 'high',
    estimated_effort: 'medium',
    tags: ['backup', 'disaster-recovery', 'production'],
    dependencies: []
  },
  {
    title: 'Final security audit',
    description: 'Comprehensive security review and penetration testing',
    phase: 'low',
    category: 'Security & Performance',
    status: 'pending',
    priority: 'high',
    estimated_effort: 'extensive',
    tags: ['security', 'audit', 'penetration-testing'],
    dependencies: []
  },

  // Phase 5: Handoff & Site Delivery
  {
    title: 'Comprehensive handoff and site delivery',
    description: 'Complete transfer of codebase, documentation, and operational knowledge to in-house team',
    phase: 'critical',
    category: 'Handoff & Delivery',
    status: 'pending',
    priority: 'urgent',
    estimated_effort: 'extensive',
    tags: ['handoff', 'delivery', 'documentation', 'knowledge-transfer'],
    dependencies: []
  },
  {
    title: 'Complete codebase documentation',
    description: 'Create comprehensive technical documentation including architecture, deployment, and maintenance guides',
    phase: 'critical',
    category: 'Handoff & Delivery',
    status: 'pending',
    priority: 'urgent',
    estimated_effort: 'extensive',
    tags: ['documentation', 'architecture', 'technical-writing'],
    dependencies: []
  },
  {
    title: 'GitHub repository transfer and access setup',
    description: 'Transfer repository ownership, set up team access, and configure branch protection rules',
    phase: 'critical',
    category: 'Handoff & Delivery',
    status: 'pending',
    priority: 'urgent',
    estimated_effort: 'medium',
    tags: ['github', 'repository', 'access-control', 'collaboration'],
    dependencies: []
  },
  {
    title: 'Deployment and infrastructure documentation',
    description: 'Document deployment processes, environment setup, and infrastructure management procedures',
    phase: 'critical',
    category: 'Handoff & Delivery',
    status: 'pending',
    priority: 'urgent',
    estimated_effort: 'extensive',
    tags: ['deployment', 'infrastructure', 'devops', 'documentation'],
    dependencies: []
  },
  {
    title: 'Monitoring and alerting system setup',
    description: 'Configure monitoring dashboards, alerting rules, and incident response procedures',
    phase: 'critical',
    category: 'Handoff & Delivery',
    status: 'pending',
    priority: 'high',
    estimated_effort: 'medium',
    tags: ['monitoring', 'alerting', 'incident-response', 'operations'],
    dependencies: []
  },
  {
    title: 'Team training and knowledge transfer sessions',
    description: 'Conduct training sessions for in-house team on codebase, deployment, and maintenance procedures',
    phase: 'critical',
    category: 'Handoff & Delivery',
    status: 'pending',
    priority: 'high',
    estimated_effort: 'extensive',
    tags: ['training', 'knowledge-transfer', 'team-education'],
    dependencies: []
  },
  {
    title: 'Create maintenance and troubleshooting runbooks',
    description: 'Develop step-by-step guides for common maintenance tasks and troubleshooting procedures',
    phase: 'critical',
    category: 'Handoff & Delivery',
    status: 'pending',
    priority: 'high',
    estimated_effort: 'extensive',
    tags: ['runbooks', 'maintenance', 'troubleshooting', 'procedures'],
    dependencies: []
  },
  {
    title: 'Security credentials and access management',
    description: 'Transfer API keys, certificates, and configure proper access management for production systems',
    phase: 'critical',
    category: 'Handoff & Delivery',
    status: 'pending',
    priority: 'urgent',
    estimated_effort: 'medium',
    tags: ['security', 'credentials', 'access-management', 'api-keys'],
    dependencies: []
  },
  {
    title: 'Backup and recovery procedures documentation',
    description: 'Document and test backup procedures, recovery processes, and disaster recovery protocols',
    phase: 'critical',
    category: 'Handoff & Delivery',
    status: 'pending',
    priority: 'high',
    estimated_effort: 'medium',
    tags: ['backup', 'recovery', 'disaster-recovery', 'procedures'],
    dependencies: []
  },
  {
    title: 'Final acceptance testing with in-house team',
    description: 'Conduct comprehensive acceptance testing with the in-house team to ensure all systems are working correctly',
    phase: 'critical',
    category: 'Handoff & Delivery',
    status: 'pending',
    priority: 'urgent',
    estimated_effort: 'extensive',
    tags: ['acceptance-testing', 'final-testing', 'team-validation'],
    dependencies: []
  }
]

async function restoreOriginalTodos() {
  try {
    console.log('Starting to restore original todos...')
    
    // First, clear existing todos
    console.log('Clearing existing todos...')
    const { error: deleteError } = await supabase
      .from('admin_todos')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all records
    
    if (deleteError) {
      console.error('Error clearing existing todos:', deleteError)
      return
    }
    
    console.log('Existing todos cleared successfully')
    
    // Insert original todos with generated UUIDs
    console.log('Inserting original todos...')
    const todosWithIds = originalTodos.map(todo => ({
      ...todo,
      id: generateUUID()
    }))
    
    const { data, error } = await supabase
      .from('admin_todos')
      .insert(todosWithIds)
      .select()
    
    if (error) {
      console.error('Error inserting original todos:', error)
      return
    }
    
    console.log(`Successfully restored ${data.length} original todos`)
    console.log('Original todos restored successfully!')
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

restoreOriginalTodos()