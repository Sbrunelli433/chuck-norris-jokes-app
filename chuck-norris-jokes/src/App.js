import React, { useState, useEffect } from 'react';
import { decode } from 'he';
import logo from './assets/chuck-norris.png';
import './App.css';

function App() {

  //this can read a joke and change its value
  const [joke, setJoke] = useState('');

  //function to fetch jokes 
  const fetchJoke = async signal => {
    const url = new URL('https://api.icndb.com/jokes/random');
    const response = await fetch(url, { signal });
    const { value } = await response.json();

    setJoke(decode(value.joke));
  };

  //need an "effect" hook to fetch the joke whenever there isn't one
  useEffect(() => {
    //if statement if there is no joke
    if(!joke) {
      //if the effect has a return value it will run when cleaning up the app or before rendering
      //this function cancels the fetch call if a joke is present in the array
      const controller = new AbortController();
      fetchJoke(controller.signal);

      return () => controller.abort();
    }
  }, [joke]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{joke || '...'}</p>
        <button className="App-link" onClick={() => setJoke('')}>
          Get a new joke
        </button>
      </header>
    </div>
  );
}

export default App;
