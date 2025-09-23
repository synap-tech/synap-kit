import { useFieldArray } from 'react-hook-form';
import z from 'zod';

import useRHF from '@/hooks/useRHF';

import StatusButton from '@/components/buttons/status';
import DataTableEntry from '@/components/core/data-table/entry';
import CoreForm from '@/components/core/form';
import { Badge } from '@/components/ui/badge';
import { Form } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import SectionContainer from '@/components/ui/section-container';
import StatusBadge from '@/components/ui/status-badge';
import { Switch } from '@/components/ui/switch';

import TableSSR from './table-ssr';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const TestPage = () => {
  const form = useRHF(
    z.object({
      customer_uuid: z.string(),
      new_challan_entries: z.array(
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
          is_checked: z.boolean(),
          uuid: z.string(),
          employee_uuid: z.string(),
          employee_name: z.string(),
          permission_type: z.string().default('permanent'),
          temporary_from_date: z.string().nullable(),
          temporary_to_date: z.string().nullable(),
        })
      ),
    }),
    {}
  );

  const { fields: newFields } = useFieldArray({
    control: form.control,
    name: 'new_challan_entries',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'challan_entries',
  });

  const handleRemove = (index: number) => {};
  const handleAdd = (index: number) => {};
  return (
    <div className='p-20 border bg-sky-50 space-y-8 '>
      <Form {...form}>
        <div className='space-y-4'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='col-span-1'>
              <CoreForm.Section
                title='Information'
                className='lg:grid-cols-1 gap-4'
              >
                <FormField
                  control={form.control}
                  name='customer_uuid'
                  render={(props) => (
                    <CoreForm.ReactSelect
                      menuPortalTarget={document.body}
                      label='Customer'
                      placeholder='Select Customer'
                      options={[]}
                      {...props}
                    />
                  )}
                />
              </CoreForm.Section>
            </div>

            <div className='col-span-2'>
              <CoreForm.DynamicFields
                title='Ready For Delivery'
                form={form as any}
                fieldName='new_challan_entries'
                fieldDefs={useGenerateFieldDefs({
                  entry: 'new_challan_entries',
                  remove: handleRemove,
                  add: handleAdd,
                  watch: form.watch,
                })}
                fields={newFields}
              />
            </div>
          </div>

          <CoreForm.DynamicFields
            title='Challan Entry'
            form={form as any}
            fieldName='challan_entries'
            fieldDefs={useGenerateFieldDefs({
              entry: 'challan_entries',
              remove: handleRemove,
              add: handleAdd,
              watch: form.watch,
            })}
            fields={fields}
          >
            <tr>
              <td className='border-t text-right font-semibold' colSpan={4}>
                Grand Total:
              </td>

              <td className='border-t px-3 py-2'>{200}</td>
              <td className='border-t px-3 py-2'></td>
            </tr>
          </CoreForm.DynamicFields>
        </div>
      </Form>

      <SectionContainer title='Hello'>
        <div>Hello</div>
      </SectionContainer>

      <DataTableEntry title='Hello' columns={[]} data={[]}>
        Hello
      </DataTableEntry>
      <Badge variant={'outline-success'}>Success</Badge>
      <Badge variant={'outline-warning'}>Warning</Badge>
      <Badge variant={'outline-destructive'}>Destructive</Badge>
      <Badge variant={'outline'}>Outline</Badge>

      <StatusButton value={true} />
      <StatusButton value={false} />
      <StatusBadge status={'approved'} />
      <StatusBadge status={'pending'} />
      <StatusBadge status={'rejected'} />

      <Switch />

      <TableSSR />
    </div>
  );
};

export default TestPage;
