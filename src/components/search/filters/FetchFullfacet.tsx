import React, { useState, useEffect, ReactNode } from "react";

export interface Options {
    _id: string,
    count: number
}

export interface Data {
    type: any[],
    ownerGroup: any[],
    creationLocation: any[],
    keywords: any[]
}

interface FetchDataProps {
    children: (data: Data[]) => ReactNode;
    selectedFilters: string[];
}

const FetchFullfacet: React.FC<FetchDataProps> = React.memo(({ children, selectedFilters }) => {
    const [data, setData] = useState<Data[]>([]);
    const [url, setUrl] = useState<string>('http://localhost:3000/api/v3/datasets/fullfacet?facets=["type","creationLocation","ownerGroup","keywords"]&fields={}');

    useEffect(() => {
        let updatedUrl = 'http://localhost:3000/api/v3/datasets/fullfacet?facets=["type","creationLocation","ownerGroup","keywords"]&fields={}';

        if (selectedFilters.length > 0) {
            updatedUrl = `http://localhost:3000/api/v3/datasets/fullfacet?facets=["type","creationLocation","ownerGroup","keywords"]&fields={${selectedFilters}}`
        }

        console.log(url)
        setUrl(updatedUrl)
    }, [selectedFilters])

    useEffect(() => {
        const fetchData = () => {
            fetch(url, {
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
                .catch(error => {
                    console.error('Error:', error);
                })
        }
        fetchData();
    }, [url]);

    return <>{children(data)}</>
});

export default FetchFullfacet;