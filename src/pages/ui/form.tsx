import { FILE } from '@/utils/validators';
import { useFieldArray } from 'react-hook-form';
import z from 'zod';

import useRHF from '@/hooks/useRHF';

import CoreForm from '@/components/core/form/v1';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';

import { DevTool } from '@/lib/react-hook-devtool';

import useGenerateFieldDefs from './useGenerateFieldDefs';
import useGenerateFieldDefs2 from './useGenerateFieldDefs2';

const schema = z.object({
  input: z.string(),
  inputmask: z.string(),
  textarea: z.string(),
  checkbox: z.boolean(),
  datepicker: z.string(),
  radio: z.string(),
  select: z.string(),
  multi_select: z.array(z.string()),
  react_select: z.string(),
  react_select_create: z.string(),
  join_input_unit: z.string(),
  join_input_select: z.string(),
  file_upload: FILE,
  rich_text_editor: z.string(),
  switch: z.boolean(),
  otp: z.string(),
  gender: z.string(),
  phone: z.string(),
  date_time_picker: z.string(),
  id: z.string(),
  time_picker: z.string(),
  month_picker: z.string(),

  dynamic_fields: z.array(
    z.object({
      is_checked: z.boolean(),
      uuid: z.string(),
      employee_uuid: z.string(),
      employee_name: z.string(),
      permission_type: z.string().default('permanent'),
      temporary_from_date: z.string().nullable(),
      temporary_to_date: z.string().nullable(),
    })
  ),

  challan_entries: z.array(
    z.object({
      order: z.string(),
      item: z.string(),
      quantity: z.string(),
      accessories: z.array(z.string()),
      bill_amount: z.string(),
      location: z.string(),
      remarks: z.string(),
    })
  ),
});

