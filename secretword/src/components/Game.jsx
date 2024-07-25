import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null)

  //função para alterar o evento de onchange
  const handleSubmit = (e) => {
    e.preventDefault()

    //Dispara a função veryLetter para enviar a letra que acabou de ser alterado no state
    verifyLetter(letter)
    setLetter("")

    //utilizamos a referência , focando no elemento, dará o efeito de deixar o cursor dentro do quadrado que deve ser digitado a prox letra, após o fim do submit
    letterInputRef.current.focus()

  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas(s). </p>
      <div className="wordContainer">
        {/* Lógica: usaremos o método map em letters, para mapear cada uma das letras, na letra e no seu indice 
            Pegaremos o indice para retornar um objeto, que irá verificar se a letra for adivinhada, ela será impressa */}
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef} //seta a minha referência, é como se tivesse selecionado esse elemento no DOM
          />
          <button>jogar!</button>
        </form>
      </div>
      <div className="wrongLetterContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => {
          <span key={i}>{letter}, i</span>;
        })}
      </div>
    </div>
  );
};

export default Game;
