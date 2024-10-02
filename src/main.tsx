import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n.js';
import { AppProvider } from './components/Context/Context.jsx';
import { domAnimation, LazyMotion } from 'framer-motion'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <LazyMotion features={domAnimation}>
        <App />
      </LazyMotion> 
    </AppProvider>
  </React.StrictMode>,
)
