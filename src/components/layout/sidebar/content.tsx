import { cn } from '@/lib/utils';

import SidebarHeader from './header';
import SidebarMenu from './menu';

const SidebarContent = () => {
  return (
    <aside className={cn('flex h-screen flex-col overflow-hidden')}>
      <SidebarHeader />
      <SidebarMenu />
    </aside>
  );
};

export default SidebarContent;
