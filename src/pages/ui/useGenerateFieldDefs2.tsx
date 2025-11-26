import { type UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import type { FieldDef } from '@/components/core/form/v1/dynamic-fields/types';

interface IGenerateFieldDefsProps {
  entry: string;
  remove: (index: any) => void;
  add?: (index: any) => void;
  watch?: UseFormWatch<any>;
}

const useGenerateFieldDefs2 = ({
  entry,
  remove,
  watch,
  add,
}: IGenerateFieldDefsProps): FieldDef[] => {
  // is_checked: z.boolean(),
  //   uuid: z.string(),
  //   employee_uuid: z.string(),
  //   employee_name: z.string(),
  //   permission_type: z.string().default('permanent'),
  //   temporary_from_date: z.string().nullable(),
  //   temporary_to_date: z.string().nullable(),
  return [
    {
      accessorKey: 'is_checked',
      header: 'Is Checked',
      type: 'checkbox',
    },
    {
      accessorKey: 'uuid',
      header: 'UUID',
      type: 'text',
    },
    {
      accessorKey: 'employee_uuid',
      header: 'Employee UUID',
      type: 'text',
    },
    {
      accessorKey: 'employee_name',
      header: 'Employee Name',
      type: 'text',
    },
    {
      accessorKey: 'permission_type',
      header: 'Permission Type',
      type: 'text',
    },
    {
      accessorKey: 'temporary_from_date',
      header: 'Temporary From Date',
      type: 'date',
    },
    {
      accessorKey: 'temporary_to_date',
      header: 'Temporary To Date',
      type: 'date',
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      type: 'custom',
      component: (index: number) => {
        return <FieldActionButton handleRemove={remove} index={index} />;
      },
    },
  ];
};

export default useGenerateFieldDefs2;
