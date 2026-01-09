import { BrowserRouter as Router } from 'react-router-dom';

function AppMinimal() {
  return (
    <Router>
      <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
        <h1 style={{ color: '#c9a227', fontSize: '48px' }}>✅ Optic Glass</h1>
        <p style={{ fontSize: '24px' }}>Application chargée avec succès!</p>
        <p>Si vous voyez ce message, le problème vient des providers ou des composants.</p>
      </div>
    </Router>
  );
}

export default AppMinimal;
