# Form Implementation Standards

## **Overview**
This document defines the global standards for implementing forms across the Elevation AI application. All forms must follow these standards to ensure consistency, accessibility, and proper spacing.

## **Core Principle**
**Always use the design system Form components instead of creating custom form layouts.** This ensures consistent spacing, behavior, and accessibility across all forms.

## **Required Components**

### **1. Form Container**
```tsx
import { Form } from "@/components/ui/form"

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    {/* Form fields go here */}
  </form>
</Form>
```

### **2. Form Fields**
```tsx
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Field Label</FormLabel>
      <FormControl>
        <Input placeholder="Enter value..." {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### **3. Form Field Groups (For Related Fields)**
```tsx
import { FormFieldGroup } from "@/components/ui/form"

<FormFieldGroup title="Section Title">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <FormField name="firstName" render={({ field }) => (
      <FormItem>
        <FormLabel>First Name</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
    <FormField name="lastName" render={({ field }) => (
      <FormItem>
        <FormLabel>Last Name</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  </div>
</FormFieldGroup>
```

### **4. Form Validation**
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  fieldName: z.string().min(1, "Field is required"),
})

const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    fieldName: "",
  },
})
```

## **Spacing Standards**

### **Form Field Spacing**
- **Label to Input**: `space-y-2` (8px) - Automatically provided by `FormItem`
- **Between Form Fields**: `space-y-6` (24px) - Automatically provided by `Form` component
- **Form Sections**: `space-y-5` (20px) - Between major form sections
- **Field Groups**: `space-y-4` (16px) - Between field groups within a section

### **Implementation**
```tsx
// ✅ CORRECT - Uses design system components
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormFieldGroup title="Personal Information">
      <FormField name="email" render={({ field }) => (
        <FormItem> {/* Provides space-y-2 (8px) between label and input */}
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </FormFieldGroup> {/* Provides space-y-4 (16px) between field groups */}
  </form> {/* Provides space-y-6 (24px) between form sections */}
</Form>

// ❌ INCORRECT - Custom spacing patterns
<form className="space-y-4">
  <div className="space-y-3">
    <label>Email</label>
    <input />
  </div>
</form>
```

## **Multi-Step Form Pattern**

For multi-step forms, use this exact structure:

```tsx
const renderStepContent = () => {
  switch (currentStep) {
    case 1:
      return (
        <FormFieldGroup title="Step Title">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField name="field1" render={({ field }) => (
              <FormItem>
                <FormLabel>Field 1</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="field2" render={({ field }) => (
              <FormItem>
                <FormLabel>Field 2</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </FormFieldGroup>
      )
    // ... other cases
  }
}
```

## **Complete Form Example**

```tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormFieldGroup } from "@/components/ui/form"

// 1. Define schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
})

// 2. Create form
const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: { email: "", name: "" },
})

// 3. Render form
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormFieldGroup title="Contact Information">
      <FormField name="email" render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="Enter email..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField name="name" render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter name..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </FormFieldGroup>
  </form>
</Form>
```

## **Required Imports for All Forms**

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormFieldGroup } from "@/components/ui/form"
```

## **Grid Layout Standards**

For multi-column layouts within field groups:
- **Two columns**: `className="grid grid-cols-1 sm:grid-cols-2 gap-6"`
- **Three columns**: `className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"`
- **Responsive**: Always start with single column on mobile, expand on larger screens

## **Icon Integration**

When adding icons to inputs, maintain the proper structure:
```tsx
<FormControl>
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    <Input className="pl-10 h-11" {...field} />
  </div>
</FormControl>
```

## **Enforcement**

**All forms in the application MUST follow these standards. No exceptions.**
- Use only design system Form components
- Follow the exact spacing patterns
- Implement proper validation with Zod
- Use FormFieldGroup for related fields
- Maintain consistent grid layouts
