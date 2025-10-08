import { useCallback } from 'react';

import { TableFilterProvider } from '@/providers';
import type { ITableFilter } from '@/providers/table-filter-provider';
import { isValid } from 'date-fns';
import { CirclePlus, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import usePage from '@/hooks/usePage';
import useTableSSR from '@/hooks/useTableSSR';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

import TableDateRange from '../../data-table/_components/date-range';
import TableExportCSV from '../../data-table/_components/export-csv';
import TableRefresh from '../../data-table/_components/refresh';
import TableTitle from '../../data-table/_components/title';
import { TableViewOptions } from '../../data-table/_components/view-options';
import TableFilter from './filter';
import PinFilters from './filter/pin-filters';
import { TableOrderBy } from './order-by';

const Toolbar = () => {
  const { createAccess } = usePage();
  const {
    title,
    subtitle,
    handleRefetch,
    handleCreate,
    table,
    start_date,
    end_date,
    initialDateRange,
    onUpdate,
    onClear,
    isClear,
    filterOptions,
    isEntry,
    isFiltered,
    clearSearchParams,
  } = useTableSSR();

  const [searchParams] = useSearchParams();

  const column = table.getColumn('created_at');
  const columnFilterValue = column?.getFilterValue() as [Date, Date];

  const startDate = start_date || columnFilterValue?.[0] || initialDateRange[0];
  const endDate = end_date || columnFilterValue?.[1] || initialDateRange[1];

  const validDateRange = isValid(startDate) && isValid(endDate);

  const defaultFilterValues: ITableFilter[] = [];

  searchParams.forEach((value, key) =>
    defaultFilterValues.push({ name: key, value })
  );

  /**
   * Renders the left section of the toolbar
   */
  const renderLeftSection = useCallback(
    () => (
      <div className='flex flex-1 items-center gap-2'>
        {createAccess && (
          <Button
            aria-label='Create new entry'
            onClick={handleCreate}
            size='toolbar-sm'
          >
            <CirclePlus className='size-4' />
            New
          </Button>
        )}

        <ButtonGroup>
          {filterOptions && <TableFilter options={filterOptions} />}
          <TableDateRange
            isSSR
            table={table}
            start_date={startDate}
            end_date={endDate}
            onUpdate={onUpdate}
            onClear={onClear}
            isClear={isClear}
          />
          <TableViewOptions table={table} />
          <TableOrderBy table={table} />
        </ButtonGroup>

        {isFiltered && (
          <Button
            aria-label='Reset filters'
            variant='outline-destructive'
            onClick={clearSearchParams}
            size={'toolbar-sm'}
          >
            Reset
            <X className='size-4' />
          </Button>
        )}

        {validDateRange && <Separator orientation='vertical' className='h-6' />}

        <ButtonGroup>
          {isValid(startDate) && isValid(endDate) && (
            <TableExportCSV
              table={table}
              title={title as string}
              isEntry={isEntry}
              start_date={startDate}
              end_date={endDate}
            />
          )}
        </ButtonGroup>
      </div>
    ),
    [
      table,
      endDate,
      startDate,
      isClear,
      onClear,
      onUpdate,
      isEntry,
      title,
      filterOptions,
      clearSearchParams,
      isFiltered,
      handleCreate,
      createAccess,
      validDateRange,
    ]
  );

  /**
   * Renders the right section of the toolbar
   */
  const renderRightSection = useCallback(
    () => (
      <div className='flex h-fit gap-4'>
        {handleRefetch && <TableRefresh handleRefetch={handleRefetch} />}
      </div>
    ),
    [handleRefetch]
  );

  return (
    <TableFilterProvider defaultValues={defaultFilterValues}>
      <div className={cn('flex w-full flex-col overflow-hidden')}>
        <div
          className={cn(
            'mb-4 flex w-full flex-col justify-between gap-2  lg:flex-row lg:items-end'
          )}
        >
          <TableTitle title={title} subtitle={subtitle} />
        </div>

        <div className={cn('flex items-center justify-between')}>
          {renderLeftSection()}
          {renderRightSection()}
        </div>

        <PinFilters />
      </div>
    </TableFilterProvider>
  );
};

export default Toolbar;
