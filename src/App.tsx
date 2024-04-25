import './App.css'
import React from 'react'
import SearchComponent from './components/search/SearchComponent'
import Header from './components/ui/Header'
import DataTable from './components/dataTable/DataTable'
import { columns } from './components/dataTable/DataTableColumns'
import { useFetchData } from './components/context/FetchDataContext'
import { useSearchParams } from './components/context/SearchParamsContext'
import ShowCurrentSearchQuery from './components/ui/ShowCurrentSearchQuery'


const App: React.FC = () => {

  const { datasets, filteredDatasets } = useFetchData();
  const { searchPerformed, setSearchPerformed } = useSearchParams();

  const handleSearchParams = (params: string | null) => {
    setSearchPerformed(!!params);
  };

  return (
    <>
      <Header />
      <div className='appContainer'>
        <SearchComponent onSearchParamsChange={handleSearchParams} />
        <ShowCurrentSearchQuery></ShowCurrentSearchQuery>

        <div style={{ width: '100vw' }}>

          {searchPerformed ? (
            <DataTable data={filteredDatasets} columns={columns} />
          ) : (
            <DataTable data={datasets} columns={columns} />
          )}

        </div>
      </div>

    </>
  )
}

export default App
