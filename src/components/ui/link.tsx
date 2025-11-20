import { Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import useApp from '@/hooks/useApp';

import { cn } from '@/lib/utils';

import CopyClipboard from './copy-clipboard';

interface ILinkOnlyProps {
  uri: string;
  title: string;
  baseUrlNeeded?: boolean;
  showCopyButton?: boolean;
}

export const LinkOnly = ({ uri, title }: ILinkOnlyProps) => {
  return (
    <Link
      target='_blank'
      to={uri}
      className='font-medium text-foreground underline hover:text-accent'
    >
      {title}
    </Link>
  );
};

export const CustomLink = ({
  label = '',
  url = '',
  name = '',
  showCopyButton = true,
  openInNewTab = false,
  className = '',
}) => {
  if (!label) return '';

  const displayName = name ? name : label;
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {showCopyButton ? (
        <CopyClipboard text={label} />
      ) : (
        <Link2 className='-rotate-45 size-4' size={16} />
      )}

      {url === null ? (
        <span>{displayName}</span>
      ) : (
        <Link
          to={url}
          className={cn(
            'hover:text-info hover:decoration-info font-normal underline underline-offset-2 transition-colors duration-300',
            url !== null
              ? 'cursor-pointer'
              : 'pointer-events-none cursor-not-allowed'
          )}
          target={openInNewTab ? '_blank' : '_self'}
        >
          {displayName}
        </Link>
      )}
    </div>
  );
};

export const LinkWithRedirect = ({
  title,
  uri,
  baseUrlNeeded = true,
  showCopyButton = false,
}: ILinkOnlyProps) => {
  const {
    config: { apiBaseUrl },
  } = useApp();

  if (baseUrlNeeded) {
    return (
      <div className={cn('flex items-center gap-2')}>
        {showCopyButton && <CopyClipboard text={uri} />}
        <Link
          target='_blank'
          className='font-medium text-foreground underline hover:text-accent'
          to={apiBaseUrl + uri}
        >
          {title}
        </Link>
      </div>
    );
  } else {
    return (
      <div className={cn('flex items-center gap-2')}>
        {showCopyButton && <CopyClipboard text={uri} />}
        <Link
          target='_blank'
          className='font-medium text-foreground underline hover:text-accent'
          to={uri}
        >
          {title}
        </Link>
      </div>
    );
  }
};
