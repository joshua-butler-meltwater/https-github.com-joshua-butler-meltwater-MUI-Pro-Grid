import React from 'react';
import { Box, TextField, IconButton } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { styles, colors } from '../../styles/data-grid-styles';

interface SearchBarProps {
  searchText: string;
  searchFocused: boolean;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchFocused: (focused: boolean) => void;
}

/**
 * Search bar component for filtering grid data
 */
const SearchBar = ({
  searchText,
  searchFocused,
  handleSearchChange,
  setSearchFocused
}: SearchBarProps) => {
  // Handle clear button click
  const handleClearSearch = () => {
    // Create a synthetic event to pass to handleSearchChange
    const event = {
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleSearchChange(event);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderBottom: searchFocused ? `2px solid ${colors.teal.main}` : `1px solid ${colors.border}`,
        transition: "border-bottom 0.2s",
        height: "52px",
      }}
    >
      <Box sx={styles.searchContainer}>
        <Search
          fontSize="small"
          sx={{
            color: "action.active",
            mr: 1,
            opacity: 0.7,
          }}
        />
        <TextField
          variant="standard"
          placeholder="Find"
          fullWidth
          value={searchText}
          onChange={handleSearchChange}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          InputProps={{
            disableUnderline: true,
            style: { fontFamily: "Helvetica, Arial, sans-serif" },
            endAdornment: searchText ? (
              <IconButton 
                size="small" 
                onClick={handleClearSearch}
                sx={{ 
                  padding: '4px',
                  opacity: 0.7,
                  '&:hover': {
                    opacity: 1,
                    backgroundColor: 'transparent'
                  }
                }}
              >
                <Clear fontSize="small" />
              </IconButton>
            ) : null,
          }}
          sx={{
            height: "100%",
            "& .MuiInputBase-root": {
              height: "100%",
              fontFamily: "Helvetica, Arial, sans-serif",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SearchBar;