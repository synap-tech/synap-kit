import { useState } from 'react';

import { Settings as SettingsIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import FontSize from './font-size';

const Settings = () => {
  const [openFontSizeModal, setOpenFontSizeModal] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={'icon'} variant='outline'>
            <SettingsIcon className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='start'>
          <DropdownMenuItem onClick={() => setOpenFontSizeModal(true)}>
            Font Size
          </DropdownMenuItem>
          <DropdownMenuItem>Accent Color</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FontSize open={openFontSizeModal} setOpen={setOpenFontSizeModal} />
    </>
  );
};

export default Settings;
