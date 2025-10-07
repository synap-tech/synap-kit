import React, { useCallback } from 'react';

import type { IToolbarOptions } from '@/types';
import { useMediaQuery } from '@uidotdev/usehooks';
import { isValid } from 'date-fns';
import {
  ChevronDown,
  CirclePlus,
  Filter as Funnel,
  SearchIcon,
  X,
} from 'lucide-react';

import usePage from '@/hooks/usePage';
import useTable from '@/hooks/useTable';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import DebouncedInput from '@/components/ui/debounce-input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

import TableDateRange from './date-range';
import TableExportCSV from './export-csv';
import TableAllFilter from './filter';
import TableAdvanceFilters from './filter/advance';
import { TableFacetedFilter } from './filter/faceted';
import PinnedColumns from './filter/pinned-columns';
import TableRefresh from './refresh';
import { TableRowDelete } from './row/delete';
import TableTitle from './title';
import { TableViewOptions } from './view-options';

// Interface for ToolbarComponent props
interface ToolbarComponentProps {
  option: IToolbarOptions;
  render: () => React.ReactNode;
}

/**
 * ToolbarComponent - Renders a toolbar item based on the provided option
 * @param option - The toolbar option to check
 * @param render - Function to render the toolbar item
 */
export const ToolbarComponent: React.FC<ToolbarComponentProps> = React.memo(
  ({ option, render }) => {
    const { toolbarOptions } = useTable();

    if (toolbarOptions?.includes(option) || toolbarOptions?.includes('all')) {
      return render();
    }
    return null;
  }
);

ToolbarComponent.displayName = 'ToolbarComponent';

/**
 * TableToolbar - Main component for rendering the table toolbar
 */
