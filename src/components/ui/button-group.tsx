import type * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonGroupVariants = cva(
  'flex items-center border rounded-md overflow-hidden ',
  {
    variants: {
      orientation: {
        horizontal:
          ' flex-row [&_button]:first:rounded-l-none [&_button]:last:rounded-r-none *:not-last:rounded-r-none *:not-first:rounded-l-none  [&_button]:!border-r-[1px]   [&_button]:last:!border-r-0 ',
        vertical:
          'flex-col [&_button]:first:rounded-t-none [&_button]:last:rounded-b-none',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export const ButtonGroup = ({
  className,
  orientation,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) => {
  return (
    <div
      className={cn(buttonGroupVariants({ orientation, className }))}
      {...props}
    />
  );
};
