import React, { useState } from "react";
import SearchBar from "./SearchBar";
import FilterComponent from "./filters/FilterComponent";
import { useFetchData } from "../context/FetchDataContext";
import { Button } from "@mui/material";
import { useSearchParams } from "../context/SearchParamsContext";
import { usePagination } from "../dataTable/pagination/PaginationContext";

interface SearchParams {
    onSearchParamsChange: (params: string | null) => void;
}

const SearchComponent: React.FC<SearchParams> = ({ onSearchParamsChange }) => {
    const { query, setQuery, setFilters, filters, setSearchPerformed, setCurrentSearch } = useSearchParams();
    const { setUrlSearchParams } = useFetchData();
    const { setPage } = usePagination();

    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = () => {

        if (!query.trim() && !filters.length) {
            console.log('Empty search query and filters. Aborting search');
            return;
        }

        let searchParamsString: string | null = null;

        if (!query) {
            searchParamsString = `${filters}`;
        } else {
            searchParamsString = `"text":"${query}"`;

            if (filters.length > 0) {
                searchParamsString += `,${filters.join(',')}`;
            }
        }

        onSearchParamsChange(searchParamsString);
        setUrlSearchParams(searchParamsString);
        setPage(0)
        setCurrentSearch(searchParamsString);
    };

    const handleClear = () => {
        setSearchPerformed(false)
        setFilters([])
        setQuery('')
        setUrlSearchParams('')
        setPage(0)
    }

    return (
        <div>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch} />
            <FilterComponent onFiltersChange={setFilters} />
            <Button type='submit' variant='contained' className='buttonBackground clearButton' onClick={handleClear} style={{ position: 'absolute', top: '10px', left: '595px' }}>
                Clear
            </Button>
        </div>

    )
}

export default SearchComponent;