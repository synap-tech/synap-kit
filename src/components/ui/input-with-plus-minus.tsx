import { MinusIcon, PlusIcon } from 'lucide-react';
import { Button, Group, Input, NumberField } from 'react-aria-components';

import { cn } from '@/lib/utils';

interface IProps {
  numberFieldProps?: React.ComponentProps<typeof NumberField>;
  inputProps?: React.ComponentProps<typeof Input>;
  incrementButtonProps?: React.ComponentProps<typeof Button>;
  decrementButtonProps?: React.ComponentProps<typeof Button>;
  className?: string;
}

const InputWithPlusMinusButton: React.FC<IProps> = ({
  numberFieldProps,
  inputProps,
  incrementButtonProps,
  decrementButtonProps,
  className,
}) => {
  return (
    <NumberField {...numberFieldProps}>
      <Group
        className={cn(
          'border border-input data-focus-within:border-input data-focus-within:ring-ring/5 data-focus-within:has-aria-invalid:ring-destructive data-focus-within:has-aria-invalid:border-red-500 relative inline-flex h-9 w-full min-w-0 items-center overflow-hidden rounded-md border bg-transparent text-base whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus-within:ring-[3px] md:text-sm',
          className
        )}
      >
        <Button
          slot='decrement'
          {...decrementButtonProps}
          className={cn(
            'border border-accent bg-accent text-accent-foreground  hover:bg-accent/80 -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-l-md  text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            decrementButtonProps?.className
          )}
        >
          <MinusIcon className='size-4' />
          <span className='sr-only'>Decrement</span>
        </Button>
        <Input
          {...inputProps}
          className={cn(
            'text-foreground bg-input/30 w-full grow px-3 py-2 text-center tabular-nums outline-none',
            inputProps?.className
          )}
        />
        <Button
          slot='increment'
          {...incrementButtonProps}
          className={cn(
            'border border-accent bg-accent text-accent-foreground  hover:bg-accent/80 -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-r-md  text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            incrementButtonProps?.className
          )}
        >
          <PlusIcon className='size-4' />
          <span className='sr-only'>Increment</span>
        </Button>
      </Group>
    </NumberField>
  );
};

export default InputWithPlusMinusButton;
