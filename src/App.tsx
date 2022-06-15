import React from 'react';
import './styles/App.scss';

import { LandingPage }from './pages/LandingPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Transfer $bTEST</h1>
      </header>
        <LandingPage></LandingPage>
      <main>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
