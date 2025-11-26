import { useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';

import useRHF from '@/hooks/useRHF';

import CoreForm from '@/components/core/form/v2';

import { DYNAMIC_FORM_SCHEMA } from './_config/schema';
import useGenerateFields from './_config/useGenerateFields';

const DynamicForm = () => {
  const form = useRHF(DYNAMIC_FORM_SCHEMA, {
    defaultValues: { fields: [{ label: '', value: '' }] },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'fields',
  });

  async function onSubmit(data: any) {
    toast.info('Form submitted', {
      description: JSON.stringify(data, null, 2),
    });
  }

  const handleAdd = () => {
    append({ label: '', value: '' });
  };

  const handleCopy = (index: number) => {
    append({
      label: form.watch(`fields.${index}.label`),
      value: form.watch(`fields.${index}.value`),
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <CoreForm.AddEditWrapper
      form={form as any}
      onSubmit={onSubmit}
      title='Dynamic Form'
    >
      <CoreForm.DynamicFields
        title='Dynamic Fields'
        form={form}
        fieldName='fields'
        fields={fields}
        fieldDefs={useGenerateFields({
          remove: handleRemove,
          add: handleAdd,
          entry: 'fields',
          copy: handleCopy,
        })}
        handleAdd={handleAdd}
      />
    </CoreForm.AddEditWrapper>
  );
};

export default DynamicForm;
