import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-border  font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 ',
  {
    variants: {
      variant: {
        default: 'border bg-muted text-foreground hover:bg-muted/80 ',
        primary:
          'border-0 bg-primary text-primary-foreground hover:bg-primary/80 ',
        secondary:
          'border bg-secondary text-secondary-foreground hover:bg-secondary/80 ',
        destructive:
          'border bg-destructive text-destructive-foreground hover:bg-destructive/80 ',
        outline: 'border !border-border bg-background !text-foreground ',
        'outline-success':
          'border !border-success/20 bg-success/10 text-success hover:bg-success hover:text-success-foreground',
        'outline-warning':
          'border !border-warning/20 bg-warning/10 text-warning hover:bg-warning hover:text-warning-foreground',
        'outline-destructive':
          'border !border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground',

        accent:
          'border border-accent  bg-accent/25 text-accent-foreground hover:bg-accent/80 ',
        gradient:
          'border-transparent bg-gradient-to-r from-accent/50 to-accent/50 font-medium text-accent-foreground',
        success:
          'border-transparent bg-success/10 text-success hover:bg-success hover:text-white ',
        warning:
          'border-transparent bg-warning/10 text-warning hover:bg-warning hover:text-white',
      },
      size: {
        default: 'px-2.5 py-1 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  size,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot='badge'
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
