import React from 'react';
import { useState } from 'react';
import axios from "axios";
import './App.css'

function App() {
  var random_prompts = [
    "rolling on the floor",
    "dying of laughter",
    "backflip and then a frontflip"
  ]

  var random_prompt_index = Math.floor(Math.random() * random_prompts.length);

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
    axios.post("http://localhost:5000/api/send-animation-request", animationName == "" ? { "animationName": random_prompts[random_prompt_index] } : { animationName })
      .then((response) => {
        setAnimationCode(response.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="app">
      <h1 className='title-text'>Create your own animations <br /> <u>without any effort</u></h1>

      <div className='row'>
        <div className='column'>
          <div className='small-container'>
            <input className='animation-name-edit-text' type='text' placeholder={random_prompts[random_prompt_index]} onChange={editAnimationName} />
            <button className='animation-name-edit-button' onClick={sendAnimationRequest}>animate!</button>
          </div>
          <div className='big-container'>
            <textarea value={animationCode}></textarea>
          </div>
        </div>
        <div className='column'>
          <div className='big-container'>
            <div className='animation-container'>
              <div className="square" style={{ animationDuration: `${animationSpeed}s` }}></div>
            </div>
          </div>
          <div className='small-container'>
            <input type='text' placeholder='duration' onChange={editAnimationSpeed} />
          </div>
        </div>
      </div>

      <p className='github-repo-text'><a href='https://github.com/fulopmilan/css-animation-creator'>github</a></p>

      <style>
        {animationCode}
      </style>
    </div>
  );
}

export default App;
