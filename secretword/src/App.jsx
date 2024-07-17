// CSS

import './App.css'

// React
import { useCallback, useEffect, useState } from 'react'

// data
import  { wordsList } from "./data/words"

// components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

const stages = [
  {id: 1, name: "start"},
  {id: 2, name:"game"},
  {id: 3, name: "end"},
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name) 
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([]) //lista de letras

  const pickWordAndCategory = () => {
    // Pick a random category
    const categories = Object.keys(words) //expressão que retorna um array contendo os nomes das propriedades do objeto words
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    {/* Math.random() * Object.keys(categories).length gera um número (float) aleatório entre 0 e o tamanho de categoria
        Math.floor arredonda para baixo o número aleatório gerado, resultando em um índice inteiro válido */}
    console.log(category) 

    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    {/* words[category]` acessa o array de palavras da categoria selecionada e seleciona aleatoriamente uma palavra do array associado à categoria category no objeto words.
        A palavra selecionada é então armazenada na constante word */}

    console.log(word)
    return { word, category }
  }

  // start game, muda o estagio, muda da posição 0 para 1 ("Game")
  const startGame = () => {
    //pick word and pick category
    const { word, category } = pickWordAndCategory()

    //create an array of letters
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toUpperCase());

    console.log(word, category)
    console.log(wordLetters)

    // fill state
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(letters)


    setGameStage(stages[1].name)
  }

  // process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  // restart the game
  const retry = () => {
    setGameStage(stages[0].name)

  }

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
      {gameStage === "end" && <GameOver retry={retry} />}
    
   
    </div>
  )
}

export default App
