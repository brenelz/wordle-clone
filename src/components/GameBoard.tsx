import { GuessResult } from "../Wordle";
import { getClassesForResults } from "../words"

type GameBoardProps = {
    guesses: string[][];
    guessResults: GuessResult[][]
}
export default function GameBoard({ guesses, guessResults }: GameBoardProps) {
    return (
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
    )
}