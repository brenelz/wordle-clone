import { ChangeEvent, SyntheticEvent, useState } from "react";

import AVAILABLE_WORDS from "./words";

const getRandomWord = () => {
  return AVAILABLE_WORDS[
    Math.floor(Math.random() * AVAILABLE_WORDS.length)
  ].toUpperCase();
};

type GuessResult = "correct" | "incorrect" | "wrong-spot" | "";

export default function Index() {
  const [word, setWord] = useState(getRandomWord());
  const [guess, setGuess] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [wordDoesntExist, setWordDoesntExist] = useState("");
  const [hasLost, setHasLost] = useState(false);
  const [numGuessesSoFar, setNumGuessesSoFar] = useState(0);
  const [guesses, setGuesses] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [guessResults, setGuessResults] = useState<GuessResult[][]>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const handleGuessInput = (e: ChangeEvent<HTMLInputElement>) => {
    const re = /^[A-Za-z]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setGuess(e.target.value);
    }
  };

  const handleGuess = (e: SyntheticEvent) => {
    e.preventDefault();

    /*
    if (!AVAILABLE_WORDS.includes(guess)) {
      setWordDoesntExist(guess);
      setGuess("");
      return;
    } else {
      setWordDoesntExist("");
    }
    */

    const newGuesses = [...guesses];
    const newGuessResults = [...guessResults];
    let totalCorrect = 0;
    let correctLetters = "";

    guess
      .toUpperCase()
      .split("")
      .forEach((guessLetter, i) => {
        newGuesses[numGuessesSoFar][i] = guessLetter;
        let result: GuessResult = "";
        if (guessLetter === word[i]) {
          result = "correct";
          totalCorrect++;
          correctLetters += guessLetter;
        } else if (
          !correctLetters.includes(guessLetter) &&
          word.includes(guessLetter)
        ) {
          result = "wrong-spot";
        } else {
          result = "incorrect";
        }
        newGuessResults[numGuessesSoFar][i] = result;
      });

    setGuesses(newGuesses);
    setGuessResults(newGuessResults);

    if (totalCorrect === 5) {
      setHasWon(true);
    } else {
      setHasWon(false);
    }

    if (numGuessesSoFar === 5) {
      setHasLost(true);
    } else {
      setHasLost(false);
    }

    setNumGuessesSoFar(numGuessesSoFar + 1);
    setGuess("");
  };

  const getStyles = (result: GuessResult) => {
    if (result === "correct") {
      return {
        color: "white",
        backgroundColor: "green",
      };
    }

    if (result === "incorrect") {
      return {};
    }

    if (result === "wrong-spot") {
      return {
        color: "black",
        backgroundColor: "yellow",
      };
    }

    return {};
  };

  const playAgain = () => {
    setGuess("");
    setGuesses([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setGuessResults([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setWord(getRandomWord());
    setHasWon(false);
    setHasLost(false);
    setNumGuessesSoFar(0);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold underline">Wordle Clone</h1>

      <div>
        {wordDoesntExist !== "" && (
          <p>"{wordDoesntExist}" does not exist. Try again.</p>
        )}
        {hasWon && (
          <p>
            You have won!{" "}
            <button autoFocus onClick={playAgain}>
              Play again
            </button>
          </p>
        )}
        {hasLost && (
          <p>
            You have lost :(. The word was {word} <br />
            <button autoFocus onClick={playAgain}>
              Play again
            </button>
          </p>
        )}
        {!hasWon && !hasLost && (
          <form onSubmit={handleGuess}>
            <p>
              <input
                autoFocus
                type="text"
                name="guess"
                value={guess}
                onChange={handleGuessInput}
                maxLength={5}
                minLength={5}
                required
                autoComplete="off"
              />
              &nbsp;
              <button>Guess!</button>
            </p>
          </form>
        )}

        <div>
          {guesses.map((row, y) => (
            <div style={{ display: "flex" }} key={y}>
              {row.map((value, x) => (
                <div
                  key={x}
                  style={{
                    width: "25px",
                    height: "25px",
                    padding: "10px",
                    border: "1px solid black",
                    ...getStyles(guessResults[y][x]),
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p>
        Inspired by <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>
      </p>
    </div>
  );
}
