import { SidebarProvider } from '@/providers';

import useScreen from '@/hooks/useScreen';

import SidebarDesktop from './desktop';
import SidebarMobile from './mobile';

const Sidebar = () => {
  const { isTablet } = useScreen();
  return (
    <SidebarProvider>
      {!isTablet && <SidebarDesktop />}
      {isTablet && <SidebarMobile />}
    </SidebarProvider>
  );
};

export default Sidebar;
