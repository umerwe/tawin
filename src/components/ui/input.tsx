import * as React from "react"
import { cn } from "@/lib/utils"

// Extend the interface to include our custom 'variant' prop
export interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "auth"
}

function Input({ className, type, variant = "default", ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // SHARED BASE CLASSES (Logic that applies to both)
        "flex w-full min-w-0 transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 text-sm",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        
        // VARIANT: DEFAULT (Rounded/Pill style)
        variant === "default" && [
          "h-[52px] px-4 rounded-full bg-gray-50 border-transparent border",
          "placeholder:text-gray-400 selection:bg-purple-100",
          "focus-visible:ring-2 focus-visible:ring-purple-100 focus-visible:border-aqua"
        ],

        // VARIANT: AUTH (Underline style)
        variant === "auth" && [
          "h-11 rounded-none border-0 border-b border-border bg-transparent px-0 pr-8 shadow-none",
          "placeholder:text-muted-foreground",
          "focus-visible:ring-0 focus-visible:border-aqua"
        ],

        className // Allows for one-off overrides
      )}
      {...props}
    />
  )
}

export { Input }