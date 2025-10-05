import { Suspense } from 'react';

import { LayoutProvider } from '@/providers';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Outlet } from 'react-router-dom';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

import Navbar from './navbar';
import Sidebar from './sidebar';

const Layout = () => {
  const isLaptop = useMediaQuery('only screen and (max-width : 1366px)');
  const isDesktop = useMediaQuery('only screen and (min-width : 1520px)');
  const isTablet = useMediaQuery('only screen and (max-width : 1024px)');

  return (
    <LayoutProvider>
      <div className='relative flex h-screen w-screen overflow-hidden bg-layout-background'>
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

  return (
    <LayoutProvider>
      <div className='relative flex h-screen w-screen overflow-hidden bg-layout-background'>
        <Sidebar />
        <main className='flex size-full flex-1 flex-col overflow-hidden'>
          <Navbar />
          <div className='relative flex size-full flex-1 flex-col overflow-hidden'>
            <div className='size-full flex-1 overflow-auto pr-3'>
              {/* px-3 py-2.5 lg:px-6 lg:py-3.5 */}
              <Suspense fallback='loading...'>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </LayoutProvider>
  );
};

export default Layout;
