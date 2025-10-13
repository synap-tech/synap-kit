import { cn } from '@/lib/utils';

import SectionHeader from './section-header';

export interface ISectionContainerProps {
  title: string;
  info?: string;
  children: React.ReactNode;
  className?: string;
  extraHeader?: React.ReactNode;
  contentClassName?: string;
  headerClassName?: string;
}

const SectionContainer = ({
  title,
  info,
  children,
  className,
  extraHeader,
  contentClassName,
  headerClassName,
}: ISectionContainerProps) => {
  return (
    <div className={cn('rounded bg-background overflow-hidden', className)}>
      <SectionHeader
        title={title}
        info={info}
        className={headerClassName}
        extraHeader={extraHeader}
      />
      <div className={cn('overflow-hidden px-4 pb-4', contentClassName)}>
        {children}
      </div>
    </div>
  );
};

export default SectionContainer;
