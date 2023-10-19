import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { NextUIProvider } from '@nextui-org/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="bg-background font-mono text-foreground dark">
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
)
