import { useState } from 'react';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
// import { exampleThemeStorage } from '@extension/storage';
// import { t } from '@extension/i18n';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './components/AppSidebar';

import '@/Panel.css';

const Panel = () => {
  const [count, setCount] = useState(0)

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <h1 className='text-3xl font-bold underline'>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </main>
    </SidebarProvider>
  );
};

export default withErrorBoundary(withSuspense(Panel, <div> Loading ... </div>), <div> Error Occur </div>);
