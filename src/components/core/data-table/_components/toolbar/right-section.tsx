import React, { useCallback } from 'react';

import { isValid } from 'date-fns';

import useTable from '@/hooks/useTable';

import { ButtonGroup } from '@/components/ui/button-group';

import TableExportCSV from './../export-csv';
import TableRefresh from './../refresh';
import { TableRowDelete } from './../row/delete';
import type { ToolbarComponentProps } from './types';

export const ToolbarRightComponent: React.FC<ToolbarComponentProps> =
  React.memo(({ option, render }) => {
    const { toolbarOptions } = useTable();

    if (toolbarOptions?.includes(option) || toolbarOptions?.includes('all')) {
      return render();
    }
    return null;
  });

ToolbarRightComponent.displayName = 'ToolbarComponent';

export default function TableToolbarRightSection() {
  const {
    title,
    table,
    handleRefetch,
    isEntry,
    start_date,
    end_date,
    initialDateRange,
    otherToolBarComponents,
  } = useTable();

  const column = table.getColumn('created_at');
  const columnFilterValue = column?.getFilterValue() as [Date, Date];

  const startDate = start_date || columnFilterValue?.[0] || initialDateRange[0];
  const endDate = end_date || columnFilterValue?.[1] || initialDateRange[1];

  // Check if the date range is valid
  const validDateRange = isValid(startDate) && isValid(endDate);

  const rightSection = useCallback(
    () => (
      <div className='flex items-center gap-2 lg:gap-4'>
        <TableRowDelete />
        <ButtonGroup>
          <ToolbarRightComponent
            option='export-csv'
            render={() =>
              validDateRange && (
                <TableExportCSV
                  table={table}
                  title={title}
                  isEntry={isEntry}
                  start_date={startDate}
                  end_date={endDate}
                />
              )
            }
          />
          <ToolbarRightComponent
            option='refresh'
            render={() =>
              handleRefetch && <TableRefresh handleRefetch={handleRefetch} />
            }
          />
        </ButtonGroup>

        {otherToolBarComponents && (
          <span className='block h-5 bg-border w-[1px]' />
        )}

        <div className='hidden lg:flex  gap-4'>
          {otherToolBarComponents?.map((component) => component)}
        </div>
      </div>
    ),
    [
      handleRefetch,
      otherToolBarComponents,
      table,
      title,
      isEntry,
      startDate,
      endDate,
      validDateRange,
    ]
  );

  return rightSection();
}
