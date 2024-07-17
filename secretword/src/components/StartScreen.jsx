import React from 'react'
import './StartScreen.css'

const StartScreen = ({ startGame }) => {
  return (
    <div className='start'>
        <h1>Secret Word</h1>
        <p>Cliqe no botão para começar a jogar</p>
        <button onClick={startGame}>Jogar</button>
    </div>
  )
}

export default StartScreen