import React, { createContext, useContext, useState } from 'react';

interface SearchParamsContextType {
    query: string;
    filters: string[];
    searchPerformed: boolean,
    currentSearch: string,
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    setFilters: React.Dispatch<React.SetStateAction<string[]>>;
    setSearchPerformed: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchParamsContext = createContext<SearchParamsContextType | undefined>(undefined);

export const useSearchParams = () => {
    const context = useContext(SearchParamsContext);
    if (!context) {
        throw new Error('useSearchParams must be used within a SearchParamsProvider');
    }
    return context;
};

export const SearchParamsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [query, setQuery] = useState<string>('')
    const [filters, setFilters] = useState<string[]>([])
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
    const [currentSearch, setCurrentSearch] = useState<string>('')

    const value = {
        query,
        filters,
        searchPerformed,
        currentSearch,
        setQuery,
        setFilters,
        setSearchPerformed,
        setCurrentSearch
    };

    return <SearchParamsContext.Provider value={value}>{children}</SearchParamsContext.Provider>;
};
