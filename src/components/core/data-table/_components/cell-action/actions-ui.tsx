import type { ITableAction } from '@/types';
import type { Row } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';

import usePage from '@/hooks/usePage';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function ActionsUI<TData>({
  actions,
  row,
}: {
  actions: ITableAction<TData>[];
  row: Row<TData>;
}) {
  const { updateAccess, deleteAccess } = usePage();

  function checkAccess<TData>(action: ITableAction<TData>) {
    if (action.access !== undefined) {
      if (action.actionType === 'edit') {
        return updateAccess && typeof action.access === 'function'
          ? action.access(row as any)
          : action.access;
      }
      if (action.actionType === 'delete') {
        return deleteAccess && typeof action.access === 'function'
          ? action.access(row as any)
          : action.access;
      }

      return typeof action.access === 'function'
        ? action.access(row as any)
        : action.access;
    }

    if (action.actionType === 'edit') {
      return updateAccess;
    }
    if (action.actionType === 'delete') {
      return deleteAccess;
    }
  }

  if (actions && actions.length > 0) {
    if (actions.length > 2) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'ghost'}
              size={'icon'}
              className=' mx-auto flex items-center cursor-pointer'
            >
              <EllipsisVertical className='size-5' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-48' align='end'>
            {actions
              .filter((action) => checkAccess(action))
              .map((action, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Button
                    aria-label={action.label}
                    onClick={() => action.action(row)}
                    variant={'ghost'}
                    className='w-full flex justify-between items-center h-fit font-normal cursor-pointer'
                  >
                    {action.label}
                    <action.Icon className='size-4' />
                  </Button>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      return (
        <div className='flex w-full items-center justify-center gap-1'>
          {actions
            .filter((action) => checkAccess(action))
            .map((action, index) => (
              <Button
                key={index}
                aria-label={`${action.actionType.charAt(0).toUpperCase() + action.actionType.slice(1)} Row`}
                onClick={() => action.action(row)}
                size={'icon'}
                variant={
                  action.actionType === 'delete' ? 'ghost-destructive' : 'ghost'
                }
                className='rounded-full cursor-pointer'
              >
                <action.Icon className='size-4' />
              </Button>
            ))}
        </div>
      );
    }
  }

  return <></>;
}

export default ActionsUI;
