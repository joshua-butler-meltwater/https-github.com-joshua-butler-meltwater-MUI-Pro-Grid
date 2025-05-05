import React from 'react';
import {
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { Search, Info as InfoOutlined, FilterAlt } from "@mui/icons-material";
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
  handleContinentToggle
}: DataGridToolbarProps) => {
  const open = Boolean(filterAnchorEl);
  
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
      <Box sx={{ display: "flex", gap: 1 }}>
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