import React, { createContext, useContext, useState } from 'react';

interface PaginationContextType {
    count: number;
    page: number;
    rowsPerPage: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const usePagination = () => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error('usePagination must be used within a PaginationProvider');
    }
    return context;
};

export const PaginationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [count, setCount] = useState(0);

    const value = {
        count,
        page,
        rowsPerPage,
        setPage,
        setRowsPerPage,
        setCount,
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
};
