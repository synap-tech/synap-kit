import { useLocation } from 'react-router-dom';

import useApp from '@/hooks/useApp';

// import useLayout from '@/hooks/useLayout';

import BrandLogo from '@/components/ui/brand-logo';
import GlobalBreadcrumbs from '@/components/ui/global-breadcrumbs';

import { cn } from '@/lib/utils';

// import SidebarCollapse from '../sidebar/collapse';
import SidebarMobileToggle from '../sidebar/mobile/toggle';

const Navbar = () => {
  const { companyTitle, navbarActions } = useApp();
  // const { isCollapsed, setIsCollapsed } = useLayout();
  const { pathname } = useLocation();
  const homePage = pathname === '/';
  return (
    <div className='w-full '>
      <div className='flex flex-col'>
        {/* Mobile View */}
        <div
          className={cn(
            'flex items-center justify-between gap-4 border-b  px-4 py-1 md:hidden',
            homePage && 'border-none'
          )}
        >
          <BrandLogo title={companyTitle} className={'w-fit text-primary'} />
          <SidebarMobileToggle />
        </div>

        {/* Desktop View */}

        <div
          className={cn(
            'md:py-0 min-h-14 py-3 flex items-center justify-between px-4 ',
            pathname === '/' && 'hidden md:block'
          )}
        >
          <div className={cn('flex items-center gap-4 ')}>
            {/* <div
              className='hidden w-fit cursor-pointer items-center md:flex border-r pr-4'
              onClick={() => setIsCollapsed((prev) => !prev)}
            >
              <SidebarCollapse isCollapsed={isCollapsed} />
            </div> */}
            {!homePage && <GlobalBreadcrumbs />}
          </div>

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
              {/* <Button size={'icon'} variant='ghost'>
                <Expand className='size-6' />
              </Button>

              <span className='block h-4 w-[1px] bg-border' />
              <ProfileAvatar /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
