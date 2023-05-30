import React from 'react'
import ReactDOM from 'react-dom/client'

//app
import App from './App'
//testing
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
)

reportWebVitals()
