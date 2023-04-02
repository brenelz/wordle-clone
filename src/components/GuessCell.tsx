import { calculateResult, getClassesForResults } from "../words";

type GuessCellProps = {
    x: number;
    guess: string;
    word: string;
}
export default function GuessCell({ word, guess, x }: GuessCellProps) {
    const letter = guess.slice(x, x + 1);
    const result = calculateResult(word, letter, x);

    return (
        <div
            className={`${getClassesForResults(result)} flex justify-center font-bold text-3xl items-center w-16 h-16 border border-orange-700`}
        >
            {letter}
        </div>
    )
}