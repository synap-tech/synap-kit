import React from 'react';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/ui/section-header';

import { cn } from '@/lib/utils';

import type { DynamicFieldsProps } from '../types';

interface IProps
  extends Pick<
    DynamicFieldsProps,
    'handleAdd' | 'extraHeader' | 'title' | 'containerClassName'
  > {
  children: React.ReactNode;
  extraButton?: React.ReactNode;
}

const DynamicFieldContainer: React.FC<IProps> = ({
  title,
  extraHeader,
  handleAdd,
  children,
  containerClassName,
  extraButton,
}) => {
  return (
    <div className='overflow-hidden rounded-md shadow-sm bg-base'>
      <SectionHeader
        extraHeader={
          <div className='flex items-center gap-4'>
            {extraHeader && extraHeader}
            {handleAdd && (
              <Button
                onClick={handleAdd}
                type='button'
                variant={'accent'}
                size={'xs'}
                className='gap-1 rounded-md'
              >
                <Plus className='size-4' />
                New
              </Button>
            )}
            {extraButton && extraButton}
          </div>
        }
      >
        {title}
      </SectionHeader>
      <div className={cn('px-5 pb-4 ', containerClassName)}>{children}</div>
    </div>
  );
};

export default DynamicFieldContainer;
