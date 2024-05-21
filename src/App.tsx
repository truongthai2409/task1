// import { useState } from 'react'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Table from "./compoment/Table"

// import moduleName from './index.css '
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Table/>
    </QueryClientProvider>
  )
}

export default App
