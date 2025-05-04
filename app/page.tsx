"use client"

import React from 'react'
import SimpleDataGrid from "@/data-grid"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="w-full max-w-7xl">
        <SimpleDataGrid />
      </div>
    </main>
  )
}
