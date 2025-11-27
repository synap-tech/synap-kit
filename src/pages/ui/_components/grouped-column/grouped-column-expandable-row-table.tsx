import { useState } from 'react';

import { TableProvider } from '@/providers';
import type { ColumnDef, Row } from '@tanstack/react-table';
import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { makeData, type Person } from './_data';

const GroupedColumnExpandableRowTable = () => {
  const columns: ColumnDef<Person>[] = [
    {
      header: 'Name',
      footer: (props) => props.column.id,
      columns: [
        {
          id: 'expander',
          header: () => null,
          cell: ({ row }) => {
            return row.getCanExpand() ? (
              <Button
                type='button'
                variant={'ghost'}
                size='icon'
                onClick={row.getToggleExpandedHandler()}
              >
                {row.getIsExpanded() ? (
                  <ChevronRight className='size-4 rotate-90' />
                ) : (
                  <ChevronRight className='size-4' />
                )}
              </Button>
            ) : (
              '🔵'
            );
          },
        },
        {
          accessorKey: 'firstName',
          header: 'First Name',
          cell: ({ row, getValue }) => (
            <div
              style={{
                // Since rows are flattened by default,
                // we can use the row.depth property
                // and paddingLeft to visually indicate the depth
                // of the row
                paddingLeft: `${row.depth * 2}rem`,
              }}
            >
              {getValue<string>()}
            </div>
          ),
        },
        {
          accessorFn: (row) => row.lastName,
          id: 'lastName',
          cell: (info) => info.getValue(),
          header: () => <span>Last Name</span>,
        },
      ],
    },
    {
      header: 'Info',

      columns: [
        {
          accessorKey: 'age',
          header: () => 'Age',
        },
        {
          header: 'More Info',
          columns: [
            {
              accessorKey: 'visits',
              header: () => <span>Visits</span>,
            },
            {
              accessorKey: 'status',
              header: 'Status',
            },
            {
              accessorKey: 'progress',
              header: 'Profile Progress',
            },
          ],
        },
      ],
    },
  ];

  const [data] = useState(() => makeData(10));

  const renderSubComponent = ({ row }: { row: Row<Person> }) => {
    const data = row.original;

    return (
      <div className='w-full grid grid-cols-4'>
        <div>{data.firstName}</div>
        <div>{data.lastName}</div>
        <div>{data.age}</div>
        <div>{data.visits}</div>
        <div>{data.status}</div>
        <div>{data.progress}</div>
      </div>
    );
  };

  return (
    <TableProvider
      title={'Grouped Column Table'}
      info='Grouped Column Table Example'
      columns={columns}
      data={data ?? []}
      renderSubComponent={renderSubComponent}
    />
  );
};

export default GroupedColumnExpandableRowTable;
