import ModalWrapper from './modal-wrapper';

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  isSmall?: boolean;
  isLarge?: boolean;
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
}

const DefaultModal: React.FC<IProps> = ({
  open,
  setOpen,
  className,
  isSmall,
  isLarge,
  children,
  title,
  subtitle,
}) => {
  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title={title}
      subtitle={subtitle}
      isLarge={isLarge}
      isSmall={isSmall}
      className={className}
    >
      {children}
    </ModalWrapper>
  );
};

export default DefaultModal;
