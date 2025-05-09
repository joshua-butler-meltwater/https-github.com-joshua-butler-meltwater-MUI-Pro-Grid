"use client"

import React, { useState } from 'react'
import { Box, Paper, Typography, Divider } from '@mui/material'
import HeaderFilterExample from '../../components/data-grid/HeaderFilterExample'

/**
 * Preview page for the MinimalHeaderFilter component
 */
export default function HeaderFilterPreviewPage() {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        MinimalHeaderFilter Preview
      </Typography>
      <Typography variant="body1" paragraph>
        This page demonstrates the MinimalHeaderFilter component with clean, borderless inputs.
        Use the filter list button in the toolbar to toggle header filters.
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      {/* The example component with header filters */}
      <HeaderFilterExample />
    </Box>
  )
}