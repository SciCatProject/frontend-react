import React, { useState, useEffect, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Paper } from '@mui/material';
import '../../../App.css';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useSearchParams } from '../../context/SearchParamsContext';

export interface Data {
  type: any[],
  ownerGroup: any[],
  creationLocation: any[],
  keywords: any[]
}

interface FilterStackProps {
  onFiltersChange: (selectedFilters: string[]) => void;
  data: Data[];
}

const FilterStack: React.FC<FilterStackProps> = ({ onFiltersChange, data }) => {
  const [autocompleteData, setAutocompleteData] = useState<Array<any>>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { filters, setFilters } = useSearchParams();
  const prevFiltersRef = useRef<string[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setAutocompleteData((prevData) => {
        const newData = [
          {
            id: 1,
            label: "Type",
            selectedOptions: prevData.find(item => item.label === "Type")?.selectedOptions || [],
            options: data[0].type.map((typeItem: any) => ({
              title: `${typeItem._id}`,
              count: typeItem.count
            }))
          },
          {
            id: 2,
            label: "Location",
            selectedOptions: prevData.find(item => item.label === "Location")?.selectedOptions || [],
            options: data[0].creationLocation.map((locationItem: any) => ({
              title: `${locationItem._id}`,
              count: locationItem.count
            }))
          },
          {
            id: 3,
            label: "Owner",
            selectedOptions: prevData.find(item => item.label === "Owner")?.selectedOptions || [],
            options: data[0].ownerGroup.map((ownerItem: any) => ({
              title: `${ownerItem._id}`,
              count: ownerItem.count
            }))
          },
          {
            id: 4,
            label: "Keywords",
            selectedOptions: prevData.find(item => item.label === "Keywords")?.selectedOptions || [],
            options: data[0].keywords.map((keywordItem: any) => ({
              title: `${keywordItem._id}`,
              count: keywordItem.count
            }))
          },
        ];
        return newData;
      });
    }
  }, [data]);

  useEffect(() => {
    const labelToNameMapping: { [key: string]: string } = {
      "Type": "type",
      "Location": "creationLocation",
      "Owner": "ownerGroup",
      "Keywords": "keywords"
    };

    const selectedFilters = autocompleteData.flatMap((item) =>
      item.selectedOptions.map((option: any) => {
        const titleParts = option.title.split(' ');
        const id = titleParts[0];
        const label = labelToNameMapping[item.label];
        return `"${label}":["${id}"]`;
      })
    );

    if (startDate && endDate) {
      selectedFilters.push(`"creationTime": {"begin": "${startDate.toISOString().split('T')[0]}", "end": "${endDate.toISOString().split('T')[0]}"}`)
    }

    onFiltersChange(selectedFilters);
    setFilters(selectedFilters);
  }, [autocompleteData, onFiltersChange, startDate, endDate]);

  useEffect(() => {
    if (prevFiltersRef.current.length !== 0 && filters.length === 0) {
      setAutocompleteData((data) => data.map((item) => ({ ...item, selectedOptions: [] })));
    }
    prevFiltersRef.current = filters;
  }, [filters]);

  const handleSelectChange =
    (index: number) =>
      (
        // @ts-ignore
        event: React.SyntheticEvent,
        newValue: any[]
      ) => {
        setAutocompleteData((data) =>
          data.map((item) => (item.id === index ? { ...item, selectedOptions: newValue } : item))
        );
      };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const isOptionEqualToValue = (option: any, value: any) => {
    return option.title === value.title;
  };

  return (
    <div>
      <IconButton onClick={toggleVisibility} style={{ position: 'relative', top: '10.2rem' }}>
        {isVisible ? <ArrowBackIosNewIcon /> : <MenuIcon />}
      </IconButton>

      {isVisible && (
        <div className={`filterStackContainer ${isVisible ? 'visible' : 'hidden'}`}>
          <Paper className='filterStack' variant='outlined' style={{ width: '300px' }}>
            <Typography variant='h6'>Filters</Typography>
            <Stack spacing={3} sx={{}}>
              {autocompleteData.map((item) => (
                <div key={item.id}>
                  <Autocomplete
                    multiple
                    id={`tags-standard-${item.id}`}
                    options={item.options}
                    getOptionLabel={(option) =>
                      item.selectedOptions.length === 0
                        ? `${option.title} (${option.count})`
                        : option.title
                    }
                    onChange={handleSelectChange(item.id)}
                    value={item.selectedOptions}
                    isOptionEqualToValue={isOptionEqualToValue}
                    renderInput={(params) => (
                      <TextField {...params} variant='standard' label={item.label} placeholder='' />
                    )}
                  />
                </div>
              ))}
              <TextField
                id='start-date'
                label='Start Date'
                type='date'
                value={startDate ? startDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id='end-date'
                label='End Date'
                type='date'
                value={endDate ? endDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default FilterStack;