const TestForm = () => {
  const form = useRHF(schema, {
    challan_entries: [
      {
        order: '001',
        item: 'Item 1',
        quantity: '1',
        accessories: ['accessory_1', 'accessory_2'],
        bill_amount: '100',
        location: 'Location 1',
        remarks: 'Remark 1',
      },
      {
        order: '002',
        item: 'Item 2',
        quantity: '2',
        accessories: ['accessory_3'],
        bill_amount: '0',
        location: 'Location 2',
        remarks: 'Remark 2',
      },
    ],
  });

  const {
    fields: newFields,
    append: appendField,
    remove: removeField,
  } = useFieldArray({
    control: form.control,
    name: 'dynamic_fields',
  });

  const { fields: challanFields } = useFieldArray({
    control: form.control,
    name: 'challan_entries',
  });

  const handleRemove = (index: number) => {
    removeField(index);
  };
  const handleAdd = (index: number) => {
    appendField({
      is_checked: false,
      uuid: '',
      employee_uuid: '',
      employee_name: '',
      permission_type: 'permanent',
      temporary_from_date: null,
      temporary_to_date: null,
    });
  };

  return (
    <Form {...form}>
      <div className='space-y-4'>
        <CoreForm.Section
          title='Core Form Section'
          info='This is a core form section'
          extraHeader={<div>Extra Header</div>}
          className='lg:grid-cols-1 gap-4'
        >
          <div className='border p-4 rounded bg-background'>
            <h4 className='text-2xl font-bold mb-4'>Input Fields</h4>
            <div className='grid grid-cols-4 gap-4'>
              <FormField
                control={form.control}
                name='input'
                render={(props) => (
                  <CoreForm.Input
                    required
                    info='This is a regular input field  with info text'
                    {...props}
                  />
                )}
              />
              <FormField
                control={form.control}
                name='inputmask'
                render={(props) => (
                  <CoreForm.InputMask
                    required
                    info='This is a regular input field  with info text'
                    {...props}
                  />
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={(props) => <CoreForm.Phone {...props} />}
              />

              <FormField
                control={form.control}
                name='join_input_unit'
                render={(props) => (
                  <CoreForm.JoinInputUnit unit='kg' {...props} />
                )}
              />
              <FormField
                control={form.control}
                name='join_input_select'
                render={(props) => (
                  <CoreForm.JoinInputSelect
                    selectField={{
                      name: 'Lorem',
                      options: [{ label: 'test', value: 'test' }],
                    }}
                    {...props}
                  />
                )}
              />

              <FormField
                control={form.control}
                name='textarea'
                render={(props) => (
                  <CoreForm.Textarea rows={2} className='h-9' {...props} />
                )}
              />
            </div>
          </div>

          <div className='border p-4 rounded bg-background'>
            <h4 className='text-2xl font-bold mb-4'>Date Fields</h4>
            <div className='grid grid-cols-4 gap-4'>
              <FormField
                control={form.control}
                name='datepicker'
                render={(props) => (
                  <CoreForm.DatePicker
                    calendarProps={{
                      startMonth: new Date(1990, 0, 1),
                      endMonth: new Date(2030, 11, 31),
                    }}
                    {...props}
                  />
                )}
              />
              <FormField
                control={form.control}
                name='date_time_picker'
                render={(props) => <CoreForm.DateTimePicker {...props} />}
              />
              <FormField
                control={form.control}
                name='time_picker'
                render={(props) => <CoreForm.TimePicker {...props} />}
              />
              <FormField
                control={form.control}
                name='month_picker'
                render={(props) => (
                  <CoreForm.MonthPicker
                    defaultMonth={new Date('2023-01-01')}
                    maxDate={new Date('2026-01-01')}
                    {...props}
                  />
                )}
              />
            </div>
          </div>

          <div className='border p-4 rounded bg-background'>
            <h4 className='text-2xl font-bold mb-4'>Select Fields</h4>
            <div className='grid grid-cols-4 gap-4'>
              <FormField
                control={form.control}
                name='select'
                render={(props) => (
                  <CoreForm.Select
                    options={[
                      {
                        label: 'Option 1',
                        value: 'option-1',
                      },
                      {
                        label: 'Option 2',
                        value: 'option-2',
                      },
                      {
                        label: 'Option 3',
                        value: 'option-3',
                      },
                    ]}
                    {...props}
                  />
                )}
              />

              <FormField
                control={form.control}
                name='multi_select'
                render={(props) => (
                  <CoreForm.MultiSelect
                    options={[
                      {
                        label: 'Option 1',
                        value: 'option-1',
                      },
                      {
                        label: 'Option 2',
                        value: 'option-2',
                      },
                      {
                        label: 'Option 3',
                        value: 'option-3',
                      },
                    ]}
                    {...props}
                  />
                )}
              />
              <FormField
                control={form.control}
                name='react_select'
                render={(props) => (
                  <CoreForm.ReactSelect
                    options={[
                      {
                        label: 'Option 1',
                        value: 'option-1',
                      },
                      {
                        label: 'Option 2',
                        value: 'option-2',
                      },
                      {
                        label: 'Option 3',
                        value: 'option-3',
                      },
                    ]}
                    {...props}
                  />
                )}
              />
              <FormField
                control={form.control}
                name='react_select'
                render={(props) => (
                  <CoreForm.ReactSelect
                    isMulti
                    options={[
                      {
                        label: 'Option 1',
                        value: 'option-1',
                      },
                      {
                        label: 'Option 2',
                        value: 'option-2',
                      },
                      {
                        label: 'Option 3',
                        value: 'option-3',
                      },
                    ]}
                    {...props}
                  />
                )}
              />

              <FormField
                control={form.control}
                name='react_select_create'
                render={(props) => (
                  <CoreForm.ReactSelectCreate
                    options={[
                      {
                        label: 'test',
                        value: 'test',
                      },
                    ]}
                    {...props}
                  />
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name='checkbox'
            render={(props) => <CoreForm.Checkbox {...props} />}
          />

          <FormField
            control={form.control}
            name='radio'
            render={(props) => (
              <CoreForm.Radio
                options={[
                  {
                    label: 'Option 1',
                    value: 'option-1',
                  },
                  {
                    label: 'Option 2',
                    value: 'option-2',
                  },
                  {
                    label: 'Option 3',
                    value: 'option-3',
                  },
                ]}
                {...props}
              />
            )}
          />

          <FormField
            control={form.control}
            name='file_upload'
            render={(props) => <CoreForm.FileUpload baseUrl='/' {...props} />}
          />
          <FormField
            control={form.control}
            name='rich_text_editor'
            render={(props) => <CoreForm.RichTextEditor {...props} />}
          />
          <FormField
            control={form.control}
            name='switch'
            render={(props) => <CoreForm.Switch {...props} />}
          />
          <FormField
            control={form.control}
            name='otp'
            render={(props) => <CoreForm.Otp maxLength={4} {...props} />}
          />
          <FormField
            control={form.control}
            name='gender'
            render={(props) => <CoreForm.Gender {...props} />}
          />

          <FormField
            control={form.control}
            name='id'
            render={(props) => <CoreForm.ID {...props} />}
          />
        </CoreForm.Section>

        <div className='col-span-2'>
          <CoreForm.DynamicFields
            viewAs='kanban'
            title='Dynamic Fields'
            form={form as any}
            fieldName='dynamic_fields'
            fieldDefs={useGenerateFieldDefs2({
              entry: 'dynamic_fields',
              remove: handleRemove,
              add: handleAdd,
              watch: form.watch,
            })}
            fields={newFields}
            handleAdd={() => {
              appendField({
                is_checked: false,
                uuid: '',
                employee_uuid: '',
                employee_name: '',
                permission_type: 'permanent',
                temporary_from_date: null,
                temporary_to_date: null,
              });
            }}
          />
        </div>

        {/* <CoreForm.DynamicFields
          title='Challan Entry'
          form={form as any}
          fieldName='challan_entries'
          fieldDefs={useGenerateFieldDefs({
            entry: 'challan_entries',
            remove: handleRemove,
            add: handleAdd,
            watch: form.watch,
          })}
          fields={challanFields}
          viewAs='table'
        >
          <tr>
            <td className='border-t text-right font-semibold' colSpan={4}>
              Grand Total:
            </td>

            <td className='border-t px-3 py-2'>{200}</td>
            <td className='border-t px-3 py-2'></td>
          </tr>
        </CoreForm.DynamicFields>

        <CoreForm.DynamicFields
          title='Add Bulk Shifts'
          extraHeader={
            <Button
              size={'sm'}
              type='button'
              onClick={() => alert('Add Shift')}
            >
              Add Shift
            </Button>
          }
          form={form as any}
          fieldName='challan_entries'
          fieldDefs={useGenerateFieldDefs({
            entry: 'challan_entries',
            remove: handleRemove,
            add: handleAdd,
            watch: form.watch,
          })}
          fields={challanFields}
        /> */}
      </div>

      <DevTool control={form.control} placement='top-left' />
    </Form>
  );
};

export default TestForm;
