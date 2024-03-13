import React, { useState } from "react";
import FetchFullfacet from "./FetchFullfacet";
import FilterStack from "./FilterStack";
import { Data } from "./FetchFullfacet";

interface FilterComponentProps {
    onFiltersChange: (selectedFilters: string[]) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onFiltersChange }) => {

    const handleFiltersChange = (selectedFilters: string[]) => {
        onFiltersChange(selectedFilters);
    };


    return (
        <>
            <FetchFullfacet>
                {(data: Data[]) => <FilterStack onFiltersChange={handleFiltersChange} data={data} />}
            </FetchFullfacet>
        </>
    )
}

export default FilterComponent;