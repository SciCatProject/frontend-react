import React, { useState, useContext, createContext, useEffect, useCallback } from "react";
import { usePagination } from "../dataTable/pagination/PaginationContext";
import { BASE_URL } from "../../../config";

interface FetchDataContextType {
  datasets: any[];
  searchDatasets: any[];
  facets: any[];
  urlSearchParams: string | null;
  urlSelectedFilters: any[];
  setUrlSearchParams: React.Dispatch<React.SetStateAction<string | null>>;
  setUrlSelectedFilters: React.Dispatch<React.SetStateAction<any[]>>;
  fetchDatasets: () => Promise<void>;
  fetchSearchDatasets: () => Promise<void>;
  fetchCount: () => Promise<void>;
  fetchFacets: () => Promise<void>;
}

const FetchDataContext = createContext<FetchDataContextType | undefined>(undefined);

export const useFetchData = () => {
  const context = useContext(FetchDataContext);
  if (!context) {
    throw new Error('useFetchData must be used within a FetchDataProvider');
  }
  return context;
};

const tokenObj = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE3YWRhYzQwM2IzZGViZDE0NzNmNzYiLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkB5b3VyLnNpdGUiLCJhdXRoU3RyYXRlZ3kiOiJsb2NhbCIsIl9fdiI6MCwiaWQiOiI2NWE3YWRhYzQwM2IzZGViZDE0NzNmNzYiLCJpYXQiOjE3MDYyNjA2NjgsImV4cCI6MTcwNjI2NDI2OH0.RZwXIj2tIX2mH8DET9WfpR5ijU7IVvk44u7uF71yiFc'
  }
};

const buildUrl = (endpoint: string, queryParams?: string) => {
  let url = `${BASE_URL}${endpoint}`
  if (queryParams) {
    url += `${queryParams}`
  }
  return url
}

export const FetchDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [datasets, setDatasets] = useState<any[]>([]);
  const [facets, setFacets] = useState<any[]>([]);
  const [searchDatasets, setSearchDatasets] = useState<any[]>([]);

  const [urlSearchParams, setUrlSearchParams] = useState<string | null>(null);
  const [urlSelectedFilters, setUrlSelectedFilters] = useState<any[]>([]);

  const { rowsPerPage, page, setCount } = usePagination();

  const limit = rowsPerPage;
  const skip = rowsPerPage * page;

  const fetchDatasets = useCallback(async () => {

    const url = buildUrl(`datasets/fullquery`, `?limits={"limit":${limit}, "skip":${skip}}&fields={}`)

    try {
      const response = await fetch(url, tokenObj);
      const data = await response.json();
      setDatasets(data);
      return data;
    } catch (error) {
      console.error('Error fetching datasets:', error);
    }
  }, [limit, skip])


  const fetchSearchDatasets = useCallback(async () => {

    const url = buildUrl(`Datasets/fullquery`, `?fields={"mode":{},${urlSearchParams}}&limits={"skip":${skip},"limit":${limit}}`);

    try {
      const response = await fetch(url, tokenObj);
      const data = await response.json();
      setSearchDatasets(data);
      return data;
    } catch (error) {
      console.error('Error fetching search datasets:', error);
    }
  }, [limit, skip, urlSearchParams])


  const fetchCount = useCallback(async () => {

    let url = buildUrl(`datasets/fullfacet`, `?facets=["type","creationLocation","ownerGroup","keywords"]`);
    if (urlSearchParams) {
      url = buildUrl(`datasets/fullfacet`, `?fields={"mode":{},${urlSearchParams}}&facets=["type","creationLocation","ownerGroup","keywords"]`);
    }

    try {
      const response = await fetch(url, tokenObj);
      const data = await response.json();
      setCount(data[0].all[0].totalSets);
      return data;
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  }, [urlSearchParams])


  const fetchFacets = useCallback(async () => {
    const fullfacetEndpoint = `datasets/fullfacet?facets=["type","creationLocation","ownerGroup","keywords"]`
    let updatedUrl = buildUrl(fullfacetEndpoint);
    if (urlSelectedFilters.length > 0) {
      updatedUrl = buildUrl(fullfacetEndpoint, `&fields={${urlSelectedFilters}}`);
    }

    try {
      const response = await fetch(updatedUrl, tokenObj);
      const data = await response.json();
      setFacets(data);
      return data;
    } catch (error) {
      console.error('Error fetching facets:', error);
      return null;
    }

  }, [urlSelectedFilters])


  useEffect(() => {
    fetchDatasets();
    fetchCount();
  }, [fetchDatasets, fetchCount]);

  useEffect(() => {
    if (urlSearchParams !== null) {
      fetchSearchDatasets();
    }
  }, [urlSearchParams, fetchSearchDatasets]);

  useEffect(() => {
    fetchFacets();
  }, [urlSelectedFilters, fetchFacets]);


  const value = {
    datasets,
    searchDatasets,
    facets,
    urlSearchParams: urlSearchParams || null,
    urlSelectedFilters,
    setUrlSearchParams,
    setUrlSelectedFilters,
    fetchDatasets,
    fetchSearchDatasets,
    fetchCount,
    fetchFacets
  };

  return <FetchDataContext.Provider value={value}>{children}</FetchDataContext.Provider>;
};