import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Chip, Paper } from '@mui/material';
import '../../../App.css'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { Data } from './FetchFullfacet';

interface FilterStackProps {
    onFiltersChange: (selectedFilters: string[]) => void;
    data: Data[];
}

const FilterStack: React.FC<FilterStackProps> = ({ onFiltersChange, data }) => {
    const [autocompleteData, setAutocompleteData] = useState<Array<any>>([]);
    const [isVisible, setIsVisible] = useState(true);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        if (data && data.length > 0) {
            setAutocompleteData(prevData => {
                const newData = [
                    {
                        id: 1,
                        label: "Type",
                        selectedOptions: [],
                        options: data[0].type.map((typeItem: any) => ({
                            title: `${typeItem._id} (${typeItem.count})`
                        }))
                    },
                    {
                        id: 2,
                        label: "Location",
                        selectedOptions: [],
                        options: data[0].creationLocation.map((locationItem: any) => ({
                            title: `${locationItem._id} (${locationItem.count})`
                        }))
                    },
                    {
                        id: 3,
                        label: "Owner",
                        selectedOptions: [],
                        options: data[0].ownerGroup.map((ownerItem: any) => ({
                            title: `${ownerItem._id} (${ownerItem.count})`
                        }))
                    },
                    {
                        id: 4,
                        label: "Keywords",
                        selectedOptions: [],
                        options: data[0].keywords.map((keywordItem: any) => ({
                            title: `${keywordItem._id} (${keywordItem.count})`
                        }))
                    },
                ];
                return newData;
            });
        }
    }, [data]);

    useEffect(() => {
        const selectedFilters = autocompleteData.flatMap((item) =>
            item.selectedOptions.map((option: any) => {
                const titleParts = option.title.split(' ');
                const id = titleParts[0];
                const labelToLowerCase: string = item.label;
                return `"${labelToLowerCase.toLowerCase()}":["${id}"]`;
            })
        );

        if (startDate && endDate) {
            // selectedFilters.push(`"start_date":"${startDate.toISOString()}"`);
            // selectedFilters.push(`"end_date":"${endDate.toISOString()}"`);
            selectedFilters.push(`"creationTime": {"begin": "${startDate.toISOString().split('T')[0]}", "end": "${endDate.toISOString().split('T')[0]}"}`)
        }

        // console.log(selectedFilters)

        onFiltersChange(selectedFilters);
    }, [autocompleteData, onFiltersChange, startDate, endDate]);

    if (!data || data.length === 0) {
        return <div></div>; // loading indicator
    }


    const handleSelectChange = (index: number) => (
        event: React.SyntheticEvent,
        newValue: any[]
    ) => {
        setAutocompleteData((data) =>
            data.map((item) =>
                item.id === index ? { ...item, selectedOptions: newValue } : item
            ),
        );
    };

    const handleDeleteChip = (index: number, chipToDelete: any) => () => {
        setAutocompleteData((data) =>
            data.map((item) =>
                item.id === index
                    ? { ...item, selectedOptions: item.selectedOptions.filter((chip: any) => chip !== chipToDelete) }
                    : item
            )
        );
    };

    const handleClearButton = () => {
        setAutocompleteData((data) =>
            data.map((item) => ({ ...item, selectedOptions: [] }))
        );
    }

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (

        <div>
            <IconButton onClick={toggleVisibility} style={{ position: 'relative', top: '10.2rem', }}>
                {isVisible ? <ArrowBackIosNewIcon /> : <MenuIcon />}
            </IconButton>

            {isVisible && (
                <div className={`filterStackContainer ${isVisible ? 'visible' : 'hidden'}`}>
                    <Paper className='filterStack' variant="outlined" style={{ width: '300px' }}>
                        <Typography variant="h6">Filters</Typography>
                        <Button variant="contained" className='buttonBackground' onClick={handleClearButton} style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                        }}>Clear</Button>
                        <Stack spacing={3} sx={{}}>
                            {autocompleteData.map((item) => (
                                <div key={item.id}>
                                    <Autocomplete
                                        multiple
                                        id={`tags-standard-${item.id}`}
                                        options={item.options}
                                        getOptionLabel={(option) => option.title}
                                        onChange={handleSelectChange(item.id)}
                                        value={item.selectedOptions}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                label={item.label}
                                                placeholder=""
                                            />
                                        )}

                                    />
                                </div>
                            ))}
                            <TextField
                                id="start-date"
                                label="Start Date"
                                type="date"
                                value={startDate ? startDate.toISOString().split('T')[0] : ''}
                                onChange={(e) => setStartDate(new Date(e.target.value))}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <TextField
                                id="end-date"
                                label="End Date"
                                type="date"
                                value={endDate ? endDate.toISOString().split('T')[0] : ''}
                                onChange={(e) => setEndDate(new Date(e.target.value))}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Stack>
                    </Paper>
                </div>)}


            <Stack direction="row"
                spacing={1}
                style={{
                    width: '500px',
                    position: 'absolute',
                    top: '90px',
                    left: '50%',
                    transform: 'translateX(-60%)',
                }}>
                {autocompleteData.flatMap((item) =>
                    item.selectedOptions.map((option: any) => {
                        const labelText = option.title.split(' ')[0];
                        return (
                            <Chip key={`${item.id}-${option.title}`} label={labelText} onDelete={handleDeleteChip(item.id, option)} />
                        );
                    })
                )}
                {startDate && (
                    <Chip key="start-date" label={`Start Date: ${startDate.toISOString().split('T')[0]}`} onDelete={() => setStartDate(null)} />
                )}
                {endDate && (
                    <Chip key="end-date" label={`End Date: ${endDate.toISOString().split('T')[0]}`} onDelete={() => setEndDate(null)} />
                )}
            </Stack>


        </div>
    )
}

export default FilterStack;