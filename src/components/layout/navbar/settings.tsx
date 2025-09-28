import { useState } from 'react';

import { colors } from '@/config/tailwind';
import { Settings as SettingsIcon } from 'lucide-react';
import { CirclePicker } from 'react-color';
import { toast } from 'sonner';

import { useLocalStorage } from '@/hooks/useStorage';

import DefaultModal from '@/components/core/modal/default-modal';
import { Button } from '@/components/ui/button';
import DebouncedInput from '@/components/ui/debounce-input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [currentFontSize, setCurrentFontSize] = useLocalStorage(
    'fontSize',
    '13'
  );

  const [fontSize, setFontSize] = useState(currentFontSize);

  const [currentFontSizeUnit, setCurrentFontSizeUnit] = useLocalStorage(
    'fontSizeUnit',
    'px'
  );
  const [fontSizeUnit, setFontSizeUnit] = useState(currentFontSizeUnit);

  const [currentAccentColor, setCurrentAccentColor] = useLocalStorage(
    'accentColor',
    colors.ACCENT
  );
  const [color, setColor] = useState(currentAccentColor);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size={'icon'} variant='outline'>
        <SettingsIcon className='size-4' />
      </Button>
      <DefaultModal title='App Settings' open={isOpen} setOpen={setIsOpen}>
        <div className='space-y-4'>
          <div className='flex flex-col gap-2'>
            <Label>Font Size</Label>
            <div className='flex items-center gap-4'>
              <DebouncedInput
                type='number'
                value={Number(fontSize)}
                defaultValue={Number(currentFontSize)}
                min={fontSizeUnit === 'px' ? 10 : undefined}
                onChange={(value) => setFontSize(Number(value))}
              />
              <Select
                onValueChange={(e) => setFontSizeUnit(e)}
                value={fontSizeUnit}
                defaultValue={fontSizeUnit}
              >
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
                `${fontSize}${fontSizeUnit}`
              );

              document.documentElement.style.setProperty(
                '--color-accent',
                `${color}`
              );

              setCurrentFontSize(`${fontSize}`);
              setCurrentAccentColor(`${color}`);
              setCurrentFontSizeUnit(`${fontSizeUnit}`);
              setIsOpen(false);
              toast.success('Settings saved successfully');
            }}
          >
            Save Settings
          </Button>
        </div>
      </DefaultModal>
    </>
  );
};

export default Settings;
