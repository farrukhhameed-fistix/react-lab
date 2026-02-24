import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ManageTasks from './ManageTasks/ManageTasks';

function App() {
  const [count,SetCount] = useState(0);
  return (
    <>
    <ManageTasks/>
    <button onClick={()=>SetCount(count+1)}>ok</button>
    </>
  );
}

export default App;
