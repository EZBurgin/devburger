import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'

import AppProvider from './hooks/index.jsx'
import { standardTheme } from './styles/themes/standard.js'

import GlobalStyles from './styles/globalStyles'
import stripePromise from './config/stripeConfig.js'
import { ThemeProvider } from 'styled-components'
import { Router } from './routes/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
      <AppProvider>
        <Elements stripe={stripePromise}>
          <BrowserRouter> 
            <Router/>
          </BrowserRouter>
          <GlobalStyles />
          <ToastContainer theme='dark' />
        </Elements>
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)
