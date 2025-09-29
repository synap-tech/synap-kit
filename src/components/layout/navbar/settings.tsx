import { useState } from 'react';

import { colors } from '@/config/tailwind';
import { Minus, Plus } from 'lucide-react';
import { CirclePicker } from 'react-color';
import { toast } from 'sonner';

import { useLocalStorage } from '@/hooks/useStorage';

import DefaultModal from '@/components/core/modal/default-modal';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import DebouncedInput from '@/components/ui/debounce-input';
import { Label } from '@/components/ui/label';

const Settings: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const [currentFontSize, setCurrentFontSize] = useLocalStorage(
    'fontSize',
    '13'
  );

  const [fontSize, setFontSize] = useState(currentFontSize);

  const [currentAccentColor, setCurrentAccentColor] = useLocalStorage(
    'accentColor',
    colors.ACCENT
  );
  const [color, setColor] = useState(currentAccentColor);

  return (
    <DefaultModal title='App Settings' open={open} setOpen={setOpen}>
      <div className='space-y-4'>
        <div className='flex flex-col gap-2'>
          <Label>Font Size (px)</Label>
          <div className='flex items-center gap-4'>
            <DebouncedInput
              disabled
              type='number'
              value={Number(fontSize)}
              defaultValue={Number(currentFontSize)}
              min={10}
              onChange={(value) => setFontSize(Number(value))}
              className='h-9 disabled:border-input disabled:text-primary'
            />

            <ButtonGroup className='rounded-md'>
              <Button
                disabled={fontSize <= 10}
                onClick={() => setFontSize(Number(fontSize) - 1)}
                variant={'ghost'}
                size={'icon-lg'}
              >
                <Minus className='size-5' />
              </Button>

              <Button
                onClick={() => setFontSize(Number(fontSize) + 1)}
                variant={'ghost'}
                size={'icon-lg'}
              >
                <Plus className='size-5' />
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Accent Color</Label>
          <CirclePicker
            color={color}
            onChangeComplete={(value) => {
              setColor(value.hex);
            }}
          />
        </div>

        <Button
          variant={'default'}
          onClick={() => {
            document.documentElement.style.setProperty(
              '--font-size',
              `${fontSize}px`
            );

            document.documentElement.style.setProperty(
              '--color-accent',
              `${color}`
            );

            setCurrentFontSize(`${fontSize}`);
            setCurrentAccentColor(`${color}`);
            setOpen(false);
            toast.success('Settings saved successfully');
          }}
        >
          Save Settings
        </Button>
      </div>
    </DefaultModal>
  );
};

export default Settings;
