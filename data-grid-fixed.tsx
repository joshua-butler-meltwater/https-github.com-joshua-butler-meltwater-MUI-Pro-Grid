"use client";

import { useState } from "react";
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
import DataGridToolbar from "./components/data-grid/DataGridToolbar";
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

  // Handler functions
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      setSearchText("");
      filterData("", selectedContinents);
    }
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    filterData(value, selectedContinents);
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

  const filterData = (search: string, continentFilters: string[]) => {
    const filteredData = filterCountryData(countries, search, continentFilters);
    setFilteredRows(filteredData);
  };

  const handleOpenModal = (country: CountryData) => {
    setSelectedCountry(country);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSelectionModelChange = (newSelectionModel: any) => {
    setSelectionModel(newSelectionModel);
  };

  const handleClearSelection = () => {
    setSelectionModel([]);
  };

  const handleToggleColumnVisibility = () => {
    // Find the column visibility toggle in the data grid
    const columnHeadersElement = document.querySelector('.MuiDataGrid-columnHeaders');
    if (columnHeadersElement) {
      // Find a column header menu button (not on the selection column)
      const columnHeader = columnHeadersElement.querySelector('.MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeaderCheckbox)');
      if (columnHeader) {
        // Click the menu button to open the column menu
        const menuButton = columnHeader.querySelector('.MuiDataGrid-menuIcon button');
        if (menuButton) {
          (menuButton as HTMLElement).click();
          
          // Wait for the menu to appear, then click the column visibility option
          setTimeout(() => {
            const menuItems = document.querySelectorAll('.MuiMenuItem-root');
            menuItems.forEach(item => {
              if (item.textContent?.includes('Hide/Show')) {
                (item as HTMLElement).click();
              }
            });
          }, 100);
        }
      }
    }
  };

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    setSortConfig({ field, direction });
    // Update the sort model to show the arrow in the column header
    setSortModel([{ field, sort: direction }]);
    
    const sortedData = [...filteredRows].sort((a, b) => {
      let valueA = a[field as keyof CountryData];
      let valueB = b[field as keyof CountryData];
      
      // Handle numerical values for proper comparison
      if (field === 'population' || field === 'gdpTotal') {
        valueA = typeof valueA === 'string' ? parseFloat(valueA.replace(/[^\d.-]/g, '')) : Number(valueA);
        valueB = typeof valueB === 'string' ? parseFloat(valueB.replace(/[^\d.-]/g, '')) : Number(valueB);
      }
      
      // For string values
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      // For numeric values
      return direction === 'asc' 
        ? (valueA as number) - (valueB as number)
        : (valueB as number) - (valueA as number);
    });
    
    setFilteredRows(sortedData);
  };

  // Column definitions
  const columns = [
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
          
          <DataGridToolbar
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
              rows={filteredRows}
              columns={columns as any}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 25 },
                },
                columns: {
                  columnVisibilityModel: {
                    actions: true,
                  },
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
              components={{
                BaseRoot: (props: any) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      '--pinned-border': `2px solid ${colors.pinnedDivider}`,
                      '--pinned-shadow': '0px 0px 6px 0px rgba(0,0,0,0.15)',
                    }}
                  />
                )
              }}
              componentsProps={{
                basePopper: {
                  sx: {
                    zIndex: 1000,
                  }
                },
                columnsPanel: {
                  sx: {
                    '& .MuiDataGrid-panelFooter button': {
                      color: colors.teal.main,
                      '&:hover': {
                        backgroundColor: colors.teal.light,
                      }
                    }
                  }
                }
              }}
              sortModel={sortModel}
              onSortModelChange={(newSortModel) => {
                if (newSortModel.length > 0) {
                  const { field, sort } = newSortModel[0];
                  setSortModel(newSortModel as any);
                  handleSort(field, sort as 'asc' | 'desc');
                }
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
