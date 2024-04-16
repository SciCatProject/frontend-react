import React, { useState, useCallback, useEffect } from "react";
import FilterStack from "./FilterStack";

import { useFetchData } from "../../context/FetchDataContext";

interface FilterComponentProps {
    onFiltersChange: (selectedFilters: string[]) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = React.memo(({ onFiltersChange }) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [previousSelectedFilters, setPreviousSelectedFilters] = useState<string[]>([]);

    const { facets, setUrlSelectedFilters } = useFetchData();

    const handleFiltersChange = useCallback((filters: string[]) => {
        setSelectedFilters(filters);
        onFiltersChange(filters);
    }, [onFiltersChange]);

    useEffect(() => {
        if (selectedFilters.length !== 0 && JSON.stringify(selectedFilters) !== JSON.stringify(previousSelectedFilters)) {
            setUrlSelectedFilters(selectedFilters);
        }

        setPreviousSelectedFilters(selectedFilters);
    }, [selectedFilters, setUrlSelectedFilters, previousSelectedFilters]);

    return (
        <>
            <FilterStack onFiltersChange={handleFiltersChange} data={facets} />
        </>
    )
});

export default FilterComponent;