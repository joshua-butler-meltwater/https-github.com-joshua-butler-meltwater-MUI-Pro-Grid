"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import { Box } from "@mui/material"

// Use dynamic import with ssr:false to prevent hydration errors
const DynamicDataGrid = dynamic(() => import('@/data-grid'), { 
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-gray-100 flex items-center justify-center">Loading data grid...</div>
})

export default function Home() {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="w-full max-w-7xl">
          <DynamicDataGrid />
        </div>
      </main>
    </Box>
  )
}
