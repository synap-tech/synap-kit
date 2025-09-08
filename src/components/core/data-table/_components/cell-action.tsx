import type { CellContext } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';

import usePage from '@/hooks/usePage';
import useTable from '@/hooks/useTable';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ITableCellActionProps<TData, TValue> {
  info: CellContext<TData, TValue>;
  isSSR?: boolean;
}

function TableCellAction<TData, TValue>({
  info,
}: ITableCellActionProps<TData, TValue>) {
  const row = info.row;
  const { updateAccess, deleteAccess } = usePage();
  const { actions } = useTable();

  if (actions && actions.length > 0) {
    if (actions.length > 2) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'ghost'}
              size={'icon'}
              className=' mx-auto flex items-center'
            >
              <EllipsisVertical className='size-5' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-48' align='end'>
            {actions.map((action, index) => (
              <DropdownMenuItem
                key={index}
                asChild
                disabled={
                  (action.actionType === 'edit' && !updateAccess) ||
                  (action.actionType === 'delete' && !deleteAccess) ||
                  (action.actionType === 'custom' && !action.access)
                }
              >
                <Button
                  aria-label={action.label}
                  onClick={() => action.action(row)}
                  variant={'ghost'}
                  className='w-full flex justify-between items-center h-fit font-normal'
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
          {actions.map((action, index) => (
            <Button
              key={index}
              aria-label={`${action.actionType.charAt(0).toUpperCase() + action.actionType.slice(1)} Row`}
              onClick={() => action.action(row)}
              size={'icon'}
              variant={
                action.actionType === 'delete' ? 'ghost-destructive' : 'ghost'
              }
              disabled={
                (action.actionType === 'edit' && !updateAccess) ||
                (action.actionType === 'delete' && !deleteAccess) ||
                (action.actionType === 'custom' && !action.access)
              }
              className='rounded-full'
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

export default TableCellAction;
