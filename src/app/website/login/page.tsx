"use client"

import React from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { H2, BodyLarge, BodySmall } from "@/components/ui/typography"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AnimatedFavicon } from "@/components/ui/animated-favicon"
import { GlobalHeader } from "@/components/ui/global-header"

// Form validation schema
const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormData = z.infer<typeof loginFormSchema>

// Login Form Component
function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
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
          <H2 className="text-xl sm:text-2xl lg:text-3xl">Welcome back</H2>
        </CardTitle>
        <CardDescription>
          <BodyLarge className="text-muted-foreground text-sm sm:text-base">
            Sign in to your Elevation AI account
          </BodyLarge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-4 sm:px-6 pb-6 sm:pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter your email"
                        className="pl-10 h-10 sm:h-11"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                              <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 h-10 sm:h-11"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 sm:h-9 sm:w-9"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-xs sm:text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>
              <Link
                href="#"
                className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-10 sm:h-11"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>
        </Form>

        <div className="relative pt-4">
          <div className="flex items-center">
            <div className="flex-1 h-px bg-border"></div>
            <span className="px-3 text-xs uppercase text-muted-foreground">
              Or
            </span>
            <div className="flex-1 h-px bg-border"></div>
          </div>
        </div>

        <div className="pt-4">
          <button className="w-full h-10 sm:h-11 bg-transparent border border-border rounded-md hover:bg-muted/50 hover:border-border/80 transition-all duration-200 flex items-center justify-center text-sm font-medium text-foreground">
            <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="text-center pt-4 pb-2">
          <BodySmall className="text-muted-foreground text-xs sm:text-sm">
            Don't have an account?{" "}
            <Link
              href="/website/sign-up"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Get started
            </Link>
          </BodySmall>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Login Page
export default function LoginPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-background transition-colors duration-300 flex flex-col">
        {/* Global Header */}
        <GlobalHeader showLogin={false} showDemo={false} />

        <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
            <LoginForm />
          </div>
        </main>
      </div>
    </PageWrapper>
  )
}
