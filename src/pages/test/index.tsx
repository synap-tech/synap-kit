import DataTableEntry from '@/components/core/data-table/entry';
import { CustomLink } from '@/components/ui/link';
import SectionContainer from '@/components/ui/section-container';
import TableList from '@/components/ui/table-list';

const TestPage = () => {
  return (
    <div className='p-20 border bg-amber-100 space-y-8'>
      <SectionContainer title={'Customer Information'}>
        <div className='grid grid-cols-2 gap-2.5 '>
          <TableList
            title='General'
            items={[
              {
                label: 'Name',
                value: 'John Doe',
              },
              {
                label: 'Address',
                value: '123 Main St, Anytown, USA',
              },
            ]}
          />
          <TableList
            title='Other'
            items={[
              {
                label: 'Email',
                value: 'iX7Y5@example.com',
              },
              {
                label: 'Phone',
                value: '(123) 456-7890',
              },
              {
                label: 'Link',
                value: (
                  <CustomLink
                    url={`/`}
                    label={`Open`}
                    name='Open'
                    openInNewTab={true}
                    showCopyButton={false}
                  />
                ),
              },
            ]}
          />
        </div>
      </SectionContainer>

      <DataTableEntry
        title='Order'
        columns={[
          {
            header: 'Name',
            accessorKey: 'name',
          },
          {
            header: 'Email',
            accessorKey: 'email',
          },
          {
            header: 'Phone',
            accessorKey: 'phone',
          },
          {
            header: 'Address',
            accessorKey: 'address',
          },
          {
            header: 'Date',
            accessorKey: 'date',
          },
          {
            header: 'Time',
            accessorKey: 'time',
          },
        ]}
        data={[
          {
            name: 'John Doe',
            email: 'iX7Y5@example.com',
            phone: '(123) 456-7890',
            address: '123 Main St, Anytown, USA',
            date: '2023-01-01',
            time: '10:00 AM',
          },
          {
            name: 'Jane Doe',
            email: '5l7Kt@example.com',
            phone: '(123) 456-7890',
            address: '123 Main St, Anytown, USA',
            date: '2023-01-01',
            time: '10:00 AM',
          },
          {
            name: 'John Doe',
            email: 'iX7Y5@example.com',
            phone: '(123) 456-7890',
            address: '123 Main St, Anytown, USA',
            date: '2023-01-01',
            time: '10:00 AM',
          },
        ]}
        defaultVisibleColumns={{
          created_at: false,
          updated_at: false,
          created_by_name: false,
        }}
        toolbarOptions={[]}
        otherToolBarComponents={null}
        handleRefetch={undefined}
        enableDefaultColumns={true}
        isLoading={false}
      />
    </div>
  );
};

export default TestPage;
