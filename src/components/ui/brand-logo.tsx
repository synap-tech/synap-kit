import { NavLink } from 'react-router-dom';

import useApp from '@/hooks/useApp';

import { cn } from '@/lib/utils';

interface IBrandLogoProps {
  className?: string;
  title: string;
}

const BrandLogo: React.FC<IBrandLogoProps> = ({
  className,
  title,
  ...props
}) => {
  const { sidebarRoutes } = useApp();
  const route = sidebarRoutes[0];

  return (
    <NavLink
      className={cn(
        'flex items-center justify-center text-2xl font-bold text-foreground md:text-[2rem]',
        className
      )}
      to={route.path!}
      {...props}
    >
      {title}
    </NavLink>
  );
};

export default BrandLogo;
