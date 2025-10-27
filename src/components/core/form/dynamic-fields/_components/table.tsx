import React, { useMemo } from 'react';

import { TableProvider } from '@/providers';
import type { ColumnDef } from '@tanstack/react-table';

import type { DynamicFieldsProps } from '../types';
import RenderCell from './render-cell';

const TableDynamicFields: React.FC<
  Omit<DynamicFieldsProps, 'title' | 'viewAs' | 'extraButtons' | 'handleAdd'>
> = ({ fields, fieldName, fieldDefs, startIndex = 0, form, children }) => {
  const columns: ColumnDef<any>[] = useMemo(
    () =>
      fieldDefs
        .filter((def) => !def.hidden)
        .map((def, index) => ({
          accessorKey: def.accessorKey,
          header: def.header,
          cell: ({ row }) => (
            <RenderCell
              fieldName={fieldName}
              startIndex={startIndex}
              form={form}
              fieldDef={def}
              fieldIndex={index}
              field={row.original}
            />
          ),
          size: def.width,
          maxSize: def.maxWidth,
          minSize: def.minWidth,
        })) as ColumnDef<any>[],
    [fieldDefs, fieldName, form, startIndex]
  );

  const data = useMemo(
    () =>
      fields.map((field) => {
        const data: Record<string, unknown> = {};
        fieldDefs.forEach((def) => {
          data[def.accessorKey] = field[def.accessorKey as keyof typeof field];
        });
        return data;
      }),
    [fields, fieldDefs]
  );

  // const columns: ColumnDef<any>[] = [
  //   {
  //     accessorKey: 'column_1',
  //     header: 'Column 1',
  //   },
  //   {
  //     accessorKey: 'column_2',
  //     header: 'Column 2',
  //   },
  //   {
  //     accessorKey: 'column_3',
  //     header: 'Column 3',
  //   },
  //   {
  //     accessorKey: 'column_4',
  //     header: 'Column 4',
  //   },
  //   {
  //     accessorKey: 'column_5',
  //     header: 'Column 5',
  //   },
  // ];

  // const data = [
  //   {
  //     column_1: 'Row 1 Col 1',
  //     column_2: 'Row 1 Col 2',
  //     column_3: 'Row 1 Col 3',
  //     column_4: 'Row 1 Col 4',
  //     column_5: 'Row 1 Col 5',
  //   },
  //   {
  //     column_1: 'Row 2 Col 1',
  //     column_2: 'Row 2 Col 2',
  //     column_3: 'Row 2 Col 3',
  //     column_4: 'Row 2 Col 4',
  //     column_5: 'Row 2 Col 5',
  //   },
  //   {
  //     column_1: 'Row 3 Col 1',
  //     column_2: 'Row 3 Col 2',
  //     column_3: 'Row 3 Col 3',
  //     column_4: 'Row 3 Col 4',
  //     column_5: 'Row 3 Col 5',
  //   },
  //   {
  //     column_1: 'Row 4 Col 1',
  //     column_2: 'Row 4 Col 2',
  //     column_3: 'Row 4 Col 3',
  //     column_4: 'Row 4 Col 4',
  //     column_5: 'Row 4 Col 5',
  //   },
  //   {
  //     column_1: 'Row 5 Col 1',
  //     column_2: 'Row 5 Col 2',
  //     column_3: 'Row 5 Col 3',
  //     column_4: 'Row 5 Col 4',
  //     column_5: 'Row 5 Col 5',
  //   },
  // ];

  console.log('Table Dynamic Fields', { fields, fieldDefs, columns, data });

  return (
    <TableProvider
      isDynamicTable
      enableDefaultColumns={false}
      title={`${fieldName} Table`}
      columns={columns}
      data={data}
    >
      {children}
    </TableProvider>
  );
};

export default TableDynamicFields;
