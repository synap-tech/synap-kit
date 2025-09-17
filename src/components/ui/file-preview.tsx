import { type ButtonProps, buttonVariants } from './button';

const FilePreview: React.FC<{
  preview: string | ArrayBuffer | null;
  children?: React.ReactNode;
  buttonProps?: ButtonProps;
  baseUrl: string;
}> = ({ preview, children, buttonProps, baseUrl }) => {
  return (
    <a
      className={buttonVariants({
        variant: buttonProps?.variant || 'accent',
        size: buttonProps?.size || 'sm',
        className: buttonProps?.className,
      })}
      target='_blank'
      href={(baseUrl + preview) as string}
    >
      {children}
    </a>
  );
};

export default FilePreview;
