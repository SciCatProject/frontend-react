import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FetchDataProvider } from './components/context/FetchDataContext.tsx'
import { PaginationProvider } from './components/dataTable/pagination/PaginationContext.tsx'
import { SearchParamsProvider } from './components/context/SearchParamsContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PaginationProvider>
      <SearchParamsProvider>
        <FetchDataProvider>
          <App />
        </FetchDataProvider>
      </SearchParamsProvider>
    </PaginationProvider>
  </React.StrictMode>,
)
