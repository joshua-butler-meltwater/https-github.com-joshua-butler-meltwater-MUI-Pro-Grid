import React, { useState, useEffect } from 'react';
import {
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Search, Info as InfoOutlined, FilterAlt, Sort } from "@mui/icons-material";
import { styles, colors } from '../../styles/data-grid-styles';

interface DataGridToolbarProps {
  title: string;
  tooltip?: string;
  showSearchBar: boolean;
  toggleSearchBar: () => void;
  filterAnchorEl: HTMLElement | null;
  handleFilterClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleFilterClose: () => void;
  selectedContinents: string[];
  continents: string[];
  handleContinentToggle: (continent: string) => void;
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
}

/**
 * Toolbar component for the DataGrid with title, info tooltip, search and filter buttons
 */
const DataGridToolbar = ({
  title,
  tooltip,
  showSearchBar,
  toggleSearchBar,
  filterAnchorEl,
  handleFilterClick,
  handleFilterClose,
  selectedContinents,
  continents,
  handleContinentToggle,
  onSortChange
}: DataGridToolbarProps) => {
  const open = Boolean(filterAnchorEl);
  const [sortField, setSortField] = useState('continent'); // Default to continent
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  
  // Initialize sorting on component mount
  useEffect(() => {
    onSortChange(sortField, sortDirection);
  }, []);

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortFieldChange = (field: string) => {
    setSortField(field);
    onSortChange(field, sortDirection);
    handleSortClose();
  };

  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    if (sortField) {
      onSortChange(sortField, newDirection);
    }
  };
  
  return (
    <Toolbar sx={styles.toolbar}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="subtitle1"
          component="div"
          sx={styles.headerTitle}
        >
          {title}
        </Typography>
        {tooltip && (
          <Tooltip title={tooltip}>
            <IconButton size="small" sx={{ ml: 0.5 }}>
              <InfoOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Right side icons */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton
          onClick={toggleSearchBar}
          sx={styles.actionIconButton(showSearchBar)}
        >
          <Search sx={{ fontSize: "20px" }} />
        </IconButton>
        
        <IconButton
          onClick={handleFilterClick}
          sx={{
            ...styles.actionIconButton(selectedContinents.length > 0),
            position: "relative",
          }}
        >
          <FilterAlt sx={{ fontSize: "20px" }} />
          {selectedContinents.length > 0 && (
            <Box sx={styles.filterBadge}>
              {selectedContinents.length}
            </Box>
          )}
        </IconButton>
        
        {/* Sort button and menu - now on the far right */}
        <Tooltip title="Sort data">
          <IconButton
            onClick={handleSortClick}
            sx={{
              width: "36px",
              height: "36px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
            size="small"
          >
            <Sort sx={{ fontSize: "20px" }} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={handleSortClose}
          PaperProps={{
            style: {
              maxHeight: 300,
              width: 200,
            },
          }}
        >
          <MenuItem 
            onClick={() => handleSortFieldChange('continent')}
            sx={{ fontWeight: sortField === 'continent' ? 'bold' : 'normal' }}
          >
            Continent
          </MenuItem>
          <MenuItem 
            onClick={() => handleSortFieldChange('country')}
            sx={{ fontWeight: sortField === 'country' ? 'bold' : 'normal' }}
          >
            Country
          </MenuItem>
          <MenuItem 
            onClick={() => handleSortFieldChange('population')}
            sx={{ fontWeight: sortField === 'population' ? 'bold' : 'normal' }}
          >
            Population
          </MenuItem>
          <MenuItem 
            onClick={() => handleSortFieldChange('gdpTotal')}
            sx={{ fontWeight: sortField === 'gdpTotal' ? 'bold' : 'normal' }}
          >
            GDP
          </MenuItem>
          <MenuItem divider />
          <MenuItem onClick={toggleSortDirection}>
            {sortDirection === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
          </MenuItem>
        </Menu>
        
        <Menu
          anchorEl={filterAnchorEl}
          open={open}
          onClose={handleFilterClose}
          PaperProps={{
            style: {
              maxHeight: 300,
              width: 200,
            },
          }}
        >
          {continents.map((continent) => (
            <MenuItem key={continent} dense>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedContinents.includes(continent)}
                    onChange={() => handleContinentToggle(continent)}
                    size="small"
                    sx={{
                      '&.Mui-checked': { color: colors.teal.main },
                      '&:hover': { backgroundColor: 'rgba(29, 159, 159, 0.04)' },
                    }}
                  />
                }
                label={continent}
                sx={{ width: "100%" }}
              />
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Toolbar>
  );
};

export default DataGridToolbar;