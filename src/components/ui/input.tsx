import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.ComponentProps<'input'> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

function Input({ className, type, icon, iconPosition, ...props }: InputProps) {
  const inputClass =
    'flex h-9 w-full rounded border bg-input/30 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:from-destructive/5 disabled:to-destructive/5 disabled:border-destructive/30 disabled:text-destructive';

  const inputClass2 =
    'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input h-9 w-full min-w-0 rounded-md border bg-red-500 dark:bg-input/30 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-foreground';

  return icon ? (
    <div className={cn(inputClass, 'items-center gap-2', className)}>
      {icon && iconPosition === 'left' && icon}
      <input
        autoFocus
        type={type}
        className={cn('w-full bg-transparent focus:outline-none focus:ring-0 ')}
        {...props}
      />
      {icon && iconPosition === 'right' && icon}
    </div>
  ) : (
    <input type={type} className={cn(inputClass, className)} {...props} />
  );
}

export { Input };
