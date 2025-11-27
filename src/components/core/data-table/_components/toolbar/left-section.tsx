import React, { useCallback } from 'react';

import { isValid } from 'date-fns';
import { ChevronDown } from 'lucide-react';

import usePage from '@/hooks/usePage';
import useScreen from '@/hooks/useScreen';
import useTable from '@/hooks/useTable';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

import TableDateRange from './../date-range';
import TableAllFilter from './../filter';
import TableAdvanceFilters from './../filter/advance';
import { TableFacetedFilter } from './../filter/faceted';
import { TableViewOptions } from './../view-options';
import { CreateButton, ResetButton } from './button';
import type { ToolbarComponentProps } from './types';

export const ToolbarLeftComponent: React.FC<ToolbarComponentProps> = React.memo(
  ({ option, render }) => {
    const { toolbarOptions } = useTable();

    if (toolbarOptions?.includes(option) || toolbarOptions?.includes('all')) {
      return render();
    }
    return null;
  }
);

ToolbarLeftComponent.displayName = 'ToolbarComponent';

export default function TableToolbarLeftSection() {
  const { createAccess } = usePage();
  const { isTablet } = useScreen();

  const {
    table,
    handleCreate,
    facetedFilters,
    advanceFilters,
    start_date,
    end_date,
    onUpdate,
    onClear,
    isClear,
    initialDateRange,
    otherToolBarComponents,
  } = useTable();

  const column = table.getColumn('created_at');
  const columnFilterValue = column?.getFilterValue() as [Date, Date];

  const startDate = start_date || columnFilterValue?.[0] || initialDateRange[0];
  const endDate = end_date || columnFilterValue?.[1] || initialDateRange[1];

  const isFiltered = table.getState().columnFilters.length > 0;

  // Memoize the callback for resetting column filters
  const resetColumnFilters = useCallback(
    () => table.resetColumnFilters(),
    [table]
  );

  // Check if the date range is valid
  const validDateRange = isValid(startDate) && isValid(endDate);

  // check can filter
  const canFilter =
    table.getAllColumns().filter((column) => column.getCanFilter()).length > 0;

  /**
   * Renders the left section of the toolbar
   */
  const renderLeftSection = useCallback(
    () =>
      isTablet ? (
        <div className='flex flex-1 items-center gap-2'>
          {handleCreate && (
            <ToolbarLeftComponent
              option='new-entry'
              render={() =>
                createAccess && <CreateButton onClick={handleCreate} />
              }
            />
          )}

          <ToolbarLeftComponent
            option='all-filter'
            render={() => canFilter && <TableAllFilter />}
          />

          {isFiltered && <ResetButton onClick={resetColumnFilters} />}

          <Popover>
            <PopoverTrigger asChild>
              <Button
                aria-label='More options'
                variant='outline'
                size='icon'
                className='rounded'
              >
                <ChevronDown className='size-4' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='flex flex-col gap-2'>
              <ToolbarLeftComponent
                option='date-range'
                render={() =>
                  validDateRange && (
                    <TableDateRange
                      table={table}
                      start_date={startDate}
                      end_date={endDate}
                      onUpdate={onUpdate}
                      onClear={onClear}
                      isClear={isClear}
                      className='border'
                    />
                  )
                }
              />

              <ToolbarLeftComponent
                option='view'
                render={() => (
                  <TableViewOptions className='w-full border' table={table} />
                )}
              />

              {otherToolBarComponents && otherToolBarComponents.length > 0 && (
                <div className='flex flex-col gap-2'>
                  {otherToolBarComponents.map((component) => component)}
                </div>
              )}

              <ToolbarLeftComponent
                option='faceted-filter'
                render={() =>
                  facetedFilters?.map((filter) => {
                    const column = table.getColumn(filter.id);
                    return column ? (
                      <TableFacetedFilter
                        key={filter.id}
                        column={column}
                        title={filter.title}
                        options={filter.options}
                      />
                    ) : null;
                  })
                }
              />

              <ToolbarLeftComponent
                option='advance-filter'
                render={() =>
                  advanceFilters && advanceFilters?.length > 0 ? (
                    <TableAdvanceFilters filters={advanceFilters} />
                  ) : null
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className='flex flex-1 items-center gap-2'>
          {handleCreate && (
            <ToolbarLeftComponent
              option='new-entry'
              render={() =>
                createAccess && <CreateButton onClick={handleCreate} />
              }
            />
          )}

          <ButtonGroup>
            <ToolbarLeftComponent
              option='all-filter'
              render={() => canFilter && <TableAllFilter />}
            />

            <ToolbarLeftComponent
              option='date-range'
              render={() =>
                validDateRange && (
                  <TableDateRange
                    table={table}
                    start_date={startDate}
                    end_date={endDate}
                    onUpdate={onUpdate}
                    onClear={onClear}
                    isClear={isClear}
                  />
                )
              }
            />
            <ToolbarLeftComponent
              option='view'
              render={() => <TableViewOptions table={table} />}
            />

            {isFiltered && <ResetButton onClick={resetColumnFilters} />}
          </ButtonGroup>

          <ToolbarLeftComponent
            option='faceted-filter'
            render={() =>
              facetedFilters?.map((filter) => {
                const column = table.getColumn(filter.id);
                return column ? (
                  <TableFacetedFilter
                    key={filter.id}
                    column={column}
                    title={filter.title}
                    options={filter.options}
                  />
                ) : null;
              })
            }
          />
          <ToolbarLeftComponent
            option='advance-filter'
            render={() =>
              advanceFilters && advanceFilters?.length > 0 ? (
                <TableAdvanceFilters filters={advanceFilters} />
              ) : null
            }
          />

          {validDateRange && (
            <Separator orientation='vertical' className='h-6' />
          )}
        </div>
      ),

    [
      table,
      facetedFilters,
      advanceFilters,
      isFiltered,
      resetColumnFilters,
      onUpdate,
      startDate,
      endDate,
      onClear,
      isClear,
      otherToolBarComponents,
      isTablet,
      validDateRange,
      createAccess,
      handleCreate,
      canFilter,
    ]
  );

  return renderLeftSection();
}
