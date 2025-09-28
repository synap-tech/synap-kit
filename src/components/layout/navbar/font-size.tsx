import { useState } from 'react';

// import { useLocalStorage } from '@/hooks/useStorage';

import DefaultModal from '@/components/core/modal/default-modal';
import { Button } from '@/components/ui/button';
import DebouncedInput from '@/components/ui/debounce-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FontSize: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const [fontSize, setFontSize] = useState(13);
  const [fontSizeUnit, setFontSizeUnit] = useState('px');
  // const {} = useLocalStorage('fontSize', fontSize + fontSizeUnit);

  return (
    <DefaultModal open={open} setOpen={setOpen} title='Adjust Font Size'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-4'>
          <DebouncedInput
            type='number'
            value={fontSize}
            onChange={(value) => setFontSize(Number(value))}
          />
          <Select onValueChange={(e) => setFontSizeUnit(e)}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='px' />
            </SelectTrigger>
            <SelectContent>
              {['px', 'rem', 'em'].map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => {
            document.documentElement.style.setProperty(
              '--font-size',
              `${fontSize}${fontSizeUnit}`
            );

            setOpen(false);
          }}
        >
          Save
        </Button>
      </div>
    </DefaultModal>
  );
};

export default FontSize;
