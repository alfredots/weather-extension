import React from 'react';
import ReactDOM from 'react-dom/client';
import { NewTab } from './NewTab';
import './index.scss';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <NewTab />
  </React.StrictMode>
);
