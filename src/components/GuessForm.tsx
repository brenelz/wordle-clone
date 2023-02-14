import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";

type GuessFormProps = {
    handleGuess: (guess: string) => void
}

const GuessForm = function GuessForm({ handleGuess }: GuessFormProps) {
    const guessElRef = useRef<HTMLInputElement>(null);
    const [guess, setGuess] = useState("");

    const handleGuessInput = (e: ChangeEvent<HTMLInputElement>) => {
        const re = /^[A-Za-z]{0,5}$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setGuess(e.target.value);
        }
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        handleGuess(guess);

        setGuess("");
        guessElRef.current?.focus();
    }

    return (<form onSubmit={handleSubmit}>
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
                ref={guessElRef}
            />
            <button className="px-6 py-2 mt-4 font-semibold text-sm bg-orange-700 hover:bg-orange-800 text-white rounded-full shadow-sm">
                Guess!
            </button>
        </p>
    </form>)
}

export default GuessForm;