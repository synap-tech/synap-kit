import StatusButton from '@/components/buttons/status';
import DataTableEntry from '@/components/core/data-table/entry';
import { Badge } from '@/components/ui/badge';
import SectionContainer from '@/components/ui/section-container';
import StatusBadge from '@/components/ui/status-badge';
import { Switch } from '@/components/ui/switch';

import DialogComponent from './dialog';
import TestForm from './form';
import TableSSR from './table-ssr';

const TestPage = () => {
  return (
    <div className='p-20 border bg-sky-50 space-y-8 '>
      <TestForm />
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
      <DialogComponent />
    </div>
  );
};

export default TestPage;
