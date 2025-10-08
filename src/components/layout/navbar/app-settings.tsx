import { useState } from 'react';

import { set } from 'lodash';
import { CirclePicker } from 'react-color';
import { toast } from 'sonner';

import { useLocalStorage } from '@/hooks/useStorage';

import DefaultModal from '@/components/core/modal/default-modal';
import { Button } from '@/components/ui/button';
import InputWithPlusMinusButton from '@/components/ui/input-with-plus-minus';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

const AppSettings: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const [currentFontSize, setCurrentFontSize] = useLocalStorage(
    'fontSize',
    '13'
  );

  const [currentPrimaryColor, setCurrentPrimaryColor] = useLocalStorage(
    'primaryColor',
    ''
  );

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [color, setColor] = useState(currentPrimaryColor);

  return (
    <DefaultModal title='App Settings' open={open} setOpen={setOpen}>
      <div className='space-y-6'>
        <div className='flex flex-col gap-2'>
          <Label>Font Size (px)</Label>

          <InputWithPlusMinusButton
            className={cn(
              fontSize === 10 || fontSize === 16 ? '!border-destructive/20' : ''
            )}
            numberFieldProps={{
              defaultValue: Number(currentFontSize),
              value: Number(fontSize),
              minValue: 10,
              maxValue: 16,
            }}
            decrementButtonProps={{
              isDisabled: fontSize <= 10,
              onClick: () => setFontSize(Number(fontSize) - 1),
            }}
            incrementButtonProps={{
              isDisabled: fontSize >= 16,
              onClick: () => setFontSize(Number(fontSize) + 1),
            }}
            inputProps={{
              disabled: true,
            }}
          />
        </div>
        <div className='flex flex-col gap-2.5'>
          <Label>Theme Color</Label>
          <CirclePicker
            color={color}
            onChangeComplete={(value) => {
              setColor(value.hex);
            }}
          />
        </div>

        <div className='flex justify-between gap-4'>
          <Button
            onClick={() => {
              setCurrentPrimaryColor('');
              setCurrentFontSize('16');
              setFontSize(16);
              setColor('');
              document.documentElement.style.setProperty('--font-size', `16px`);
              document.documentElement.style.setProperty('--primary', ``);
              setOpen(false);
            }}
            variant={'outline'}
            className=''
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              document.documentElement.style.setProperty(
                '--font-size',
                `${fontSize}px`
              );

              document.documentElement.style.setProperty(
                '--primary',
                `${color}`
              );

              setCurrentFontSize(`${fontSize}`);
              setCurrentPrimaryColor(`${color}`);
              setOpen(false);
              toast.success('Settings saved successfully');
            }}
          >
            Save Settings
          </Button>
        </div>
      </div>
    </DefaultModal>
  );
};

export default AppSettings;
