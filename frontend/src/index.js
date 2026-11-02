import react from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>  
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)