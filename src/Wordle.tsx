import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameLost from "./components/GameLost";
import GameWon from "./components/GameWon";
import GuessForm from './components/GuessForm';
import { getClassesForResults } from "./words";

export type GuessResult = "correct" | "incorrect" | "wrong-spot" | "";
export type GameState = 'playing' | 'won' | 'lost';

type WordleProps = {
    word: string;
    playAgain: () => void;
}

export default function Wordle({ word, playAgain }: WordleProps) {
    const [totalCorrect, setTotalCorrect] = useState(0);
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

    let gameState: GameState = 'playing';
    if (totalCorrect === 5) {
        gameState = 'won';
    } else if (numGuessesSoFar === 6) {
        gameState = 'lost';
    }

    const handleGuess = (guess: string) => {
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
                } else {
                    result = "incorrect";
                }
                newGuessResults[numGuessesSoFar][i] = result;
            });

        guess
            .toUpperCase()
            .split("")
            .forEach((guessLetter, i) => {
                newGuesses[numGuessesSoFar][i] = guessLetter;
                let result: GuessResult = "";
                if (
                    !correctLetters.includes(guessLetter) &&
                    word.includes(guessLetter)
                ) {
                    result = "wrong-spot";
                    newGuessResults[numGuessesSoFar][i] = result;
                }
            });

        setGuesses(newGuesses);
        setGuessResults(newGuessResults);
        setNumGuessesSoFar(numGuessesSoFar + 1);
        setTotalCorrect(totalCorrect);
    };

    return (
        <div>
            {gameState === 'won' && (
                <GameWon playAgain={playAgain} />
            )}
            {gameState === 'lost' && (
                <GameLost playAgain={playAgain} word={word} />
            )}
            {gameState === 'playing' && (
                <GuessForm handleGuess={handleGuess} />
            )}

            <GameBoard guesses={guesses} guessResults={guessResults} />
        </div>
    );
}