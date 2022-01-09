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
    const re = /^[A-Za-z]{0,5}$/;
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

  const getClassesForResults = (result: GuessResult) => {
    if (result === "correct") {
      return "text-white bg-orange-700";
    }

    if (result === "incorrect") {
      return {};
    }

    if (result === "wrong-spot") {
      return "bg-yellow-200";
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
    <div className="container mx-auto max-w-md text-center text-orange-700">
      <h1 className="text-4xl font-bold py-6">Wordle Clone</h1>

      <div>
        {wordDoesntExist !== "" && (
          <p className="bg-orange-700 text-white p-2">
            "{wordDoesntExist}" does not exist. Try again.
          </p>
        )}
        {hasWon && (
          <>
            <p className="bg-orange-700 text-white p-2">
              You have won the game by guessing the word correctly 😀!{" "}
            </p>
            <p className="pt-4">
              <button
                className="px-6 py-2 font-semibold text-sm bg-orange-700 hover:bg-orange-800 text-white rounded-full shadow-sm"
                autoFocus
                onClick={playAgain}
              >
                Play again
              </button>
            </p>
          </>
        )}
        {hasLost && (
          <>
            <p className="bg-orange-700 text-white p-2">
              You did not guess the world "{word}" correctly 😞
            </p>
            <p className="pt-4">
              <button
                className="px-6 py-2 font-semibold text-sm bg-orange-700 hover:bg-orange-800 text-white rounded-full shadow-sm"
                autoFocus
                onClick={playAgain}
              >
                Play again
              </button>
            </p>
          </>
        )}
        {!hasWon && !hasLost && (
          <form onSubmit={handleGuess}>
            <p>
              <input
                className="mx-4 border-orange-700"
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
              <button className="px-6 py-2 mt-4 font-semibold text-sm bg-orange-700 hover:bg-orange-800 text-white rounded-full shadow-sm">
                Guess!
              </button>
            </p>
          </form>
        )}

        <div className="w-full py-6 ">
          {guesses.map((row, y) => (
            <div className="flex justify-center items-center" key={y}>
              {row.map((value, x) => (
                <div
                  key={x}
                  className={`${getClassesForResults(
                    guessResults[y][x]
                  )} flex justify-center font-bold text-3xl items-center w-16 h-16 border border-orange-700`}
                >
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="text-slate-500">
        inspired by{" "}
        <a
          className="underline text-orange-700"
          href="https://www.powerlanguage.co.uk/wordle/"
        >
          wordle
        </a>{" "}
        - built by{" "}
        <a className="underline text-orange-700" href="https://brenelz.com">
          brenelz
        </a>
      </p>
    </div>
  );
}
