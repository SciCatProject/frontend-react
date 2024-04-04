import './App.css'
import React, { useState } from 'react'
import SearchComponent from './components/search/SearchComponent'
import Header from './components/ui/Header'
import DataTable from './components/dataTable/DataTable'
import { columns } from './components/dataTable/DataTableColumns'
import { useFetchData } from './components/context/FetchDataContext'


const App: React.FC = () => {
  // const [searchParams, setSearchParams] = useState<any>(null);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  const { datasets, searchDatasets } = useFetchData();

  const handleSearchParams = (params: string | null) => {
    // setSearchParams(params);
    setSearchPerformed(!!params);
  };

  return (
    <>
      <Header />
      <div className='container'>
        <SearchComponent onSearchParamsChange={handleSearchParams} />

        <div style={{ width: '100vw' }}>

          {searchPerformed ? (
            <DataTable data={searchDatasets} columns={columns} />
          ) : (
            <DataTable data={datasets} columns={columns} />
          )}

        </div>
      </div>

    </>
  )
}

export default App
