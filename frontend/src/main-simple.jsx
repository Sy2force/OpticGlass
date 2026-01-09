import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Test minimal pour identifier le problème
const TestApp = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'green', fontSize: '48px' }}>✅ React fonctionne!</h1>
      <p style={{ fontSize: '24px' }}>Si vous voyez ce message, React est chargé correctement.</p>
    </div>
  )
}

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <TestApp />
    </StrictMode>
  )
} else {
  console.error('❌ Element #root non trouvé!')
}
