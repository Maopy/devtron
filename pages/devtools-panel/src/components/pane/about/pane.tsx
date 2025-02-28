import { Button } from '@/components/ui/button'
import { chromeAPIs } from './chrome-helpers'
import metadata from '../../../../package.json'

export default function AboutPane () {
  return (
    <div className='p-4 flex flex-col gap-4'>
      <header>
        <h1
          className='text-xl font-bold'
        >Devtron <small className='text-sm text-gray-400'>v{metadata.version}</small>
        </h1>
        <p>A DevTools extension for Electron</p>
      </header>
      <main>
        <h2 className='text-sm font-bold'>Chrome APIs</h2>
        <ul>
          <li>Tab ID: {window.chrome.devtools.inspectedWindow.tabId}</li>
          <li>Runtime ID: {window.chrome.runtime.id}</li>
        </ul>

        <p className='py-2'>
          This is the list of Chrome DevTools Extension APIs currently implemented by Electron.

          <Button
            className='text-xs px-1 py-0 cursor-pointer text-blue-500 h-1'
            onClick={() => window.open('https://developer.chrome.com/docs/extensions/reference/api', '_blank')}
            variant='link'
          >View the docs.
          </Button>
        </p>
        <pre>
          {chromeAPIs?.join('\n')}
        </pre>
      </main>
    </div>
  )
}
