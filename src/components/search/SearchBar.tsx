import React, { ChangeEvent, FormEvent } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

// @ts-ignore
const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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
          onChange={handleSearchInputChange}
        />

        <Button type='submit' variant='contained' className='buttonBackground'>
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
