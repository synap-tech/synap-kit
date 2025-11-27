import React, { useCallback } from 'react';

import type { IToolbarOptions } from '@/types';
import { Filter as Funnel, SearchIcon } from 'lucide-react';

import useTable from '@/hooks/useTable';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DebouncedInput from '@/components/ui/debounce-input';

import { cn } from '@/lib/utils';

import PinnedColumns from './../filter/pinned-columns';
import TableTitle from './../title';
import TableToolbarLeftSection from './left-section';
import TableToolbarRightSection from './right-section';

// Interface for ToolbarComponent props
interface ToolbarComponentProps {
  option: IToolbarOptions;
  render: () => React.ReactNode;
}

/**
 * ToolbarComponent - Renders a toolbar item based on the provided option
 * @param option - The toolbar option to check
 * @param render - Function to render the toolbar item
 */
export const ToolbarComponent: React.FC<ToolbarComponentProps> = React.memo(
  ({ option, render }) => {
    const { toolbarOptions } = useTable();

    if (toolbarOptions?.includes(option) || toolbarOptions?.includes('all')) {
      return render();
    }
    return null;
  }
);

ToolbarComponent.displayName = 'ToolbarComponent';

/**
 * TableToolbar - Main component for rendering the table toolbar
 */
export function TableToolbar() {
  const {
    title,
    subtitle,
    info,
    table,
    toolbarOptions,
    globalFilterValue,
    isEntry,
    isDynamicTable,
    collapsible,
  } = useTable();

  // Memoize the callback for setting global filter
  const setGlobalFilter = useCallback(
    (value: string | number) => table.setGlobalFilter(value),
    [table]
  );

  if (isEntry || collapsible === true) {
    return (
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='item-1'>
          <div className='flex justify-between items-center'>
            <TableTitle title={title} subtitle={subtitle} info={info} />
            <div className='flex gap-4 items-center'>
              <DebouncedInput
                icon={
                  <SearchIcon className={cn('size-5 text-foreground/50')} />
                }
                value={globalFilterValue ?? ''}
                onChange={setGlobalFilter}
                className={cn('h-9 w-full lg:max-w-[300px] rounded')}
                placeholder='Search here...'
                autoFocus={false}
              />
              <AccordionTrigger
                Icon={Funnel}
                iconClassName='size-5'
                className='p-0 [&[data-state=open]>svg]:rotate-0'
              />
            </div>
          </div>

          <AccordionContent className='pb-0 mt-3'>
            <div className='flex items-center justify-between gap-4'>
              {toolbarOptions === 'none' ? null : (
                <div className={cn('flex items-center gap-2')}>
                  <TableToolbarLeftSection />
                  <TableToolbarRightSection />
                </div>
              )}
            </div>
            <PinnedColumns />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <div className={cn('flex w-full flex-col overflow-hidden')}>
      {isDynamicTable === true ? null : (
        <div
          className={cn(
            'mb-4 flex w-full flex-col justify-between gap-2 lg:flex-row lg:items-end'
          )}
        >
          <TableTitle title={title} subtitle={subtitle} info={info} />
          <DebouncedInput
            icon={<SearchIcon className={cn('size-5 text-foreground/50')} />}
            value={globalFilterValue ?? ''}
            onChange={setGlobalFilter}
            className={cn('h-9 w-full lg:max-w-[300px] rounded')}
            placeholder='Search here...'
            autoFocus={false}
          />
        </div>
      )}
      {toolbarOptions === 'none' ? null : (
        <div
          className={cn(
            'flex flex-col-reverse gap-4 lg:flex-row lg:items-center justify-between overflow-visible pb-1 pr-1'
          )}
        >
          <div className='flex items-center gap-2'>
            <TableToolbarLeftSection />
            <TableToolbarRightSection />
          </div>
        </div>
      )}

      <PinnedColumns />
    </div>
  );
}
