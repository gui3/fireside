import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import "./style/themes.css"
import "./style/layout.css"
import "./style/fonts.css"
import "./style/look.css"
import "./style/chordpro.css"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
