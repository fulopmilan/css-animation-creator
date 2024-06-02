import React from 'react';
import { useState } from 'react';
import axios from "axios";

function App() {
  const [animationName, setAnimationName] = useState("")
  const [animationCode, setAnimationCode] = useState("")

  function editAnimationName(e: React.ChangeEvent<HTMLInputElement>) {
    var newName = e.target.value
    setAnimationName(newName)
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
    </div>
  );
}

export default App;
