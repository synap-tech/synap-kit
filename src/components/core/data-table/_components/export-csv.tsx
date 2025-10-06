import getFlatHeader from '@/utils/getFlatHeader';
import { format } from 'date-fns';
import { FileSpreadsheet } from 'lucide-react';
import { CSVLink } from 'react-csv';

import { Button } from '@/components/ui/button';

import type { TTableExportCSV } from '../types';

const TableExportCSV = ({
  start_date,
  end_date,
  table,
  title,
  className,
}: TTableExportCSV) => {
  const filteredRows = table._getFilteredRowModel?.().rows || [];

  const filteredCsvColumn = table
    .getAllLeafColumns()
    .filter(
      ({ getIsVisible, id }) =>
        id !== 'row-selection' && id !== 'actions' && getIsVisible()
    );

  const { csvHeaders, csvHeadersId } = filteredCsvColumn.reduce(
    (acc, column: any) => {
      acc.csvHeaders.push(getFlatHeader(column.columnDef.header) as never);
      acc.csvHeadersId.push(column.id as never);
      return acc;
    },
    { csvHeaders: [], csvHeadersId: [] }
  );

  const csvData = [
    csvHeaders,
    ...filteredRows.map((row) =>
      csvHeadersId.map((column) => {
        if (column === 'created_at')
          return format(row.original[column], 'dd-MM-yyyy');

        return row.original[column];
      })
    ),
  ];

  const startTime = format(start_date as Date, 'dd-MM-yyyy');
  const endTime = format(end_date as Date, 'dd-MM-yyyy');
  const filename =
    typeof title === 'string'
      ? `${title.toLowerCase()} - ${startTime} to ${endTime}.csv`
      : 'Table.csv';

  return (
    <Button variant={'ghost'} size={'toolbar-sm'} className={className}>
      <CSVLink
        className='size-full flex items-center gap-2'
        aria-label='Export to CSV'
        data={csvData}
        filename={filename}
      >
        <FileSpreadsheet className='size-4' />
        <span className='hidden lg:inline'>Excel</span>
      </CSVLink>
    </Button>
  );
};

export default TableExportCSV;
