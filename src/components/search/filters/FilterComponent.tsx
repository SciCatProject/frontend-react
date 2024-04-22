import React, { useState, useCallback, useEffect } from "react";
import FilterStack from "./FilterStack";

import { useFetchData } from "../../context/FetchDataContext";
import { useSearchParams } from "../../context/SearchParamsContext";

interface FilterComponentProps {
    onFiltersChange: (selectedFilters: string[]) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = React.memo(({ onFiltersChange }) => {
    const [previousSelectedFilters, setPreviousSelectedFilters] = useState<string[]>([]);

    const { facets, setUrlSelectedFilters } = useFetchData();
    const { filters, setFilters } = useSearchParams();

    const handleFiltersChange = useCallback((newFilters: string[]) => {
        onFiltersChange(newFilters);
        setFilters(newFilters)
    }, [onFiltersChange, setFilters]);

    useEffect(() => {
        if (JSON.stringify(filters) !== JSON.stringify(previousSelectedFilters)) {
            setUrlSelectedFilters(filters);
        }

        setPreviousSelectedFilters(filters);
    }, [filters, setUrlSelectedFilters, previousSelectedFilters]);

    return (
        <>
            <FilterStack onFiltersChange={handleFiltersChange} data={facets} />
        </>
    )
});

export default FilterComponent;