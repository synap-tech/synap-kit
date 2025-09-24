import React from 'react';

import { Info } from 'lucide-react';
import 'zod';

import { Button } from '@/components/ui/button';
import { FormLabel, useFormField } from '@/components/ui/form';
import TooltipWrapper from '@/components/ui/tooltip-wrapper';

import { cn } from '@/lib/utils';

interface IFormLabelProps {
  label?: string;
  optional?: boolean;
  subLabel?: string;
  info?: string;
  required?: boolean;
  className?: string;
}

const CormFormLabel: React.FC<IFormLabelProps> = ({
  label,
  subLabel,
  info,
  required,
  optional,
  className,
}) => {
  const { name } = useFormField();

  return (
    <FormLabel
      className={cn('flex items-center justify-between capitalize', className)}
    >
      <div className='flex items-center gap-2'>
        <span>
          {label || name.replace('_', ' ')}{' '}
          {required && <span className='text-xs'>*</span>}
          {optional ? <span className='text-xs'>(Optional)</span> : ''}
        </span>
        {info && (
          <TooltipWrapper message={info}>
            <Button
              type='button'
              size='icon'
              variant='ghost'
              className='size-fit'
            >
              <Info className='size-4' />
            </Button>
          </TooltipWrapper>
        )}
      </div>
      {subLabel && <span className='text-xs'>{subLabel}</span>}
    </FormLabel>
  );
};

export default CormFormLabel;
