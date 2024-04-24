import React from 'react';
import ReactDOM from 'react-dom/client';
import { TeleApp } from './TeleApp.tsx';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TeleApp />
  </React.StrictMode>,
)
