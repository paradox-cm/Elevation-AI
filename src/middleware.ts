import { updateSession } from '@/lib/supabase/middleware'
import { NextRequest } from 'next/server'

const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.vercel-insights.com https://vitals.vercel-insights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https: data:",
  "connect-src 'self' https: wss:",
  "media-src 'self' https:",
  "frame-src 'self' https:",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "worker-src 'self' blob:",
  'upgrade-insecure-requests',
  'report-to csp-endpoint',
  'report-uri https://elevationai.com/api/csp-report',
]

const cspReportOnlyValue = cspDirectives.join('; ')

const reportToValue = JSON.stringify({
  group: 'csp-endpoint',
  max_age: 10886400,
  endpoints: [{ url: 'https://elevationai.com/api/csp-report' }],
})

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)

  response.headers.set('Content-Security-Policy-Report-Only', cspReportOnlyValue)
  response.headers.set('Report-To', reportToValue)
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    [
      'accelerometer=()',
      'autoplay=()',
      'camera=()',
      'display-capture=()',
      'encrypted-media=()',
      'fullscreen=(self)',
      'geolocation=()',
      'gyroscope=()',
      'interest-cohort=()',
      'magnetometer=()',
      'microphone=()',
      'midi=()',
      'payment=()',
      'usb=()',
      'browsing-topics=()'
    ].join(', ')
  )
  response.headers.set('X-XSS-Protection', '1; mode=block')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
