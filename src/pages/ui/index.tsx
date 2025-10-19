import { useState } from 'react';

import { toast } from 'sonner';

import StatusButton from '@/components/buttons/status';
import DataTableEntry from '@/components/core/data-table/entry';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { HolidayCalendar } from '@/components/ui/holiday-calendar';
import MonthPickerPopover from '@/components/ui/month-picker-popup';
import SectionContainer from '@/components/ui/section-container';
import SingleDatePicker from '@/components/ui/single-date-picker';
import StatusBadge from '@/components/ui/status-badge';
import { Switch } from '@/components/ui/switch';
import { ThemeToggle } from '@/components/ui/theme-toggle';

import User from '../hr/user';
import DialogComponent from './dialog';
import FingerprintEnroll from './fingerprint-enroll/fingerprint-enroll';
import TestForm from './form';
import TableSSR from './table-ssr';
import Wrapper from './wrapper';

const TestPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
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

      <SingleDatePicker
        showAssistant
        disableIcon
        className='justify-center'
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
      <MonthPickerPopover
        showAssistant
        disableIcon
        className='justify-center'
        date={selectedDate}
        setDate={setSelectedDate}
        maxDate={new Date()}
      />
      <HolidayCalendar
        selected={new Date()}
        highlightedDates={
          [{ date: '2026-01-01', name: 'New Year' }].map((e) => ({
            date: new Date(e.date),
            info: e.name,
          })) ?? []
        }
        className=''
      />
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

      <User />
      <TableSSR />
      <DialogComponent />
    </div>
  );
};

export default TestPage;
