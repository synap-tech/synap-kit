import { CircleUser, LogOut, Moon, Settings } from 'lucide-react';

import useAuth from '@/hooks/useAuth';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProfileAvatar = () => {
  const { logout, signed } = useAuth();

  if (!signed) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuItem className='flex items-center justify-between'>
          Profile
          <CircleUser />
        </DropdownMenuItem>
        <DropdownMenuItem className='flex items-center justify-between'>
          Settings
          <Settings />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='flex items-center justify-between'>
          Dark Mode
          <Moon />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={logout}
          className='flex items-center justify-between'
        >
          Log Out
          <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAvatar;
