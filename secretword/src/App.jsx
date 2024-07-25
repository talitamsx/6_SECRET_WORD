// CSS

import "./App.css";

// React
import { useCallback, useEffect, useState } from "react";

// data
import { wordsList } from "./data/words";

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]); //lista de letras

  const [guessedLetters, setGuessedLetters] = useState([]); //letras adivinhadas
  const [wrongLetters, setWrongLetters] = useState([]); //letras erradas
  const [guesses, setGuesses] = useState(guessesQty); //tentativas do usuário
  const [score, setScore] = useState(0); //ponuação

  const pickWordAndCategory = () => {
    // Pick a random category
    const categories = Object.keys(words); //expressão que retorna um array contendo os nomes das propriedades do objeto words
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    {
      /* Math.random() * Object.keys(categories).length gera um número (float) aleatório entre 0 e o tamanho de categoria
        Math.floor arredonda para baixo o número aleatório gerado, resultando em um índice inteiro válido */
    }
    console.log(category);

    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    {
      /* words[category]` acessa o array de palavras da categoria selecionada e seleciona aleatoriamente uma palavra do array associado à categoria category no objeto words.
        A palavra selecionada é então armazenada na constante word */
    }

    console.log(word);
    return { word, category };
  };

  // start game, muda o estagio, muda da posição 0 para 1 ("Game")
  const startGame = () => {
    //pick word and pick category
    const { word, category } = pickWordAndCategory();

    //create an array of letters
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toUpperCase());

    console.log(word, category);
    console.log(wordLetters);

    // fill state
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  // process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toUpperCase();

    //verifica se letra já foi utilizada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
    // Adicona a letra adivinhada ou remove uma tentativa
    // Se a letra estiver correta, adiciona a letra atualizando a lista de letras corretas

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, // pega todos os elementos do array e adiciona mais um
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      //diminui qtde de alternativas
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
    //console.log(guessedLetters)
    //console.log(wrongLetters)
  };
  const clearLettersStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //monitora o número de tentativas e zera o jogo quando acaba as tentativas
  useEffect(() => {
    if (guesses <= 0) {
      //reset all states
      clearLettersStates()

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // restart the game
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)

    setGameStage(stages[0].name)
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          //Todos esses estados vão ser envoltos no jogo pq é ele que vai lidar (ñ gerenciar) com eles qdo forem alterados
          //Game.jsx receberá esses estados em forma de props
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
