import { useState } from 'react';

import {
  CircleUser,
  LogOut,
  Moon,
  Settings as SettingsIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import AppSettings from '../layout/navbar/app-settings';

const ProfileAvatar = () => {
  const { user, logout, signed } = useAuth();

  const [isOpenSettings, setIsOpenSettings] = useState(false);

  if (!signed) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56'>
          <Link to={`/profile/${user?.employee_uuid}`}>
            <DropdownMenuItem className='flex items-center justify-between'>
              Profile
              <CircleUser />
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={() => setIsOpenSettings(true)}
            className='flex items-center justify-between'
          >
            Settings
            <SettingsIcon />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='flex items-center justify-between'>
            Dark Mode
            <Moon />
          </DropdownMenuItem>
          <DropdownMenuItem
            variant='destructive'
            onClick={logout}
            className='flex items-center justify-between'
          >
            Log Out
            <LogOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AppSettings open={isOpenSettings} setOpen={setIsOpenSettings} />
    </>
  );
};

export default ProfileAvatar;
