import type { IRoute } from '@/types';
import matchUrl from '@/utils/routes/matchUrl';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';

import useLayout from '@/hooks/useLayout';

import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';

const variants = {
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  initial: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const SidebarFile: React.FC<IRoute> = ({ path, name, page_type }) => {
  const { setSidebarOpen } = useLayout();
  const { pathname } = useLocation();

  return (
    <motion.li
      variants={variants}
      initial='initial'
      animate='animate'
      title={name}
    >
      <NavLink
        onClick={() => setSidebarOpen(false)}
        to={path!}
        className={({ isActive }) =>
          cn(
            'relative flex w-full justify-between gap-2 rounded-r-md border-l-[3px] border-none px-4 py-2 text-sm transition-colors duration-200',
            isActive || matchUrl(path!, pathname)
              ? 'bg-gradient-to-r from-primary/10 to-primary/20 font-medium text-foreground'
              : 'text-foreground hover:bg-sidebar-active-background/80  hover:text-sidebar-active-foreground'
          )
        }
      >
        <span className='block w-full truncate'>{name}</span>

        {page_type?.type && (
          <Badge variant='primary' className='py-0.25 px-1.5'>
            {page_type.name}
          </Badge>
        )}

        {matchUrl(path!, pathname) ? (
          <motion.div
            className='absolute inset-0 h-full w-[3px] bg-primary'
            layoutId='active-sidebar-item'
          />
        ) : null}
      </NavLink>
    </motion.li>
  );
};

export default SidebarFile;
