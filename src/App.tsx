import { useState } from "react";
import { getRandomWord } from "./words";
import Wordle from "./Wordle";

export default function Index() {
  const [word, setWord] = useState(getRandomWord());

  const playAgain = () => {
    setWord(getRandomWord());
  };

  return (
    <div className="container mx-auto max-w-md text-center text-orange-700">
      <h1 className="text-4xl font-bold py-6">Wordle Clone</h1>

      <Wordle key={word} word={word} playAgain={playAgain} />

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
