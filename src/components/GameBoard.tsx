import { range } from "../words"
import GuessCell from "./GuessCell";

type GameBoardProps = {
    guesses: string[];
    word: string;
}
export default function GameBoard({ word, guesses }: GameBoardProps) {
    return (
        <div className="w-full py-6 ">
            {range(6).map((_, y) => (
                <div key={y} className="flex justify-center items-center">
                    {range(5).map((_, x) => (
                        <GuessCell key={x} x={x} word={word} guess={guesses[y] || ''} />
                    ))}
                </div>
            ))}
        </div>
    )
}