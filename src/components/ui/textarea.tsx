import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/components/utils";

const textareaVariants = cva(
  "flex w-full rounded-md border text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "border-stone-300 bg-white text-stone-900 placeholder:text-stone-500 focus-visible:border-stone-900 focus-visible:ring-stone-950 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-50 dark:placeholder:text-stone-400 dark:focus-visible:border-stone-50 dark:focus-visible:ring-stone-300",
        outline:
          "border border-stone-200 bg-transparent text-stone-900 placeholder:text-stone-400 focus-visible:border-stone-900 focus-visible:ring-stone-950 dark:border-stone-700 dark:text-stone-50 dark:focus-visible:border-stone-50 dark:focus-visible:ring-stone-300",
      },
      size: {
        default: "p-3 h-24",
        sm: "p-2 h-16 text-xs",
        lg: "p-4 h-32",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, label, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-stone-900 dark:text-stone-50 mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          className={cn(textareaVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
