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
  List,
  ListItem,
  Paper,
} from "@mui/material";
import { Search, Info as InfoOutlined, FilterAlt, Sort, ViewColumn, DragIndicator } from "@mui/icons-material";
import { styles, colors } from '../../styles/data-grid-styles';
import DraggableColumnsList from './DraggableColumnsList';

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
  onColumnVisibilityChange: () => void;
  columns: any[];
  columnVisibility: Record<string, boolean>;
  onColumnVisibilityToggle: (field: string, isVisible: boolean) => void;
  columnOrder?: string[];
  onColumnOrderChange?: (newOrder: string[]) => void;
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
  onSortChange,
  onColumnVisibilityChange,
  columns,
  columnVisibility,
  onColumnVisibilityToggle,
  columnOrder = [],
  onColumnOrderChange
}: DataGridToolbarProps) => {
  const open = Boolean(filterAnchorEl);
  const [sortField, setSortField] = useState('continent'); // Default to continent
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [columnsAnchorEl, setColumnsAnchorEl] = useState<null | HTMLElement>(null);
  
  // Get draggable columns (exclude selection and actions columns)
  const draggableColumns = columns.filter(col => col.field !== 'selection' && col.field !== 'actions');
  
  // If no columnOrder provided, use default order from columns array
  const [internalColumnOrder, setInternalColumnOrder] = useState<string[]>([]);
  
  useEffect(() => {
    if (columnOrder && columnOrder.length > 0) {
      setInternalColumnOrder(columnOrder);
    } else {
      setInternalColumnOrder(draggableColumns.map(col => col.field));
    }
  }, [columnOrder, columns]);
  
  // Handle drag end event
  const handleDragEnd = (result: any) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    // Reorder the columns
    const reorderedColumns = [...internalColumnOrder];
    const [removed] = reorderedColumns.splice(sourceIndex, 1);
    reorderedColumns.splice(destinationIndex, 0, removed);
    
    setInternalColumnOrder(reorderedColumns);
    
    // Notify parent component of the change
    if (onColumnOrderChange) {
      onColumnOrderChange(reorderedColumns);
    }
  };
  
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

  const handleColumnsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setColumnsAnchorEl(event.currentTarget);
  };

  const handleColumnsClose = () => {
    setColumnsAnchorEl(null);
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
        
        {/* Column visibility button */}
        <Tooltip title="Manage columns">
          <IconButton
            onClick={handleColumnsClick}
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
            <ViewColumn sx={{ fontSize: "20px" }} />
            {Object.values(columnVisibility).includes(false) && (
              <Box sx={styles.filterBadge}>
                {Object.values(columnVisibility).filter(v => v === false).length}
              </Box>
            )}
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

        {/* Column visibility menu */}
        <Menu
          anchorEl={columnsAnchorEl}
          open={Boolean(columnsAnchorEl)}
          onClose={handleColumnsClose}
          PaperProps={{
            style: {
              maxHeight: 600,
              width: 300,
            },
          }}
        >
          <Box sx={{ px: 2, py: 1, fontWeight: 'bold', borderBottom: '1px solid #e0e0e0' }}>
            Show/Hide & Reorder Columns
          </Box>
          <Box sx={{ display: 'flex', borderBottom: '1px solid #e0e0e0' }}>
            <MenuItem onClick={() => {
              // Select all columns
              columns
                .filter(col => col.field !== 'selection' && col.field !== 'actions')
                .forEach(col => {
                  onColumnVisibilityToggle(col.field, true);
                });
            }} sx={{ flex: 1, justifyContent: 'center' }}>
              <Typography variant="body2" sx={{ fontSize: '13px', color: colors.teal.main }}>
                Show All
              </Typography>
            </MenuItem>
            <Box sx={{ width: '1px', bgcolor: '#e0e0e0' }} />
            <MenuItem onClick={() => {
              // Deselect all columns except the first one (to avoid empty grid)
              const visibleColumns = columns.filter(col => col.field !== 'selection' && col.field !== 'actions');
              // Keep the first column visible
              const firstColumn = visibleColumns[0];
              
              visibleColumns.forEach(col => {
                onColumnVisibilityToggle(col.field, col.field === firstColumn.field);
              });
            }} sx={{ flex: 1, justifyContent: 'center' }}>
              <Typography variant="body2" sx={{ fontSize: '13px', color: colors.teal.main }}>
                Hide All
              </Typography>
            </MenuItem>
          </Box>
          <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="columnList">
                {(provided) => (
                  <List
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    dense
                    sx={{ 
                      py: 0,
                      '& .Mui-checked': { color: colors.teal.main }
                    }}
                  >
                    {internalColumnOrder.map((field, index) => {
                      const column = columns.find(col => col.field === field);
                      if (!column) return null;
                      
                      return (
                        <Draggable key={field} draggableId={field} index={index}>
                          {(provided, snapshot) => (
                            <ListItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              sx={{
                                px: 1,
                                py: 0,
                                backgroundColor: snapshot.isDragging ? 'rgba(29, 159, 159, 0.08)' : 'inherit',
                                '&:hover': { backgroundColor: 'rgba(29, 159, 159, 0.04)' },
                                borderBottom: '1px solid #f5f5f5'
                              }}
                              component="div"
                            >
                              <Box
                                {...provided.dragHandleProps}
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  mr: 1,
                                  cursor: 'grab',
                                  color: 'text.secondary' 
                                }}
                              >
                                <DragIndicator fontSize="small" />
                              </Box>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={columnVisibility[field] !== false}
                                    onChange={() => {
                                      onColumnVisibilityToggle(
                                        field, 
                                        !(columnVisibility[field] !== false)
                                      );
                                    }}
                                    size="small"
                                    sx={{
                                      '&.Mui-checked': { color: colors.teal.main },
                                      '&:hover': { backgroundColor: 'rgba(29, 159, 159, 0.04)' },
                                    }}
                                  />
                                }
                                label={
                                  <Typography 
                                    variant="body2" 
                                    sx={{ 
                                      fontSize: '14px', 
                                      fontWeight: columnVisibility[field] !== false ? 500 : 400,
                                      opacity: columnVisibility[field] !== false ? 1 : 0.7
                                    }}
                                  >
                                    {column.headerName}
                                  </Typography>
                                }
                                sx={{ width: "100%", m: 0 }}
                              />
                            </ListItem>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
          <Box sx={{ borderTop: '1px solid #e0e0e0', pt: 1 }}>
            <MenuItem onClick={() => {
              // Reset all columns to visible
              columns
                .filter(col => col.field !== 'selection' && col.field !== 'actions')
                .forEach(col => {
                  onColumnVisibilityToggle(col.field, true);
                });
              
              // Reset column order
              const defaultOrder = columns
                .filter(col => col.field !== 'selection' && col.field !== 'actions')
                .map(col => col.field);
              
              setInternalColumnOrder(defaultOrder);
              if (onColumnOrderChange) {
                onColumnOrderChange(defaultOrder);
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center', color: colors.teal.main }}>
                Reset All
              </Box>
            </MenuItem>
            <MenuItem onClick={() => {
              onColumnVisibilityChange();
              handleColumnsClose();
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center', color: colors.teal.main }}>
                Advanced Settings
              </Box>
            </MenuItem>
          </Box>
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