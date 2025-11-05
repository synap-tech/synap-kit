import {
  ArrowDown,
  ArrowUp,
  EllipsisVertical,
  EyeOff,
  Pin,
  PinOff,
  Search,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import DebouncedInput from '@/components/ui/debounce-input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';

import type { TableColumnHeaderProps } from '../types';

export function TableColumnHeader<TData, TValue>({
  column,
  className,
  isSSR,
}: TableColumnHeaderProps<TData, TValue>) {
  const title = (column.columnDef.header as string).split('\n');

  if (!column.getCanSort()) {
    return (
      <div className={cn(className, 'flex flex-col items-start ')}>
        {title.map((e, index) => (
          <div key={index}>{e}</div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-x-2 ', className)}>
      <span className='flex flex-col items-start'>
        {title.map((e, index) => (
          <div key={index}>{e}</div>
        ))}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            title='Filter Column'
            aria-label='Filter Column'
            variant='ghost'
            size='icon-sm'
            className='h-7 active:scale-100 '
          >
            <EllipsisVertical className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='center' className='w-48'>
          {
            <DebouncedInput
              icon={<Search className='size-4.5 text-black/45' />}
              iconPosition='left'
              className='h-8 placeholder:text-xs placeholder:text-red/45'
              placeholder='Search here...'
              type='text'
              onChange={(value) => column.setFilterValue(value)}
              list={column.id + 'list'}
              value={(column.getFilterValue() ?? '') as string}
            />
          }
          {!isSSR && (
            <>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(false)}
                className={cn(
                  'flex items-center justify-between',
                  column.getIsSorted() === 'asc' && 'text-destructive'
                )}
              >
                Ascending
                <ArrowUp className=' size-3.5 ' />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className={cn(
                  'flex items-center justify-between',
                  column.getIsSorted() === 'desc' && 'text-destructive'
                )}
              >
                Descending
                <ArrowDown className=' size-3.5 ' />
              </DropdownMenuItem>

              <DropdownMenuSeparator />
            </>
          )}

          {column.getCanPin() && (
            <DropdownMenuItem
              className='hidden md:flex items-center justify-between'
              onClick={() => {
                if (column.getIsPinned() === 'left') {
                  column.pin(false);
                } else {
                  column.pin('left');
                }
              }}
            >
              <span>
                {column.getIsPinned() === 'left' ? 'Unpin' : 'Pin to left'}
              </span>
              {column.getIsPinned() === 'left' ? (
                <PinOff className='mr-2 size-3.5 ' />
              ) : (
                <Pin className={'rotate-45 mr-2 size-3.5 '} />
              )}
            </DropdownMenuItem>
          )}

          {column.getCanPin() && (
            <DropdownMenuItem
              className='flex items-center justify-between'
              onClick={() => {
                if (column.getIsPinned() === 'right') {
                  column.pin(false);
                } else {
                  column.pin('right');
                }
              }}
            >
              <span>
                {column.getIsPinned() === 'right' ? 'Unpin' : 'Pin to right'}
              </span>
              {column.getIsPinned() === 'right' ? (
                <PinOff className='mr-2 size-3.5 ' />
              ) : (
                <Pin className={'rotate-45 mr-2 size-3.5 '} />
              )}
            </DropdownMenuItem>
          )}

          {column.getCanHide() && (
            <DropdownMenuItem
              className='flex items-center justify-between'
              onClick={() => column.toggleVisibility(false)}
            >
              <span>Hide</span>
              <EyeOff className='mr-2 size-3.5 ' />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
