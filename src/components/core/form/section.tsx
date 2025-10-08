import React from 'react';

import SectionHeader from '@/components/ui/section-header';

import { cn } from '@/lib/utils';

import type { IFormSectionProps } from './types';

const FormSection: React.FC<IFormSectionProps> = ({
  children,
  className,
  title,
  extraHeader,
}) => {
  if (title) {
    return (
      <div className='overflow-hidden rounded shadow-sm bg-content'>
        <SectionHeader extraHeader={extraHeader}>{title}</SectionHeader>
        <div
          className={cn(
            'grid grid-cols-1 gap-2.5 rounded-b-md  px-2.5 pb-2.5 sm:grid-cols-1 sm:gap-4 lg:grid-cols-3 lg:px-4 lg:pb-4',
            className
          )}
        >
          {children}
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-2.5 rounded border bg-content p-4 shadow-sm sm:grid-cols-2 sm:gap-4 lg:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
};

export default FormSection;
