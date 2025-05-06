"use client"
import { useState } from "react"
import Box from "@mui/material/Box"
// Import both DataGrid and DataGridPro to support fallback if license is invalid
import { DataGrid } from "@mui/x-data-grid"
import { DataGridPro } from "@mui/x-data-grid-pro"
// Import the license file
import "./mui-license"
import {
  Paper,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"

// Import extracted styles
import { styles, colors } from "./styles/data-grid-styles"

// Import data and utils
import { countries, CountryData, getContinents, filterCountryData } from "./data/countries"

// Import extracted components
import TruncatedCell from "./components/data-grid/TruncatedCell"
import ActionsCell from "./components/data-grid/ActionsCell"
import SelectionHeader from "./components/data-grid/SelectionHeader"
import DataGridToolbar from "./components/data-grid/DataGridToolbar"
import SearchBar from "./components/data-grid/SearchBar"
import SelectableList from "./components/data-grid/SelectableList"

// Create a variable to determine which DataGrid component to use
// In production with a valid license, use DataGridPro
const GridComponent = DataGridPro

// Get unique continents for filter
const continents = getContinents();

export default function SimpleDataGrid() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState<CountryData[]>(countries);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectionModel, setSelectionModel] = useState<any[]>([]);

  // Define column groups inside the component to access selectedRows state
  const columns = [
    // Custom checkbox selection column
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
      renderHeader: (params) => {
        // Get row count directly from filteredRows instead of using apiRef
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
                // Get all row IDs directly from filteredRows
                const allRowIds = filteredRows.map(row => row.id);
                setSelectionModel(allRowIds);
              }
            }}
            sx={styles.checkbox}
            size="small"
          />
        );
      },
      renderCell: (params) => (
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
            sx={{
              '&.Mui-checked': { color: colors.teal.main },
              padding: 0,
            }}
            size="small"
          />
        </Box>
      ),
    },
    
    // Basic Information - Using custom cell renderer for all text columns
    { field: "continent", headerName: "Continent", width: 150, renderCell: TruncatedCell },
    { field: "country", headerName: "Country", width: 180, renderCell: TruncatedCell },
    { field: "capital", headerName: "Capital", width: 150, renderCell: TruncatedCell },
    { field: "population", headerName: "Population", width: 150, renderCell: TruncatedCell },
    { field: "area", headerName: "Area", width: 150, renderCell: TruncatedCell },

    // Political Information
    { field: "governmentType", headerName: "Government Type", width: 220, renderCell: TruncatedCell },
    { field: "headOfState", headerName: "Head of State", width: 200, renderCell: TruncatedCell },
    { field: "headOfGovernment", headerName: "Head of Government", width: 200, renderCell: TruncatedCell },
    { field: "independence", headerName: "Independence/Formation", width: 200, renderCell: TruncatedCell },
    { field: "adminDivisions", headerName: "Administrative Divisions", width: 220, renderCell: TruncatedCell },

    // Economic Information
    { field: "gdpTotal", headerName: "GDP (Total)", width: 150, renderCell: TruncatedCell },
    { field: "gdpPerCapita", headerName: "GDP per Capita", width: 150, renderCell: TruncatedCell },
    { field: "currency", headerName: "Currency", width: 150, renderCell: TruncatedCell },
    { field: "majorIndustries", headerName: "Major Industries", width: 250, renderCell: TruncatedCell },
    { field: "majorExportsImports", headerName: "Major Exports/Imports", width: 300, renderCell: TruncatedCell },
    { field: "unemploymentRate", headerName: "Unemployment Rate", width: 170, renderCell: TruncatedCell },
    { field: "giniCoefficient", headerName: "Gini Coefficient", width: 150, renderCell: TruncatedCell },

    // Social Information
    { field: "hdi", headerName: "Human Development Index", width: 200, renderCell: TruncatedCell },
    { field: "lifeExpectancy", headerName: "Life Expectancy", width: 150, renderCell: TruncatedCell },
    { field: "literacyRate", headerName: "Literacy Rate", width: 150, renderCell: TruncatedCell },
    { field: "majorReligions", headerName: "Major Religions", width: 300, renderCell: TruncatedCell },
    { field: "majorEthnicGroups", headerName: "Major Ethnic Groups", width: 300, renderCell: TruncatedCell },
    { field: "urbanRuralRatio", headerName: "Urban/Rural Ratio", width: 150, renderCell: TruncatedCell },
    
    // Actions column
    {
      field: "actions",
      headerName: "",
      width: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      pinnable: true,
      columnPinningPosition: 'right',
      renderCell: (params) => (
        <ActionsCell 
          params={params}
          onExpand={() => handleOpenModal(params.row)} 
          onEdit={() => console.log('Edit', params.row.id)}
          onDelete={() => console.log('Delete', params.row.id)}
        />
      ),
    },
  ];

  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    filterData(value, selectedContinents);
  };

  // Toggle search bar visibility
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      // Clear search
      setSearchText("");
      filterData("", selectedContinents);
    }
  };

  // Handle filter menu
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

  // Filter data based on search text and selected continents
  const filterData = (search: string, continentFilters: string[]) => {
    const filteredData = filterCountryData(countries, search, continentFilters);
    setFilteredRows(filteredData);
  };

  // Handle country modal
  const handleOpenModal = (country: CountryData) => {
    setSelectedCountry(country);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Handle row selection
  const handleSelectionModelChange = (newSelectionModel: any) => {
    setSelectionModel(newSelectionModel);
  };

  // Clear selection
  const handleClearSelection = () => {
    setSelectionModel([]);
  };

  return (
    <Paper sx={styles.paperContainer}>
      {/* Layout container for side filter and main content */}
      <Box sx={{ display: 'flex' }}>
        {/* Side Filter Panel */}
        <Box sx={{ 
          width: '200px',
          minWidth: '200px', 
          flexShrink: 0,
          borderRight: '1px solid #e0e0e0',
          backgroundColor: 'white',
          boxShadow: 'none'
        }}>
          <SelectableList 
            items={['All', ...continents]} 
            header="Filter By Region"
            defaultSelected="All"
            onSelectionChange={(selected) => {
              if (selected === 'All') {
                // Show all continents (no filter)
                setSelectedContinents([]);
                filterData(searchText, []);
              } else {
                // Filter by the selected continent only
                setSelectedContinents([selected]);
                filterData(searchText, [selected]);
              }
            }}
          />
        </Box>
        
        {/* Main content area with header, search bar, and data grid */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {/* Selection Header - Positioned within the main content area */}
          <SelectionHeader
            selectionCount={selectionModel.length}
            onClearSelection={handleClearSelection}
            onDownload={() => console.log('Download selected')}
            onEdit={() => console.log('Edit selected')}
            onDelete={() => console.log('Delete selected')}
          />
          
          {/* Main header - Extracted to component */}
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
          />

          {/* Search/Filter row - Extracted to component */}
          {showSearchBar && (
            <SearchBar
              searchText={searchText}
              searchFocused={searchFocused}
              handleSearchChange={handleSearchChange}
              setSearchFocused={setSearchFocused}
            />
          )}

          {/* Data Grid */}
          <Box sx={{
            ...styles.dataGridContainer, 
            overflow: 'auto',
            width: '100%'
          }}>
            <GridComponent
              rows={filteredRows}
              columns={columns}
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
              components={{
                BaseRoot: (props) => (
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
              }}
              sx={{
                ...styles.dataGridRoot, 
                width: 'auto', // Allow the grid to be wider than its container
                minWidth: '100%' // Ensure it fills the container at minimum
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Country Detail Modal */}
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
                sx={{ 
                  color: colors.teal.main,
                  '&:hover': {
                    backgroundColor: colors.teal.light,
                  }
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Paper>
  )
}
