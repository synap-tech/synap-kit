import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Assuming you have a cn utility

// 1. Define the variants for the title
const titleVariants = cva(
  // Base classes applied to all titles
  'font-bold tracking-normal text-foreground',
  {
    variants: {
      // The 'variant' prop will determine the tag and styling
      variant: {
        h1: 'text-4xl font-extrabold lg:text-5xl',
        h2: 'text-3xl font-semibold',
        h3: 'text-2xl font-semibold',
        h4: 'text-xl font-semibold',
        h5: 'text-lg font-semibold',
        h6: 'text-[1rem] font-semibold',
      },
    },
    defaultVariants: {
      variant: 'h3', // Set a default heading level
    },
  }
);

// 2. Define the props for the component
export interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>, // Use generic heading attributes
    VariantProps<typeof titleVariants> {}

// 3. Create the Title component
const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, variant, ...props }, ref) => {
    // Determine the component tag from the variant, with a fallback to the default
    const Comp = variant || 'h3';

    return (
      <Comp
        className={cn(titleVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Title.displayName = 'Title';

export { Title, titleVariants };
