"use client";

import { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { DataGridPro } from "@mui/x-data-grid-pro";
import "./mui-license";
import {
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

// Import styles and data
import { styles, colors } from "./styles/data-grid-styles";
import { countries, CountryData, getContinents, filterCountryData } from "./data/countries";

// Import components
import TruncatedCell from "./components/data-grid/TruncatedCell";
import ActionsCell from "./components/data-grid/ActionsCell";
import SelectionHeader from "./components/data-grid/SelectionHeader";
import DataGridToolbarEnhanced from "./components/data-grid/DataGridToolbarEnhanced";
import SearchBar from "./components/data-grid/SearchBar";
import SelectableList from "./components/data-grid/SelectableList";

// Create DataGrid component
const GridComponent = DataGridPro;

// Get unique continents
const continents = getContinents();

export default function SimpleDataGrid() {
  // State variables
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState<CountryData[]>(countries);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectionModel, setSelectionModel] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{field: string, direction: 'asc' | 'desc'} | null>(null);
  const [sortModel, setSortModel] = useState([{ field: 'continent', sort: 'asc' as 'asc' | 'desc' }]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<Record<string, boolean>>({});
  const [columnOrderModel, setColumnOrderModel] = useState<string[]>([]);

  // Define columns
  const baseColumns = [
    {
      field: 'selection',
      headerName: '',
      width: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      pinnable: true,
      columnPinningPosition: 'left',
      renderHeader: (params: any) => {
        const rowCount = filteredRows.length;
        const selectedRowCount = selectionModel.length;
        
        return (
          <Checkbox 
            indeterminate={selectedRowCount > 0 && selectedRowCount < rowCount}
            checked={rowCount > 0 && selectedRowCount === rowCount}
            onChange={(event) => {
              if (selectedRowCount === rowCount) {
                setSelectionModel([]);
              } else {
                const allRowIds = filteredRows.map(row => row.id);
                setSelectionModel(allRowIds);
              }
            }}
            sx={styles.checkbox}
            size="small"
          />
        );
      },
      renderCell: (params: any) => (
        <Box sx={styles.checkboxContainer}>
          <Checkbox 
            checked={selectionModel.includes(params.id)}
            onChange={(event) => {
              const newSelectionModel = [...selectionModel];
              if (event.target.checked) {
                newSelectionModel.push(params.id);
              } else {
                const index = newSelectionModel.indexOf(params.id);
                if (index > -1) {
                  newSelectionModel.splice(index, 1);
                }
              }
              setSelectionModel(newSelectionModel);
            }}
            sx={styles.smallCheckbox}
            size="small"
          />
        </Box>
      ),
    },
    { 
      field: "continent", 
      headerName: "Continent", 
      width: 150, 
      renderCell: TruncatedCell
    },
    { 
      field: "country", 
      headerName: "Country", 
      width: 180, 
      renderCell: TruncatedCell
    },
    { 
      field: "capital", 
      headerName: "Capital", 
      width: 150, 
      renderCell: TruncatedCell
    },
    { 
      field: "population", 
      headerName: "Population", 
      width: 150, 
      renderCell: TruncatedCell
    },
    { 
      field: "area", 
      headerName: "Area", 
      width: 150, 
      renderCell: TruncatedCell
    },
    { 
      field: "governmentType", 
      headerName: "Government Type", 
      width: 220, 
      renderCell: TruncatedCell
    },
    { 
      field: "headOfState", 
      headerName: "Head of State", 
      width: 200, 
      renderCell: TruncatedCell 
    },
    { 
      field: "headOfGovernment", 
      headerName: "Head of Government", 
      width: 200, 
      renderCell: TruncatedCell 
    },
    { 
      field: "independence", 
      headerName: "Independence/Formation", 
      width: 200, 
      renderCell: TruncatedCell 
    },
    { 
      field: "adminDivisions", 
      headerName: "Administrative Divisions", 
      width: 220, 
      renderCell: TruncatedCell 
    },
    { 
      field: "gdpTotal", 
      headerName: "GDP (Total)", 
      width: 150,
      renderCell: TruncatedCell
    },
    { 
      field: "gdpPerCapita", 
      headerName: "GDP per Capita", 
      width: 150,
      renderCell: TruncatedCell
    },
    { 
      field: "currency", 
      headerName: "Currency", 
      width: 150,
      renderCell: TruncatedCell
    },
    {
      field: "actions",
      headerName: "",
      width: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      pinnable: true,
      columnPinningPosition: 'right',
      renderCell: (params: any) => (
        <ActionsCell 
          params={params}
          onExpand={() => handleOpenModal(params.row)} 
          onEdit={() => console.log('Edit', params.row.id)}
          onDelete={() => console.log('Delete', params.row.id)}
        />
      ),
    },
  ];

  // Event handlers for column management
  const handleColumnVisibilityToggle = (field: string, isVisible: boolean) => {
    setColumnVisibilityModel(prev => ({
      ...prev,
      [field]: isVisible
    }));
  };

  const handleToggleColumnVisibility = () => {
    // This function is for opening the native MUI column visibility panel
    console.log('Open native column visibility panel');
  };

  const handleColumnOrderChange = (newOrder: string[]) => {
    console.log('handleColumnOrderChange in data-grid.tsx:', newOrder);
    
    // Update column order state
    setColumnOrderModel(newOrder);
    
    // Optionally, you could persist this to localStorage for a more permanent solution
    try {
      localStorage.setItem('dataGridColumnOrder', JSON.stringify(newOrder));
    } catch (e) {
      console.error('Failed to save column order to localStorage:', e);
    }
  };

  // Apply column order to the columns
  const columns = useMemo(() => {
    console.log('Applying column order, current columnOrderModel:', columnOrderModel);
    
    // If no column order, use default order
    if (!columnOrderModel.length) {
      return baseColumns;
    }

    // Create a Map of all columns by field for quick lookup
    const columnsMap = new Map(baseColumns.map(col => [col.field, col]));
    
    // Get fixed columns (selection and actions)
    const selectionColumn = baseColumns.find(col => col.field === 'selection');
    const actionsColumn = baseColumns.find(col => col.field === 'actions');
    
    // Start with selection column if it exists
    const orderedColumns: typeof baseColumns = [];
    if (selectionColumn) {
      orderedColumns.push(selectionColumn);
    }
    
    // Add the ordered data columns
    columnOrderModel.forEach(field => {
      const column = columnsMap.get(field);
      if (column && column.field !== 'selection' && column.field !== 'actions') {
        orderedColumns.push(column);
      }
    });
    
    // Add any columns that might not be in the order model
    baseColumns.forEach(column => {
      if (
        column.field !== 'selection' && 
        column.field !== 'actions' && 
        !columnOrderModel.includes(column.field)
      ) {
        orderedColumns.push(column);
      }
    });
    
    // End with actions column if it exists
    if (actionsColumn) {
      orderedColumns.push(actionsColumn);
    }
    
    console.log('Final ordered columns:', orderedColumns.map(col => col.field));
    return orderedColumns;
  }, [baseColumns, columnOrderModel]);

  // Initialize column order if empty
  useEffect(() => {
    // First try to load from localStorage
    try {
      const savedOrder = localStorage.getItem('dataGridColumnOrder');
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        if (Array.isArray(parsedOrder) && parsedOrder.length > 0) {
          console.log('Loaded column order from localStorage:', parsedOrder);
          
          // Validate that all column fields exist in the current columns
          const currentFields = baseColumns
            .filter(col => col.field !== 'selection' && col.field !== 'actions')
            .map(col => col.field);
          
          // Keep only the fields that exist in current columns
          const validOrder = parsedOrder.filter(field => currentFields.includes(field));
          
          // Add any fields that are not in the saved order
          currentFields.forEach(field => {
            if (!validOrder.includes(field)) {
              validOrder.push(field);
            }
          });
          
          console.log('Validated column order:', validOrder);
          setColumnOrderModel(validOrder);
          return;
        }
      }
    } catch (e) {
      console.error('Failed to load column order from localStorage:', e);
    }
    
    // If no saved order or error, use default
    if (columnOrderModel.length === 0) {
      // Extract fields from columns excluding selection and actions
      const defaultColumnOrder = baseColumns
        .filter(col => col.field !== 'selection' && col.field !== 'actions')
        .map(col => col.field);
      
      console.log('Setting default column order:', defaultColumnOrder);
      setColumnOrderModel(defaultColumnOrder);
    }
  }, [baseColumns]);

  // Other event handlers
  const filterData = (searchText: string, selectedContinents: string[]) => {
    setFilteredRows(filterCountryData(countries, searchText, selectedContinents));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    filterData(newSearchText, selectedContinents);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleContinentToggle = (continent: string) => {
    const currentIndex = selectedContinents.indexOf(continent);
    const newSelectedContinents = [...selectedContinents];

    if (currentIndex === -1) {
      newSelectedContinents.push(continent);
    } else {
      newSelectedContinents.splice(currentIndex, 1);
    }

    setSelectedContinents(newSelectedContinents);
    filterData(searchText, newSelectedContinents);
  };

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    setSortConfig({ field, direction });
    const sortedRows = [...filteredRows].sort((a, b) => {
      const aValue = a[field as keyof CountryData];
      const bValue = b[field as keyof CountryData];
      
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredRows(sortedRows);
  };

  const handleSelectionModelChange = (newSelectionModel: any) => {
    setSelectionModel(newSelectionModel);
  };

  const handleClearSelection = () => {
    setSelectionModel([]);
  };

  const handleOpenModal = (country: CountryData) => {
    setSelectedCountry(country);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Function to completely reset column order and visibility
  const resetAllColumns = () => {
    console.log('Resetting all columns to default state');
    
    // Reset column visibility
    setColumnVisibilityModel({});
    
    // Reset column order to default
    const defaultColumnOrder = baseColumns
      .filter(col => col.field !== 'selection' && col.field !== 'actions')
      .map(col => col.field);
    
    setColumnOrderModel(defaultColumnOrder);
    
    // Clear from localStorage
    try {
      localStorage.removeItem('dataGridColumnOrder');
    } catch (e) {
      console.error('Failed to remove column order from localStorage:', e);
    }
  };

  return (
    <Paper sx={styles.paperContainer}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={styles.sidebarContainer}>
          <SelectableList 
            items={['All', ...continents]} 
            header="Filter By Region"
            defaultSelected="All"
            onSelectionChange={(selected) => {
              if (selected === 'All') {
                setSelectedContinents([]);
                filterData(searchText, []);
              } else {
                setSelectedContinents([selected]);
                filterData(searchText, [selected]);
              }
            }}
          />
        </Box>
        
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          <SelectionHeader
            selectionCount={selectionModel.length}
            onClearSelection={handleClearSelection}
            onDownload={() => console.log('Download selected')}
            onEdit={() => console.log('Edit selected')}
            onDelete={() => console.log('Delete selected')}
            onSell={() => console.log('Assign label to selected')}
            onMerge={() => console.log('Combine searches')}
            onNotifications={() => console.log('Create alert for selected')}
          />
          
          <DataGridToolbarEnhanced
            title="World Geography"
            tooltip="This table displays geographic information about countries around the world, organized by continent."
            showSearchBar={showSearchBar}
            toggleSearchBar={toggleSearchBar}
            filterAnchorEl={filterAnchorEl}
            handleFilterClick={handleFilterClick}
            handleFilterClose={handleFilterClose}
            selectedContinents={selectedContinents}
            continents={continents}
            handleContinentToggle={handleContinentToggle}
            onSortChange={handleSort}
            onColumnVisibilityChange={handleToggleColumnVisibility}
            columns={columns}
            columnVisibility={columnVisibilityModel}
            onColumnVisibilityToggle={handleColumnVisibilityToggle}
            columnOrder={columnOrderModel}
            onColumnOrderChange={handleColumnOrderChange}
            onResetAll={resetAllColumns}
          />

          {showSearchBar && (
            <SearchBar
              searchText={searchText}
              searchFocused={searchFocused}
              handleSearchChange={handleSearchChange}
              setSearchFocused={setSearchFocused}
            />
          )}

          <Box sx={{
            ...styles.dataGridContainer, 
            overflow: 'auto',
            width: '100%'
          }}>
            <GridComponent
              key={`grid-${JSON.stringify(columnOrderModel)}-${JSON.stringify(columnVisibilityModel)}`} // Force re-render when column order or visibility changes
              rows={filteredRows}
              columns={columns as any} 
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 25 },
                },
                columns: {
                  columnVisibilityModel: columnVisibilityModel,
                },
                pinnedColumns: {
                  left: ['selection'],
                  right: ['actions']
                },
                sorting: {
                  sortModel: [{ field: 'continent', sort: 'asc' }],
                }
              }}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              pagination
              paginationMode="client"
              checkboxSelection={false}
              disableRowSelectionOnClick
              getRowHeight={() => 'auto'}
              getEstimatedRowHeight={() => 100}
              density="standard"
              onRowSelectionModelChange={handleSelectionModelChange}
              columnHeaderHeight={52}
              sx={{
                ...styles.dataGridRoot, 
                width: 'auto',
                minWidth: '100%',
                '& .MuiDataGrid-columnHeaders': styles.columnHeaders,
                '& .MuiDataGrid-virtualScroller': {
                  overflow: 'auto',
                },
                '& .MuiDataGrid-footerContainer': styles.footerContainer,
                '& .MuiDataGrid-columnsPanel': {
                  '& .MuiDataGrid-panelFooter button': {
                    color: colors.teal.main,
                    '&:hover': {
                      backgroundColor: colors.teal.light,
                    }
                  }
                }
              }}
              slots={{}}
              sortModel={sortModel}
              onSortModelChange={(newSortModel) => {
                if (newSortModel.length > 0) {
                  const { field, sort } = newSortModel[0];
                  setSortModel(newSortModel as any);
                  handleSort(field, sort as 'asc' | 'desc');
                }
              }}
              columnVisibilityModel={columnVisibilityModel}
              onColumnVisibilityModelChange={(newModel) => {
                setColumnVisibilityModel(newModel);
              }}
            />
          </Box>
        </Box>
      </Box>

      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        {selectedCountry && (
          <>
            <DialogTitle>
              {selectedCountry.country} ({selectedCountry.continent})
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <p><strong>Capital:</strong> {selectedCountry.capital}</p>
                <p><strong>Population:</strong> {selectedCountry.population}</p>
                <p><strong>Area:</strong> {selectedCountry.area}</p>
                <p><strong>Government:</strong> {selectedCountry.governmentType}</p>
                <p><strong>Independence:</strong> {selectedCountry.independence}</p>
                <p><strong>GDP:</strong> {selectedCountry.gdpTotal}</p>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseModal}
                sx={styles.dialogActionButton}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Paper>
  );
}
