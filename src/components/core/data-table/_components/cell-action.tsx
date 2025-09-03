import type { CellContext } from '@tanstack/react-table';
import { EllipsisVertical, SquarePen, Trash2 } from 'lucide-react';

import usePage from '@/hooks/usePage';
import useTable from '@/hooks/useTable';
import useTableSSR from '@/hooks/useTableSSR';

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
  isSSR,
}: ITableCellActionProps<TData, TValue>) {
  const row = info.row;
  const { updateAccess, deleteAccess } = usePage();
  const { handleUpdate, handleDelete } = useTable();
  const { handleUpdate: handleUpdateSSR, handleDelete: handleDeleteSSR } =
    useTableSSR();

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
      <DropdownMenuContent>
        {updateAccess && (isSSR ? handleUpdateSSR : handleUpdate) && (
          <DropdownMenuItem asChild>
            <Button
              aria-label='Edit Row'
              onClick={() =>
                isSSR ? handleUpdateSSR?.(row) : handleUpdate?.(row)
              }
              variant={'ghost'}
              className='w-full flex justify-between items-center h-fit'
            >
              Edit
              <SquarePen className='size-4' />
            </Button>
          </DropdownMenuItem>
        )}

        {deleteAccess && (isSSR ? handleDeleteSSR : handleDelete) && (
          <DropdownMenuItem asChild>
            <Button
              aria-label='Delete Row'
              onClick={() =>
                isSSR ? handleDeleteSSR?.(row) : handleDelete?.(row)
              }
              size={'icon'}
              variant={'ghost'}
              className='w-full flex justify-between items-center h-fit'
            >
              Delete
              <Trash2 className='size-4' />
            </Button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className='flex w-full items-center justify-center gap-1'>
      {updateAccess && (isSSR ? handleUpdateSSR : handleUpdate) && (
        <Button
          aria-label='Edit Row'
          onClick={() => (isSSR ? handleUpdateSSR?.(row) : handleUpdate?.(row))}
          size={'icon'}
          variant={'ghost'}
          className='rounded-full'
        >
          <SquarePen className='size-4' />
        </Button>
      )}
      {deleteAccess && (isSSR ? handleDeleteSSR : handleDelete) && (
        <Button
          aria-label='Delete Row'
          onClick={() => (isSSR ? handleDeleteSSR?.(row) : handleDelete?.(row))}
          size={'icon'}
          variant={'ghost-destructive'}
          className='rounded-full'
        >
          <Trash2 className='size-4' />
        </Button>
      )}
    </div>
  );
}

export default TableCellAction;
