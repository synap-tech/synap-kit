import { cn } from '@/lib/utils';

import SectionHeader from './section-header';

export interface ISectionContainerProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  extraHeader?: React.ReactNode;
  contentClassName?: string;
  headerClassName?: string;
}

const SectionContainer = ({
  title,
  children,
  className,
  extraHeader,
  contentClassName,
  headerClassName,
}: ISectionContainerProps) => {
  return (
    <div className={cn('rounded bg-background overflow-hidden', className)}>
      <SectionHeader className={headerClassName} extraHeader={extraHeader}>
        {title}
      </SectionHeader>
      <div className={cn('overflow-hidden px-4 pb-4', contentClassName)}>
        {children}
      </div>
    </div>
  );
};

export default SectionContainer;
