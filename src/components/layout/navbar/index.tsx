import { Expand } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import useApp from '@/hooks/useApp';
import useLayout from '@/hooks/useLayout';

import BrandLogo from '@/components/ui/brand-logo';
import { Button } from '@/components/ui/button';
import GlobalBreadcrumbs from '@/components/ui/global-breadcrumbs';
import ProfileAvatar from '@/components/ui/profile-avatar';

import { cn } from '@/lib/utils';

import SidebarCollapse from '../sidebar/collapse';
import SidebarMobileToggle from '../sidebar/mobile/toggle';

const Navbar = () => {
  const { companyTitle } = useApp();
  const { isCollapsed, setIsCollapsed } = useLayout();
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
            <div
              className='hidden w-fit cursor-pointer items-center md:flex border-r pr-4'
              onClick={() => setIsCollapsed((prev) => !prev)}
            >
              <SidebarCollapse isCollapsed={isCollapsed} />
            </div>
            {!homePage && <GlobalBreadcrumbs />}
          </div>

          <div className='flex items-center gap-4'>
            <Button size={'icon'} variant='ghost'>
              <Expand className='size-6' />
            </Button>

            <span className='block h-4 w-[1px] bg-border' />
            <ProfileAvatar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
