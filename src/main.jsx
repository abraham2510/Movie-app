import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Components/App'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
