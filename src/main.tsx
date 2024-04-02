import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'


ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)


