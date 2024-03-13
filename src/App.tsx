import './App.css'
import React, { useState } from 'react'
import SearchComponent from './components/search/SearchComponent'
import Header from './components/ui/Header'
import FetchData from './components/dataTable/FetchDatasets'
import DataTable from './components/dataTable/DataTable'
import SearchData from './components/search/SeachData'

import { Data } from './components/dataTable/FetchDatasets'
import { columns } from './components/dataTable/DataTableColumns'

import { PaginationProvider } from './components/dataTable/pagination/PaginationContext'
import DatasetsCount from './components/dataTable/pagination/DatasetsCount'

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useState<any>(null);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);


  const handleSearchParams = (params: string | null) => {
    setSearchParams(params);
    setSearchPerformed(!!params);
    // console.log(searchParams)
  };

  return (
    <>
      <Header />
      <div className='container'>
        <SearchComponent onSearchParamsChange={handleSearchParams} />

        <PaginationProvider>
          <div style={{ width: '100vw' }}>
            <DatasetsCount searchParams={searchParams} />
            {searchPerformed ? (
              <SearchData searchParams={searchParams}>
                {(data: Data[]) => <DataTable data={data} columns={columns} />}
              </SearchData>
            ) : (
              <FetchData>
                {(data: Data[]) => <DataTable data={data} columns={columns} />}
              </FetchData>
            )}
          </div>
        </PaginationProvider>
      </div>

    </>
  )
}

export default App
