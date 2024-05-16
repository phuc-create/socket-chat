import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { MessageContextProvider } from './AppContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MessageContextProvider>
      <App />
    </MessageContextProvider>
  </React.StrictMode>,
)
