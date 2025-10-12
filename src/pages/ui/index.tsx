import StatusButton from '@/components/buttons/status';
import DataTableEntry from '@/components/core/data-table/entry';
import { Badge } from '@/components/ui/badge';
import SectionContainer from '@/components/ui/section-container';
import StatusBadge from '@/components/ui/status-badge';
import { Switch } from '@/components/ui/switch';
import { ThemeToggle } from '@/components/ui/theme-toggle';

import DialogComponent from './dialog';
import FingerprintEnroll from './fingerprint-enroll/fingerprint-enroll';
import TestForm from './form';
import TableSSR from './table-ssr';
import Wrapper from './wrapper';

const TestPage = () => {
  return (
    <div className='p-12 border bg-background space-y-8 '>
      <h1 className='text-center text-2xl font-medium'>UI Components</h1>
      <ThemeToggle />

      <FingerprintEnroll />
      <Wrapper title='Form Fields'>
        <TestForm />
      </Wrapper>

      <SectionContainer title='Hello'>
        <div>Hello</div>
      </SectionContainer>

      <DataTableEntry title='Data Table Entry Mode' columns={[]} data={[]}>
        Data Table Entry
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
      <DialogComponent />
    </div>
  );
};

export default TestPage;
