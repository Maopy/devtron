import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import Panel from '@/panel'

async function init () {
  const appContainer = document.querySelector('#app-container')
  if (!appContainer) {
    throw new Error('Can not find #app-container')
  }

  const root = createRoot(appContainer)

  root.render(
    <StrictMode>
      <Panel />
    </StrictMode>
  )
}

init()
