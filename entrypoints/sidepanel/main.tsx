import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { initializeI18n } from './lib/i18n';
import './style.css';

const container = document.getElementById('app');

if (!container) {
  throw new Error('Sidepanel root element not found.');
}

void initializeI18n().then(() => {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
