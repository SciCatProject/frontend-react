import React, { ChangeEvent, FormEvent } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useSearchParams } from '../context/SearchParamsContext';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery, onSearch }) => {
  const { query, setQuery } = useSearchParams();

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div className='searchBar'>
        <TextField
          id='outlined-basic'
          label='Text Search'
          variant='outlined'
          size='small'
          style={{ width: 500, paddingRight: 10 }}
          value={query}
          onChange={handleSearchInputChange}
        />

        <Button type='submit' variant='contained' className='buttonBackground'>
          Apply
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
