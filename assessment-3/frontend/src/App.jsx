import React, { useState } from 'react';
import HideSecret from './components/hide_secret';
import RevealSecret from './components/reveal_secret';
import "./styles/app.css";

export default function App() {
  const [tab, setTab] = useState('ocultar');

  return (
    <div className="app-container">
      <div className="tab-container">
        <button
          className={`tab-button ${tab === 'ocultar' ? 'active' : ''}`}
          onClick={() => setTab('ocultar')}
        >
          Ocultar
        </button>
        <button
          className={`tab-button ${tab === 'revelar' ? 'active' : ''}`}
          onClick={() => setTab('revelar')}
        >
          Revelar
        </button>
      </div>

      <div className="content-box">
        {tab === 'ocultar' ? <HideSecret /> : <RevealSecret />}
      </div>
    </div>
  );
}

