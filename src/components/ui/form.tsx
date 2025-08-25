"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Icon from "@/components/ui/icon"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const formContext = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  if (!formContext) {
    throw new Error("useFormField should be used within <Form>")
  }

  const { formState } = formContext
  const fieldState = formState?.errors?.[fieldContext.name]

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

// Enhanced Form Input Components
const FormInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & {
    icon?: string
    status?: "default" | "success" | "error" | "warning"
  }
>(({ className, icon, status = "default", ...props }, ref) => {
  const { error } = useFormField()

  const statusClasses = {
    default: "",
    success: "border-green-500 focus:border-green-500 dark:border-green-400 dark:focus:border-green-400",
    error: "border-destructive focus:border-destructive",
    warning: "border-yellow-500 focus:border-yellow-500 dark:border-yellow-400 dark:focus:border-yellow-400",
  }

  const statusIcon = {
    success: "check-line",
    error: "close-line",
    warning: "alert-line",
  }

  const currentStatus = error ? "error" : status

  return (
    <div className="relative">
      {icon && (
        <Icon 
          name={icon} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" 
        />
      )}
      <Input
        ref={ref}
        className={cn(
          icon && "pl-10",
          statusClasses[currentStatus],
          className
        )}
        {...props}
      />
      {currentStatus !== "default" && (
        <Icon 
          name={statusIcon[currentStatus]} 
          className={cn(
            "absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
            currentStatus === "success" && "text-green-500 dark:text-green-400",
            currentStatus === "error" && "text-destructive",
            currentStatus === "warning" && "text-yellow-500 dark:text-yellow-400"
          )} 
        />
      )}
    </div>
  )
})
FormInput.displayName = "FormInput"

const FormTextarea = React.forwardRef<
  React.ElementRef<typeof Textarea>,
  React.ComponentPropsWithoutRef<typeof Textarea> & {
    status?: "default" | "success" | "error" | "warning"
  }
>(({ className, status = "default", ...props }, ref) => {
  const { error } = useFormField()

  const statusClasses = {
    default: "",
    success: "border-green-500 focus:border-green-500 dark:border-green-400 dark:focus:border-green-400",
    error: "border-destructive focus:border-destructive",
    warning: "border-yellow-500 focus:border-yellow-500 dark:border-yellow-400 dark:focus:border-yellow-400",
  }

  const currentStatus = error ? "error" : status

  return (
    <Textarea
      ref={ref}
      className={cn(statusClasses[currentStatus], className)}
      {...props}
    />
  )
})
FormTextarea.displayName = "FormTextarea"

const FormSelect = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  React.ComponentPropsWithoutRef<typeof SelectTrigger> & {
    status?: "default" | "success" | "error" | "warning"
  }
>(({ className, status = "default", ...props }, ref) => {
  const { error } = useFormField()

  const statusClasses = {
    default: "",
    success: "border-green-500 focus:border-green-500 dark:border-green-400 dark:focus:border-green-400",
    error: "border-destructive focus:border-destructive",
    warning: "border-yellow-500 focus:border-yellow-500 dark:border-yellow-400 dark:focus:border-yellow-400",
  }

  const currentStatus = error ? "error" : status

  return (
    <SelectTrigger
      ref={ref}
      className={cn(statusClasses[currentStatus], className)}
      {...props}
    />
  )
})
FormSelect.displayName = "FormSelect"

// Form Field Group Component
const FormFieldGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title?: string
    description?: string
  }
>(({ className, title, description, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      {(title || description) && (
        <div className="space-y-2">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  )
})
FormFieldGroup.displayName = "FormFieldGroup"

// Form Section Component
const FormSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title?: string
    description?: string
    collapsible?: boolean
  }
>(({ className, title, description, collapsible = false, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-6", className)} {...props}>
      {(title || description) && (
        <div className="space-y-2">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  )
})
FormSection.displayName = "FormSection"

// Form Status Component
const FormStatus = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    status: "success" | "error" | "warning" | "info"
    title?: string
    message?: string
  }
>(({ className, status, title, message, children, ...props }, ref) => {
  const statusConfig = {
    success: {
      icon: "check-line",
      className: "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
      iconClassName: "text-green-500 dark:text-green-400",
    },
    error: {
      icon: "close-line",
      className: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
      iconClassName: "text-red-500 dark:text-red-400",
    },
    warning: {
      icon: "alert-line",
      className: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
      iconClassName: "text-yellow-500 dark:text-yellow-400",
    },
    info: {
      icon: "information-line",
      className: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
      iconClassName: "text-blue-500 dark:text-blue-400",
    },
  }

  const config = statusConfig[status]

  return (
    <Alert ref={ref} className={cn(config.className, className)} {...props}>
      <Icon name={config.icon} className={cn("h-4 w-4", config.iconClassName)} />
      {(title || message) && (
        <div>
          {title && <AlertDescription className="font-medium">{title}</AlertDescription>}
          {message && <AlertDescription>{message}</AlertDescription>}
        </div>
      )}
      {children}
    </Alert>
  )
})
FormStatus.displayName = "FormStatus"

// Form Actions Component
const FormActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    align?: "left" | "center" | "right"
  }
>(({ className, align = "right", children, ...props }, ref) => {
  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2",
        alignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
FormActions.displayName = "FormActions"

// Form Progress Component
const FormProgress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    currentStep: number
    totalSteps: number
    steps?: string[]
  }
>(({ className, currentStep, totalSteps, steps, ...props }, ref) => {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      {steps && (
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center space-y-1",
                index < currentStep && "text-primary",
                index === currentStep - 1 && "text-primary font-medium",
                index > currentStep - 1 && "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  index < currentStep && "bg-primary",
                  index === currentStep - 1 && "bg-primary",
                  index > currentStep - 1 && "bg-muted"
                )}
              />
              <span className="text-xs">{step}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})
FormProgress.displayName = "FormProgress"

export {
  useFormField,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormInput,
  FormTextarea,
  FormSelect,
  FormFieldGroup,
  FormSection,
  FormStatus,
  FormActions,
  FormProgress,
}
