import './bootstrap';
import React from 'react'
import { createRoot } from 'react-dom/client'
import TodoApplication from './components/Tasks'
function App() {
  return (
    <React.StrictMode>
      <TodoApplication />
    </React.StrictMode>
  )
}

const root = createRoot(document.getElementById('app') as HTMLElement)
root.render(<App />)
