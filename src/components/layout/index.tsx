import { Suspense } from 'react';

import { LayoutProvider } from '@/providers';
import { Outlet } from 'react-router-dom';

import useScreen from '@/hooks/useScreen';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

import Navbar from './navbar';
import Sidebar from './sidebar';

const Layout = () => {
  const { isTablet, isLaptop, isDesktop } = useScreen();

  return (
    <LayoutProvider>
      <div className='relative flex h-screen w-screen overflow-hidden bg-background '>
        <ResizablePanelGroup direction='horizontal' className='size-full'>
          <ResizablePanel
            defaultSize={isDesktop ? 12 : isLaptop ? 15 : isTablet ? 0 : 20}
            minSize={0}
            maxSize={isTablet ? 0 : 20}
          >
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle className='opacity-0 lg:opacity-100' />
          <ResizablePanel
            defaultSize={isDesktop ? 88 : isLaptop ? 85 : isLaptop ? 100 : 100}
          >
            <main className='flex size-full flex-1 flex-col overflow-hidden'>
              <Navbar />
              <div className='relative flex size-full flex-1 flex-col overflow-hidden'>
                <div className='size-full flex-1 overflow-auto lg:px-4'>
                  {/* px-3 py-2.5 lg:px-6 lg:py-3.5 */}
                  <Suspense fallback='loading...'>
                    <Outlet />
                  </Suspense>
                </div>
              </div>
            </main>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </LayoutProvider>
  );
};

export default Layout;
