import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import './index.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Router from './router'

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <Router />
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </StrictMode>,
)
