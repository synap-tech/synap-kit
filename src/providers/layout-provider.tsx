import { createContext, useMemo, useState } from 'react';

import { useHotkeys } from 'react-hotkeys-hook';

export interface ILayoutContext {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayoutContext = createContext({} as ILayoutContext);

interface ILayoutProps {
  children: React.ReactNode;
}

const LayoutProvider: React.FC<ILayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useHotkeys('ctrl+q', () => {
    setIsCollapsed(!isCollapsed);
  });

  const value = useMemo((): ILayoutContext => {
    return {
      isCollapsed,
      setIsCollapsed,
      sidebarOpen,
      setSidebarOpen,
    };
  }, [isCollapsed, sidebarOpen]);

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;
