import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
