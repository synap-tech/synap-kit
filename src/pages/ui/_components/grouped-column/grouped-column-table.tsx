import { useState } from 'react';

import { TableProvider } from '@/providers';
import type { ColumnDef, Row } from '@tanstack/react-table';

import { makeData, type Person } from './_data';

const GroupedColumnTable = () => {
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
              <button
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: 'pointer' },
                }}
              >
                {row.getIsExpanded() ? '👇' : '👉'}
              </button>
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
          footer: (props) => props.column.id,
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
    return (
      <pre style={{ fontSize: '10px' }}>
        <code>{JSON.stringify(row.original, null, 2)}</code>
      </pre>
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

export default GroupedColumnTable;
