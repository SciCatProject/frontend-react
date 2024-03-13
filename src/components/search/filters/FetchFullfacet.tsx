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

}

const FetchFullfacet: React.FC<FetchDataProps> = ({ children }) => {
    const [data, setData] = useState<Data[]>([]);


    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:3000/api/v3/datasets/fullfacet?facets=%5B%22type%22%2C%22creationLocation%22%2C%22ownerGroup%22%2C%22keywords%22%5D&fields=%7B%7D', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE3YWRhYzQwM2IzZGViZDE0NzNmNzYiLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkB5b3VyLnNpdGUiLCJhdXRoU3RyYXRlZ3kiOiJsb2NhbCIsIl9fdiI6MCwiaWQiOiI2NWE3YWRhYzQwM2IzZGViZDE0NzNmNzYiLCJpYXQiOjE3MDYyNjA2NjgsImV4cCI6MTcwNjI2NDI2OH0.RZwXIj2tIX2mH8DET9WfpR5ijU7IVvk44u7uF71yiFc'
                },
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    setData(data)
                })
                .catch(error => {
                    console.error('Error:', error);
                })
        }
        fetchData();
    }, []);

    return <>{children(data)}</>
};

export default FetchFullfacet;