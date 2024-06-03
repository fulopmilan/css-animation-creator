import React from 'react';
import { useState } from 'react';
import axios from "axios";
import './App.css'

function App() {
  const [animationName, setAnimationName] = useState("")
  const [animationCode, setAnimationCode] = useState("")
  const [animationSpeed, setAnimationSpeed] = useState(2)

  function editAnimationName(e: React.ChangeEvent<HTMLInputElement>) {
    var newName = e.target.value
    setAnimationName(newName)
  }
  function editAnimationSpeed(e: React.ChangeEvent<HTMLInputElement>) {
    var newSpeed = e.target.value
    setAnimationSpeed(parseFloat(newSpeed))
  }
  function sendAnimationRequest() {
    console.log("xd")
    axios.post("http://localhost:5000/api/send-animation-request", { animationName })
      .then((response) => {
        setAnimationCode(response.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <h1>random animácccció xd</h1>
      <input type='text' placeholder='animáció ötlet' onChange={editAnimationName} />
      <button onClick={sendAnimationRequest}>küldés</button>
      <br />
      <textarea value={animationCode}></textarea>

      <input type='text' placeholder='animation speed' onChange={editAnimationSpeed} />

      <div id='animation-container'>
        <div className="square" style={{ animationDuration: `${animationSpeed}s` }}></div>
      </div>



      <style>
        {animationCode}
      </style>
    </div>
  );
}

export default App;
