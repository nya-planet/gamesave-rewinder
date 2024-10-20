import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '@/i18n/i18n';
import { invoke } from '@tauri-apps/api/core';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
