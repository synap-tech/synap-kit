import { motion } from 'framer-motion';
import { ListCollapse, X } from 'lucide-react';

import useApp from '@/hooks/useApp';
import useLayout from '@/hooks/useLayout';
import useSidebar from '@/hooks/useSidebar';

import BrandLogo from '@/components/ui/brand-logo';
import { buttonVariants } from '@/components/ui/button';
import TooltipWrapper from '@/components/ui/tooltip-wrapper';

import Search from './search';

const SidebarHeader = () => {
  const { title } = useApp();
  const { setSidebarOpen } = useLayout();
  const { setIsCloseAll } = useSidebar();

  return (
    <div>
      <div className='relative border-b border-border/10 px-2 '>
        <div className='min-h-14 flex items-center justify-center px-4 border-b pt-3 pb-1'>
          <BrandLogo title={title} />
        </div>

        <button
          className='btn btn-square btn-ghost btn-sm absolute right-4 top-4 text-destructive md:hidden'
          onClick={() => setSidebarOpen(false)}
        >
          <X />
        </button>
      </div>

      <div className='flex justify-between px-4 py-4 gap-4'>
        <Search />
        <TooltipWrapper message='Collapse Folders'>
          <motion.button
            aria-label='Collapse Folders'
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCloseAll((prev) => !prev)}
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
              className: 'opacity-70',
            })}
          >
            <ListCollapse className='size-4' />
          </motion.button>
        </TooltipWrapper>
      </div>
    </div>
  );
};

export default SidebarHeader;
