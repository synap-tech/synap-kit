import {
  createContext,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { ImperativePanelHandle } from 'react-resizable-panels';

import useScreen from '@/hooks/useScreen';

import type { ResizablePanel } from '@/components/ui/resizable';

export interface ILayoutContext {
  isCollapsed: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  defaultSize: number;
  sidePanel: RefObject<ImperativePanelHandle | null>;
  toggleSidebar: () => void;
}

export const LayoutContext = createContext({} as ILayoutContext);

interface ILayoutProps {
  children: (value: ILayoutContext) => React.ReactNode;
}

const LayoutProvider: React.FC<ILayoutProps> = ({ children }) => {
  const { isTablet, isLaptop, isDesktop } = useScreen();
  const defaultSize = isDesktop ? 12 : isLaptop ? 15 : isTablet ? 0 : 20;
  const sidePanel = useRef<React.ComponentRef<typeof ResizablePanel>>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapse, setCollapse] = useState(sidePanel.current?.getSize() === 0);

  const toggleSidebar = useCallback(() => {
    const panel = sidePanel.current;
    const size = panel?.getSize();

    if (size === 0) {
      panel?.resize(defaultSize);
      setCollapse(false);
    } else {
      panel?.resize(0);
      setCollapse(true);
    }
  }, [defaultSize]);

  const value = useMemo((): ILayoutContext => {
    return {
      isCollapsed: collapse,
      sidebarOpen,
      setSidebarOpen,
      isTablet,
      isLaptop,
      isDesktop,
      defaultSize,
      toggleSidebar,
      sidePanel,
    };
  }, [
    collapse,
    sidebarOpen,
    isTablet,
    isLaptop,
    isDesktop,
    defaultSize,
    toggleSidebar,
    sidePanel,
  ]);

  return (
    <LayoutContext.Provider value={value}>
      {children(value)}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
