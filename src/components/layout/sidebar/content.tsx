import { cn } from '@/lib/utils';

import SidebarHeader from './header';
import SidebarMenu from './menu';

const SidebarContent = () => {
  return (
    <aside className={cn('flex h-full flex-col ')}>
      <SidebarHeader />
      <SidebarMenu />
      {/* <div className='p-4'>
        <SidebarLogout />
      </div> */}
    </aside>
  );
};

export default SidebarContent;
