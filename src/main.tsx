import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FetchDataProvider } from './components/context/FetchDataContext.tsx'
import { PaginationProvider } from './components/dataTable/pagination/PaginationContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PaginationProvider>
      <FetchDataProvider>
        <App />
      </FetchDataProvider>
    </PaginationProvider>
  </React.StrictMode>,
)
