import React from 'react';
import Background from './components/Background';
import DigitalCard from './components/DigitalCard';
import AIChatTerminal from './components/AIChatTerminal';

function App() {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Background />
      <main className="relative z-10 py-12 px-4 sm:px-6">
        <DigitalCard />
      </main>
      <AIChatTerminal />
    </div>
  );
}

export default App;
