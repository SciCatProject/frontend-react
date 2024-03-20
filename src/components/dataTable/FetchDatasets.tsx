import React, { useState, useEffect, ReactNode } from "react";
import { usePagination } from "./pagination/PaginationContext";
import { BASE_URL } from "../../../config";

export interface Data {
    [key: string]: any;
}

interface FetchDataProps {
    children: (data: Data[]) => ReactNode;
}

const FetchData: React.FC<FetchDataProps> = ({ children }) => {
    const { rowsPerPage, page } = usePagination();
    const [data, setData] = useState<Data[]>([]);

    const limit = rowsPerPage;
    const skip = rowsPerPage * page;
    console.log(limit, skip)

    // console.log('limit: ', limit, 'skip: ', skip);

    const url = `${BASE_URL}datasets/fullquery?limits={"limit": ${limit}, "skip": ${skip}}&fields={}`

    useEffect(() => {
        // console.log('Fetching data with rowsPerPage:', rowsPerPage, 'and page:', page);
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE3YWRhYzQwM2IzZGViZDE0NzNmNzYiLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkB5b3VyLnNpdGUiLCJhdXRoU3RyYXRlZ3kiOiJsb2NhbCIsIl9fdiI6MCwiaWQiOiI2NWE3YWRhYzQwM2IzZGViZDE0NzNmNzYiLCJpYXQiOjE3MDYyNjA2NjgsImV4cCI6MTcwNjI2NDI2OH0.RZwXIj2tIX2mH8DET9WfpR5ijU7IVvk44u7uF71yiFc'
                    },
                })
                const data = await response.json();
                // console.log(data)
                setData(data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [rowsPerPage, page]);

    // console.log(data)

    return <>{children(data)}</>;
}

export default FetchData;
