import React from 'react';
import ReactDOM from 'react-dom/client';
import StatsIQ from './StatsIQ.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StatsIQ />
  </React.StrictMode>
);
