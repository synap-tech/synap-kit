import { useLocation } from 'react-router-dom';

import useApp from '@/hooks/useApp';
import useLayout from '@/hooks/useLayout';

import { Button } from '@/components/ui/button';
// import useLayout from '@/hooks/useLayout';

import GlobalBreadcrumbs from '@/components/ui/global-breadcrumbs';

import { cn } from '@/lib/utils';

import SidebarCollapse from '../sidebar/collapse';
// import SidebarCollapse from '../sidebar/collapse';
import SidebarMobileToggle from '../sidebar/mobile/toggle';

const Navbar = () => {
  const { navbarActions } = useApp();
  const { toggleSidebar, isCollapsed } = useLayout();
  const { pathname } = useLocation();
  const homePage = pathname === '/';
  return (
    <div className='w-full '>
      <div className='flex flex-col'>
        {/* Desktop View */}
        <div
          className={cn(
            'md:py-0 min-h-14 py-3 flex items-center justify-between px-4 ',
            pathname === '/' && 'hidden md:block'
          )}
        >
          <div className={cn('flex items-center gap-4 ')}>
            <Button
              className='hidden lg:flex'
              onClick={toggleSidebar}
              variant={'ghost'}
              size={'icon'}
            >
              <SidebarCollapse isCollapsed={isCollapsed} />
            </Button>
            {!homePage && <GlobalBreadcrumbs />}
          </div>

          <div className='flex items-center gap-2 lg:gap-4'>
            {navbarActions && navbarActions.length > 0 && (
              <div className='flex items-center gap-4'>
                {navbarActions
                  .sort((a, b) => a.order - b.order)
                  .map((item, index) => {
                    return (
                      <div key={index}>
                        {item.component}
                        {item.addSeparator && (
                          <span className='block h-4 w-[1px] bg-border' />
                        )}
                      </div>
                    );
                  })}
              </div>
            )}

            <div className='flex items-center gap-2 lg:hidden'>
              <span className='block h-4 w-[1px] bg-border' />
              <SidebarMobileToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
