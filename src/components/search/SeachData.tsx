import React, { useEffect, useState } from 'react';
import { usePagination } from '../dataTable/pagination/PaginationContext';
import { Data } from './filters/FetchFullfacet';

interface SearchDataProps {
    children: (data: Data[]) => React.ReactNode;
    searchParams: string | null;
}

const SearchData: React.FC<SearchDataProps> = ({ children, searchParams }) => {
    const { rowsPerPage, page } = usePagination();
    const [data, setData] = useState<Data[]>([]);

    const limit = rowsPerPage;
    const skip = rowsPerPage * page;
    console.log(limit, skip)

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetch(`http://localhost:3000/api/v3/Datasets/fullquery?fields={"mode":{},${searchParams}}&limits={"skip":${skip},"limit":${limit}}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE3YWRhYzQwM2IzZGViZDE0NzNmNzYiLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkB5b3VyLnNpdGUiLCJhdXRoU3RyYXRlZ3kiOiJsb2NhbCIsIl9fdiI6MCwiaWQiOiI2NWE3YWRhYzQwM2IzZGViZDE0NzNmNzYiLCJpYXQiOjE3MDYyNjA2NjgsImV4cCI6MTcwNjI2NDI2OH0.RZwXIj2tIX2mH8DET9WfpR5ijU7IVvk44u7uF71yiFc'
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        setData(data)
                    })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchParams, rowsPerPage, page]);

    return <>{children(data)}</>;
};

export default SearchData;
