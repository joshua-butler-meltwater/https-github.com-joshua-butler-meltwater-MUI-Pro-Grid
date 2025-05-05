"use client"

import React from 'react'
import SimpleDataGrid from "@/data-grid"
import Box from "@mui/material/Box"

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
          <SimpleDataGrid />
        </div>
      </main>
    </Box>
  )
}
