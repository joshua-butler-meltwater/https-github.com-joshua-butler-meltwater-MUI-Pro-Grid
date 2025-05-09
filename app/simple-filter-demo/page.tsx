"use client"

import React, { useState, useEffect } from 'react';
import { DataGridPro, LicenseInfo } from '@mui/x-data-grid-pro';
import { Box, Paper, Typography, IconButton, Tooltip, Button, Alert } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import '../../mui-license';

/**
 * A minimal standalone demo for header filters
 * This page includes debugging information to help diagnose issues
 */
export default function SimpleFilterDemo() {
  const [headerFiltersEnabled, setHeaderFiltersEnabled] = useState(true);
  const [licenseStatus, setLicenseStatus] = useState<string>('Checking...');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check license status on component mount
  useEffect(() => {
    try {
      // Get license status
      const status = LicenseInfo.getRegisteredPackages().join(', ') || 'No packages registered';
      setLicenseStatus(status);
    } catch (error) {
      console.error('Error checking license:', error);
      setLicenseStatus('Error checking license');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
    }
  }, []);

  // Sample data
  const rows = [
    { id: 1, name: 'John', age: 25, city: 'New York' },
    { id: 2, name: 'Jane', age: 30, city: 'Los Angeles' },
    { id: 3, name: 'Bob', age: 40, city: 'Chicago' },
    { id: 4, name: 'Alice', age: 35, city: 'Boston' },
    { id: 5, name: 'Charlie', age: 28, city: 'Seattle' },
  ];
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 100, type: 'number' },
    { field: 'city', headerName: 'City', width: 150 },
  ];

  return (
    <Box sx={{ maxWidth: '1000px', mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2, color: 'primary.main' }}>
        Simple Filter Demo
      </Typography>
      
      {/* Debug information */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: '#f8f8f8' }}>
        <Typography variant="h6">Debug Information</Typography>
        <Typography variant="body2">License Status: {licenseStatus}</Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 1 }}>
            Error: {errorMessage}
          </Alert>
        )}
        <Typography variant="body2" sx={{ mt: 1 }}>
          Header Filters Enabled: {headerFiltersEnabled ? 'Yes' : 'No'}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            onClick={() => setHeaderFiltersEnabled(!headerFiltersEnabled)}
            sx={{ mr: 2 }}
          >
            {headerFiltersEnabled ? 'Disable Header Filters' : 'Enable Header Filters'}
          </Button>
        </Box>
      </Paper>
      
      <Paper sx={{ height: 400, width: '100%', mb: 2, overflow: 'hidden' }}>
        {/* Simple toolbar with more visible styling */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          p: 2, 
          borderBottom: '1px solid #e0e0e0',
          bgcolor: headerFiltersEnabled ? '#e3f2fd' : 'white'
        }}>
          <Typography variant="h6">
            {headerFiltersEnabled ? 'Header Filters Enabled' : 'Header Filters Disabled'}
          </Typography>
          <Tooltip title={headerFiltersEnabled ? "Hide filters" : "Show filters"}>
            <IconButton 
              onClick={() => setHeaderFiltersEnabled(!headerFiltersEnabled)} 
              color={headerFiltersEnabled ? "primary" : "default"}
              sx={{ border: headerFiltersEnabled ? '1px solid #2196f3' : 'none' }}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
        {/* DataGrid with more explicit configuration */}
        <DataGridPro
          rows={rows}
          columns={columns}
          headerFilters={headerFiltersEnabled}
          disableColumnFilter={false}
          disableMultipleColumnsFiltering={false}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          sx={{
            '& .MuiDataGrid-headerFilterRow': {
              bgcolor: '#e3f2fd',
              borderBottom: '2px solid #2196f3'
            }
          }}
        />
      </Paper>
    </Box>
  );
}