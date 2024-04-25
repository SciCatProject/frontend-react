import React from "react";
import { useSearchParams } from "../context/SearchParamsContext";

const ShowCurrentSearchQuery: React.FC = () => {
    const { searchPerformed, currentSearch } = useSearchParams();

    if (!searchPerformed) {
        return null;
    }

    const pairs = currentSearch.split(',')
        .map(pair => pair.split(':').map(str => str.trim()));

    const formattedSearch = pairs.map(([key, value]) => {
        key = key.replace(/"/g, '');
        value = value.replace(/"/g, '');

        if (value.startsWith('[') && value.endsWith(']')) {
            value = value.substring(1, value.length - 1);
            value = value.split(',').map(str => str.trim()).join(', ');
        }

        return `${key}: ${value}`;
    }).join(', ');

    let resultMessage = 'Showing results for: ' + formattedSearch

    return (
        <div style={{ position: 'absolute', top: '60px', left: '15px', color: 'gray' }}>
            {resultMessage}
        </div>
    );
};

export default ShowCurrentSearchQuery;
