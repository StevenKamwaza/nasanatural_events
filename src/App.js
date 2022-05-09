import React from 'react'
import NasaData from './NasaData';
import Container from '@mui/material/Container';
import './App.css'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className ="container">
        <div maxWidth="sm" className="app_cont" >
            <NasaData />
        </div>
          
      </div>
    </div>
  );
}

export default App;
