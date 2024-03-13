import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FilterComponent from "./filters/FilterComponent";

interface SearchParams {
    onSearchParamsChange: (params: string | null) => void;
}

const SearchComponent: React.FC<SearchParams> = ({ onSearchParamsChange }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filters, setFilters] = useState<string[]>([]);

    const handleSearch = () => {
        // console.log('Text Search:', searchQuery);
        // console.log('Filters applied: ', filters);

        if (searchQuery.trim() === '' && filters.length === 0) {
            console.log('Empty search query and filters. Aborting search');
            return;
        }

        let searchParamsString: string | null = null;

        if (searchQuery === '') {
            searchParamsString = `${filters}`;
        } else {
            searchParamsString = `"text":"${searchQuery}"`;

            if (filters.length > 0) {
                searchParamsString += `,${filters.join(',')}`;
            }
        }

        onSearchParamsChange(searchParamsString);
    };

    return (
        <div>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch} />
            <FilterComponent onFiltersChange={setFilters} />
        </div>

    )
}

export default SearchComponent;