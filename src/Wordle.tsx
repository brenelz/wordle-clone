import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameLost from "./components/GameLost";
import GameWon from "./components/GameWon";
import GuessForm from './components/GuessForm';

export type GuessResult = "correct" | "incorrect" | "wrong-spot" | "";
export type GameState = 'playing' | 'won' | 'lost';

type WordleProps = {
    word: string;
    playAgain: () => void;
}

export default function Wordle({ word, playAgain }: WordleProps) {
    const [numGuessesSoFar, setNumGuessesSoFar] = useState(0);
    const [guesses, setGuesses] = useState<string[]>([]);

    let gameState: GameState = 'playing';
    if (guesses.includes(word)) {
        gameState = 'won';
    } else if (numGuessesSoFar === 6) {
        gameState = 'lost';
    }

    const handleGuess = (guess: string) => {
        setGuesses([
            ...guesses,
            guess.toUpperCase()
        ]);
        setNumGuessesSoFar(numGuessesSoFar + 1);
    }

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

            <GameBoard word={word} guesses={guesses} />
        </div>
    );
}