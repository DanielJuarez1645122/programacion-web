import React, { useState } from 'react';
import HideSecret from './components/hide_secret';
import RevealSecret from './components/reveal_secret';

export default function App() {
  const [tab, setTab] = useState('ocultar');

  return (
    <div>
      <button onClick={() => setTab('ocultar')}>Ocultar</button>
      <button onClick={() => setTab('revelar')}>Revelar</button>
      <hr />
      {tab === 'ocultar' ? <HideSecret /> : <RevealSecret />}
    </div>
  );
}
