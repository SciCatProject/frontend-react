import React, { useState, useCallback, useMemo } from "react";
import FetchFullfacet from "./FetchFullfacet";
import FilterStack from "./FilterStack";
import { Data } from "./FetchFullfacet";

interface FilterComponentProps {
    onFiltersChange: (selectedFilters: string[]) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = React.memo(({ onFiltersChange }) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleFiltersChange = useCallback((filters: string[]) => {
        setSelectedFilters(filters);
        onFiltersChange(filters);
    }, [onFiltersChange]);

    const children = useMemo(() => {
        return (data: Data[]) => <FilterStack onFiltersChange={handleFiltersChange} data={data} />;
    }, [handleFiltersChange]);


    return (
        <>
            <FetchFullfacet selectedFilters={selectedFilters} children={children}>
            </FetchFullfacet>
        </>
    )
});

export default FilterComponent;