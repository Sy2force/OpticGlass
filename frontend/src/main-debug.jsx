console.log('🔍 DEBUG: main-debug.jsx chargé');

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

console.log('🔍 DEBUG: Imports React OK');

import './app/styles/index.css'

console.log('🔍 DEBUG: CSS importé');

import App from './app/App.jsx'

console.log('🔍 DEBUG: App importé');

const rootElement = document.getElementById('root');
console.log('🔍 DEBUG: Root element:', rootElement);

if (!rootElement) {
  console.error('❌ ERREUR: Element #root non trouvé!');
  document.body.innerHTML = '<h1 style="color:red;padding:50px;">ERREUR: Element #root non trouvé!</h1>';
} else {
  try {
    console.log('🔍 DEBUG: Tentative de rendu...');
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('✅ DEBUG: Rendu réussi!');
  } catch (error) {
    console.error('❌ ERREUR lors du rendu:', error);
    document.body.innerHTML = `<h1 style="color:red;padding:50px;">ERREUR: ${error.message}</h1><pre>${error.stack}</pre>`;
  }
}
