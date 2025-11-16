import { toast } from 'sonner';

import StatusButton from '@/components/buttons/status';
import DataTableEntry from '@/components/core/data-table/entry';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import SectionContainer from '@/components/ui/section-container';
import StatusBadge from '@/components/ui/status-badge';
import { Switch } from '@/components/ui/switch';
import { ThemeToggle } from '@/components/ui/theme-toggle';

import User from '../hr/user';
import GroupedColumnExpandableRowTable from './_components/grouped-column/grouped-column-expandable-row-table';
import DatePickers from './date-pickers';
import DialogComponent from './dialog';
import FingerprintEnroll from './fingerprint-enroll/fingerprint-enroll';
import TestForm from './form';
import TableSSR from './table-ssr';
import Wrapper from './wrapper';

const TestPage = () => {
  return (
    <div className='p-12  bg-background space-y-8 '>
      <h1 className='text-center text-2xl font-medium'>UI Components</h1>

      <ThemeToggle />

      <Wrapper title='Toast Button'>
        <ButtonGroup className='w-fit block mx-auto'>
          <Button
            variant={'success'}
            onClick={() => {
              toast.success('Success Toast');
            }}
          >
            Success
          </Button>
          <Button
            variant={'warning'}
            onClick={() => {
              toast.warning('Warning Toast');
            }}
          >
            Warning
          </Button>
          <Button
            variant={'destructive'}
            onClick={() => {
              toast.error('Error Toast');
            }}
          >
            Error
          </Button>
        </ButtonGroup>
      </Wrapper>
      <Wrapper title='Grouped Column & Expand Row Table'>
        <GroupedColumnExpandableRowTable />
      </Wrapper>

      <Wrapper title='Date/Month/Year Pickers'>
        <DatePickers />
      </Wrapper>

      <FingerprintEnroll />
      <Wrapper title='Form Fields'>
        <TestForm />
      </Wrapper>

      <SectionContainer title='Hello'>
        <div>Hello</div>
      </SectionContainer>

      <DataTableEntry
        title='Data Table Entry Mode'
        columns={[]}
        data={[]}
        childrenInsideTable
      >
        <td className='border-t text-right font-semibold' colSpan={4}>
          Grand Total Bill:
        </td>

        <td className='border-t px-3 py-2'>2000</td>
        <td className='border-t px-3 py-2'></td>
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

      <User />
      <TableSSR />
      <DialogComponent />
    </div>
  );
};

export default TestPage;
