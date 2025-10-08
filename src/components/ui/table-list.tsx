import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

import { cn } from '@/lib/utils';

export type ITableListItems = {
  label: string;
  value: string | React.ReactNode;
  hidden?: boolean;
}[];

interface ITableListProps {
  items: ITableListItems;
  title?: string;
  className?: string;
  isSmallTitle?: boolean;
}

const TableList = ({
  items,
  title,
  className,
  isSmallTitle = false,
}: ITableListProps) => {
  return (
    <div className={cn('h-full border rounded', className)}>
      {title && (
        <div>
          {!isSmallTitle && (
            <h4 className='border-b bg-muted px-5 py-2.5 text-lg font-medium capitalize leading-tight text-foreground'>
              {title}
            </h4>
          )}
          {isSmallTitle && <h2 className='font-semibold'>{title}</h2>}
        </div>
      )}
      <div className='overflow-x-auto'>
        <Table>
          <TableBody>
            {items.map((item) =>
              item.hidden ? null : (
                <TableRow
                  key={item.label}
                  className='h-10 cursor-pointer border-b last:border-b-0 '
                >
                  <TableCell className='w-1/2 font-semibold pl-5'>
                    {item.label}
                  </TableCell>
                  <TableCell className='w-1/2'>{item.value || '--'}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableList;
