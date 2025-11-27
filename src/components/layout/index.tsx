import { Suspense } from 'react';

import { LayoutProvider } from '@/providers';
import { Outlet } from 'react-router-dom';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

import Navbar from './navbar';
import Sidebar from './sidebar';

const Layout = () => {
  return (
    <LayoutProvider>
      {({ defaultSize, sidePanel, isTablet, isLaptop, isDesktop }) => {
        let default_size = 100;
        if (isDesktop) default_size = 88;
        if (isLaptop) default_size = 85;
        return (
          <div className='relative flex h-screen w-screen overflow-hidden'>
            <ResizablePanelGroup direction='horizontal' className='size-full'>
              <ResizablePanel
                ref={sidePanel}
                defaultSize={defaultSize}
                minSize={0}
                maxSize={isTablet ? 0 : 20}
              >
                <Sidebar />
              </ResizablePanel>
              <ResizableHandle className='opacity-0 lg:opacity-100' />
              <ResizablePanel defaultSize={default_size}>
                <main className='flex size-full flex-1 flex-col overflow-hidden'>
                  <Navbar />
                  <div className='relative flex size-full flex-1 flex-col overflow-hidden'>
                    <div className='size-full flex-1 overflow-auto lg:px-4'>
                      <Suspense fallback='loading...'>
                        <Outlet />
                      </Suspense>
                    </div>
                  </div>
                </main>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        );
      }}
    </LayoutProvider>
  );
};

export default Layout;
