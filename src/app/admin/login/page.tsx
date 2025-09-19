"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { activityService } from '@/lib/activity-service'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { H2, BodyLarge } from '@/components/ui/typography'
import { AnimatedFavicon } from '@/components/ui/animated-favicon'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  
  const supabase = createClient()
  const router = useRouter()

  // Load saved credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('admin_email')
    const savedRememberMe = localStorage.getItem('admin_remember_me')
    
    if (savedEmail && savedRememberMe === 'true') {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else if (data.user) {
        // Log the login activity
        try {
          await activityService.logLogin(data.user.email || 'Unknown User')
        } catch (logError) {
          console.error('Error logging login activity:', logError)
          // Don't block login if logging fails
        }
        
        // Handle remember me functionality
        if (rememberMe) {
          localStorage.setItem('admin_email', email)
          localStorage.setItem('admin_remember_me', 'true')
        } else {
          localStorage.removeItem('admin_email')
          localStorage.removeItem('admin_remember_me')
        }
        
        router.push('/admin')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 flex items-center justify-center px-3 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
        <Card className="w-full h-fit">
          <CardHeader className="text-center pt-6 sm:pt-8 pb-4 sm:pb-6">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Link href="/website/home" className="hover:opacity-80 transition-opacity">
                <div className="relative h-10 w-28 sm:h-12 sm:w-32">
                  <AnimatedFavicon 
                    width={128} 
                    height={48} 
                    className="w-full h-full"
                  />
                </div>
              </Link>
            </div>
            <CardTitle>
              <H2 className="text-xl sm:text-2xl lg:text-3xl">Admin Access</H2>
            </CardTitle>
            <CardDescription>
              <BodyLarge className="text-muted-foreground text-sm sm:text-base">
                Sign in to manage your Elevation AI content
              </BodyLarge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-4 sm:px-6 pb-6 sm:pb-8">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@elevationai.com"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember-me"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                >
                  Remember me
                </label>
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-md">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Environment: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Connected' : 'Disconnected'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}