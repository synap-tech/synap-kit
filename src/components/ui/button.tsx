'use client';

import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLMotionProps, motion, type Transition } from 'motion/react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/50',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',

        success: 'bg-success text-success-foreground hover:bg-success/90',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
        'outline-destructive':
          'border border-destructive/20 bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground',
        'outline-toolbar':
          'border hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        'outline-success':
          'border border-success/20 bg-background text-success hover:bg-success hover:text-success-foreground',
        'outline-accent':
          'border border-accent/20 bg-background text-accent hover:bg-accent hover:text-accent-foreground',
        accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
        'ghost-destructive': 'text-destructive hover:bg-destructive/10 ',
        gradient: 'bg-gradient text-foreground border',
        'gradient-accent':
          '!bg-gradient-to-r !from-accent/80 !to-accent/70 !text-accent-foreground',
        toolbar:
          'bg-transparent hover:bg-background text-foreground border shadow-none hover:shadow-md',
        form: 'h-10 w-full rounded border bg-background px-3 py-2 text-sm',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
        xs: 'h-7 px-2.5 text-xs',
        toolbar: 'h-8  px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface ButtonProps
  extends HTMLMotionProps<'button'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  scale?: number;
  transition?: Transition;
}

function Button({
  ref,
  children,
  onClick,
  className,
  variant,
  size,
  scale = 10,
  transition = { duration: 0.6, ease: 'easeOut' },
  ...props
}: ButtonProps) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

  const createRipple = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;

      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newRipple: Ripple = {
        id: Date.now(),
        x,
        y,
      };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    },
    []
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(event);

      if (onClick) {
        onClick(event);
      }
    },
    [createRipple, onClick]
  );

  return (
    <motion.button
      ref={buttonRef}
      data-slot='ripple-button'
      onClick={handleClick}
      className={cn(
        buttonVariants({ variant, size }),
        'relative overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale, opacity: 0 }}
          transition={transition}
          className='pointer-events-none absolute size-5 rounded-full bg-current'
          style={{
            top: ripple.y - 10,
            left: ripple.x - 10,
          }}
        />
      ))}
    </motion.button>
  );
}

export { Button, type ButtonProps, buttonVariants };
