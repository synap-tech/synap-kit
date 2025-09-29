import { createContext, useEffect, useMemo } from 'react';

import { colors } from '@/config/tailwind';
import type { INavAction, IRoute } from '@/types';
import { Toaster } from 'sonner';

import { useLocalStorage } from '@/hooks/useStorage';

import { Toast } from '@/components/ui/toast';

export interface IAppContext {
  companyTitle: string;
  apiBaseUrl: string;
  imageApiBaseUrl: string;
  sidebarRoutes: IRoute[];
  navbarActions?: INavAction[];
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

const AppProvider: React.FC<{
  children: React.ReactNode;
  apiBaseUrl: string;
  imageApiBaseUrl: string;
  sidebarRoutes: IRoute[];
  companyTitle: string;
  navbarActions?: INavAction[];
}> = ({
  children,
  apiBaseUrl,
  imageApiBaseUrl,
  sidebarRoutes,
  companyTitle,
  navbarActions,
}) => {
  const value = useMemo(
    (): IAppContext => ({
      apiBaseUrl,
      imageApiBaseUrl,
      sidebarRoutes,
      companyTitle,
      navbarActions,
    }),
    [apiBaseUrl, imageApiBaseUrl, sidebarRoutes, companyTitle, navbarActions]
  );

  const [fontSize] = useLocalStorage('fontSize', '13');
  const [accentColor] = useLocalStorage('accentColor', colors.ACCENT);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
    document.documentElement.style.setProperty(
      '--color-accent',
      `${accentColor}`
    );
  }, [fontSize, accentColor]);

  return (
    <AppContext.Provider value={value}>
      {children}
      <Toast />
      <Toaster richColors position={'top-center'} expand={true} />
    </AppContext.Provider>
  );
};

export default AppProvider;
