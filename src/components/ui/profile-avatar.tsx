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
          <div className='flex items-center gap-2'>
            <Avatar className='size-9'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col items-start'>
              <p className='text-sm  capitalize text-foreground'>
                {user?.name}
              </p>
              <p className='text-xs font-medium text-foreground/50'>
                {user?.email}
              </p>
            </div>
          </div>
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
