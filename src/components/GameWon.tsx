type GameWonProps = {
    playAgain: () => void;
}
export default function GameWon({ playAgain }: GameWonProps) {
    return (
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
    )
}