export function TableToolbar() {
  const { createAccess } = usePage();
  const isSmallDevice = useMediaQuery('only screen and (max-width : 1024px)');

  const {
    title,
    subtitle,
    info,
    table,
    toolbarOptions,
    handleCreate,
    handleRefetch,
    globalFilterValue,
    facetedFilters,
    advanceFilters,
    isEntry,
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

  // Memoize the callback for setting global filter
  const setGlobalFilter = useCallback(
    (value: string | number) => table.setGlobalFilter(value),
    [table]
  );

  // Check if the date range is valid
  const validDateRange = isValid(startDate) && isValid(endDate);

  /**
   * Renders the left section of the toolbar
   */
  const renderLeftSection = useCallback(
    () =>
      isSmallDevice ? (
        <div className='flex flex-1 items-center gap-2'>
          {handleCreate && (
            <ToolbarComponent
              option='new-entry'
              render={() =>
                createAccess && (
                  <Button
                    aria-label='Create new entry'
                    onClick={handleCreate}
                    variant='accent'
                    size='toolbar-sm'
                  >
                    <CirclePlus className='size-4' />
                    New
                  </Button>
                )
              }
            />
          )}

          <ToolbarComponent
            option='all-filter'
            render={() =>
              table.getAllColumns().filter((column) => column.getCanFilter())
                .length > 0 && <TableAllFilter />
            }
          />

          {isFiltered && (
            <Button
              aria-label='Reset filters'
              variant='outline-destructive'
              onClick={resetColumnFilters}
              size={'icon'}
            >
              <X className='size-4' />
            </Button>
          )}

          <Popover>
            <PopoverTrigger>
              <Button
                aria-label='More options'
                variant='outline'
                size='icon'
                className='rounded-md'
              >
                <ChevronDown className='size-4' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='flex flex-col gap-2'>
              <ToolbarComponent
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
              <ToolbarComponent
                option='view'
                render={() => (
                  <TableViewOptions className='w-full border' table={table} />
                )}
              />

              {otherToolBarComponents}
              <ToolbarComponent
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
              <ToolbarComponent
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
            <ToolbarComponent
              option='new-entry'
              render={() =>
                createAccess && (
                  <Button
                    aria-label='Create new entry'
                    onClick={handleCreate}
                    variant='accent'
                    size='toolbar-sm'
                  >
                    <CirclePlus className='size-4' />
                    New
                  </Button>
                )
              }
            />
          )}
          <ButtonGroup>
            <ToolbarComponent
              option='all-filter'
              render={() =>
                table.getAllColumns().filter((column) => column.getCanFilter())
                  .length > 0 && <TableAllFilter />
              }
            />

            <ToolbarComponent
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
            <ToolbarComponent
              option='view'
              render={() => <TableViewOptions table={table} />}
            />
          </ButtonGroup>

          <ToolbarComponent
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
          <ToolbarComponent
            option='advance-filter'
            render={() =>
              advanceFilters && advanceFilters?.length > 0 ? (
                <TableAdvanceFilters filters={advanceFilters} />
              ) : null
            }
          />
          {isFiltered && (
            <Button
              aria-label='Reset filters'
              variant='outline-destructive'
              onClick={resetColumnFilters}
              size={'toolbar-sm'}
            >
              Reset
              <X className='size-4' />
            </Button>
          )}
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
      isSmallDevice,
      validDateRange,
      createAccess,
      handleCreate,
    ]
  );

  /**
   * Renders the right section of the toolbar
   */
  const renderRightSection = useCallback(
    () => (
      <div className='flex items-center gap-2 lg:gap-4'>
        <TableRowDelete />
        <ButtonGroup>
          <ToolbarComponent
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
          <ToolbarComponent
            option='refresh'
            render={() =>
              handleRefetch && <TableRefresh handleRefetch={handleRefetch} />
            }
          />
        </ButtonGroup>

        {otherToolBarComponents && (
          <span className='block h-5 bg-border w-[1px]' />
        )}

        <div className='hidden lg:flex flex-wrap flex-col lg:flex-row gap-4'>
          {otherToolBarComponents}
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

  if (isEntry) {
    return (
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='item-1' className='rounded-t-md bg-background'>
          <AccordionTrigger
            Icon={Funnel}
            iconClassName='size-5'
            className=' pt-2 pb-0 text-2xl font-semibold capitalize leading-none text-foreground [&[data-state=open]>svg]:rotate-0'
          >
            {title}
          </AccordionTrigger>
          <AccordionContent className='flex items-center justify-between gap-4 px-0 pt-2.5 pb-0'>
            {toolbarOptions === 'none' ? null : (
              <div className={cn('flex items-center justify-between')}>
                {renderLeftSection()}
                {renderRightSection()}
              </div>
            )}

            <DebouncedInput
              icon={<SearchIcon className={cn('size-5 ')} />}
              value={globalFilterValue ?? ''}
              onChange={setGlobalFilter}
              className={cn(' w-full lg:max-w-[300px]')}
              placeholder='Search...'
              autoFocus={false}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <div className={cn('flex w-full flex-col overflow-hidden')}>
      <div
        className={cn(
          'mb-4 flex w-full flex-col justify-between gap-2  lg:flex-row lg:items-end'
        )}
      >
        <TableTitle title={title} subtitle={subtitle} info={info} />
      </div>
      {toolbarOptions === 'none' ? null : (
        <div
          className={cn(
            'flex flex-col-reverse gap-4 lg:flex-row lg:items-center justify-between'
          )}
        >
          <div className='flex items-center gap-2'>
            {renderLeftSection()}
            {renderRightSection()}
          </div>

          <DebouncedInput
            icon={<SearchIcon className={cn('size-5 text-secondary/50')} />}
            value={globalFilterValue ?? ''}
            onChange={setGlobalFilter}
            className={cn('h-9 w-full lg:max-w-[300px] rounded-md')}
            placeholder='Search here...'
            autoFocus={false}
          />
        </div>
      )}

      <PinnedColumns />
    </div>
  );
}
