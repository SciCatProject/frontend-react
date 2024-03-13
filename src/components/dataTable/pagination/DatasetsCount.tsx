import React, { useEffect } from 'react';
import { usePagination } from './PaginationContext';

interface Dataset {
    all: {
        totalSets: number;
    }[];
}

interface Data extends Array<Dataset> { }

interface DatasetsCountProps {
    searchParams: any
}

const DatasetsCount: React.FC<DatasetsCountProps> = ({ searchParams }) => {
    const { setCount } = usePagination();

    useEffect(() => {
        let url = 'http://localhost:3000/api/v3/datasets/fullfacet?facets=["type","creationLocation","ownerGroup","keywords"]';


        if (searchParams) {
            url = `http://localhost:3000/api/v3/datasets/fullfacet?fields={"mode":{},${searchParams}}&facets=["type","creationLocation","ownerGroup","keywords"]`
        }

        // console.log(url)

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE3YWRhYzQwM2IzZGViZDE0NzNmNzYiLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkB5b3VyLnNpdGUiLCJhdXRoU3RyYXRlZ3kiOiJsb2NhbCIsIl9fdiI6MCwiaWQiOiI2NWE3YWRhYzQwM2IzZGViZDE0NzNmNzYiLCJpYXQiOjE3MDYyNjA2NjgsImV4cCI6MTcwNjI2NDI2OH0.RZwXIj2tIX2mH8DET9WfpR5ijU7IVvk44u7uF71yiFc'
            },
        })
            .then(response => response.json())
            .then((data: Data) => {
                if (data.length > 0 && data[0].all.length > 0) {
                    setCount(data[0].all[0].totalSets);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [searchParams]);

    return null;
};

export default DatasetsCount;
