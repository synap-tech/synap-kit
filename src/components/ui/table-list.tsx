import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

import { cn } from '@/lib/utils';

import SectionHeader from './section-header';

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
  headerClassName?: string;
  info?: string;
  extraHeader?: React.ReactNode;
}

const TableList = ({
  items,
  title,
  className,
  headerClassName,
  info,
  extraHeader,
}: ITableListProps) => {
  return (
    <div className={cn('rounded bg-background overflow-hidden', className)}>
      {title && (
        <SectionHeader
          title={title}
          info={info}
          className={headerClassName}
          extraHeader={extraHeader}
        />
      )}
      <div className='overflow-x-auto border border-t-0 rounded-b'>
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
