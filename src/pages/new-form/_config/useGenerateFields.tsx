import type { FieldDef } from '@/types';

import FieldActionButton from '@/components/buttons/field-action';

interface IGenerateFieldDefsProps {
  entry: string;
  remove: (index: any) => void;
  add?: (index: any) => void;
  copy?: (index: any) => void;
}

const useGenerateFields = ({
  entry,
  remove,
  add,
  copy,
}: IGenerateFieldDefsProps): FieldDef[] => {
  return [
    { accessorKey: 'label', header: 'Label', type: 'text' },
    {
      accessorKey: 'value',
      header: 'Value',
      type: 'text',
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      type: 'custom',
      component: (index: number) => {
        return (
          <FieldActionButton
            handleRemove={remove}
            index={index}
            handleCopy={copy}
          />
        );
      },
    },
  ];
};

export default useGenerateFields;
