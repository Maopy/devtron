import { useState } from 'react';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { Pane, Panes } from './components/pane';

import '@/panel.css';

const Panel = () => {
  const [activePane, setActivePane] = useState<Pane>('about');
  const ActivePane = Panes[activePane];

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar
          onPaneChange={setActivePane}
          activePane={activePane}
        />
        <main className='w-full'>
          <header className='px-2 border-b border-gray-800'>
            <SidebarTrigger />
          </header>
          <ActivePane />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default withErrorBoundary(withSuspense(Panel, <div> Loading ... </div>), <div> Error Occur </div>);
