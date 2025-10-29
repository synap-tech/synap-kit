import * as React from 'react';

import { cn } from '@/lib/utils';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from './input-group';

export interface InputProps extends React.ComponentProps<'input'> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

function Input({ className, type, icon, iconPosition, ...props }: InputProps) {
  return icon ? (
    <InputGroup className={cn(className)}>
      <InputGroupInput type={type} {...props} />
      <InputGroupAddon
        align={iconPosition === 'left' ? 'inline-start' : 'inline-end'}
      >
        <InputGroupButton>{icon}</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ) : (
    <input
      type={type}
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-input/30 px-3 py-1 text-foreground  text-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
}

export { Input };
