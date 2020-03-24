import React, { useEffect, useState, useRef } from "react";
import cx from "classnames";
import "./App.css";
import GameOver from "./GameOver";

const DIFFICULTY = {
  EASY: "Easy",
  HARD: "Hard",
  IMPOSSIBLE: "Impossible"
};

const isPrime = number => {
  const listOfPrimes = [
    2,
    3,
    5,
    7,
    11,
    13,
    17,
    19,
    23,
    29,
    31,
    37,
    41,
    43,
    47,
    53,
    59,
    61,
    67,
    71,
    73,
    79,
    83,
    89,
    97,
    101,
    103,
    107,
    109,
    113,
    127,
    131,
    137,
    139,
    149,
    151,
    157,
    163,
    167,
    173,
    179,
    181,
    191,
    193,
    197,
    199,
    211,
    223,
    227,
    229,
    233,
    239,
    241,
    251,
    257,
    263,
    269,
    271,
    277,
    281,
    283,
    293,
    307,
    311,
    313,
    317,
    331,
    337,
    347,
    349,
    353,
    359,
    367,
    373,
    379,
    383,
    389,
    397,
    401,
    409,
    419,
    421,
    431,
    433,
    439,
    443,
    449,
    457,
    461,
    463,
    467,
    479,
    487,
    491,
    499,
    503,
    509,
    521,
    523,
    541,
    547,
    557,
    563,
    569,
    571,
    577,
    587,
    593,
    599,
    601,
    607,
    613,
    617,
    619,
    631,
    641,
    643,
    647,
    653,
    659,
    661,
    673,
    677,
    683,
    691,
    701,
    709,
    719,
    727,
    733,
    739,
    743,
    751,
    757,
    761,
    769,
    773,
    787,
    797,
    809,
    811,
    821,
    823,
    827,
    829,
    839,
    853,
    857,
    859,
    863,
    877,
    881,
    883,
    887,
    907,
    911,
    919,
    929,
    937,
    941,
    947,
    953,
    967,
    971,
    977,
    983,
    991,
    997
  ];
  return listOfPrimes.includes(number);
};

function App() {
  const [currentNumber, setCurrentNumber] = useState(25);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [score, setScore] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);
  const interval = useRef();

  const crappyFactorial = number => {
    for (let i = 2; i < number / 2; i++) {
      if (number % i === 0) {
        return `${number / i} * ${i} = ${number}`;
      }
    }
    return "Thats a Prime!";
  };

  const getNextNumber = difficulty => {
    switch (difficulty) {
      case DIFFICULTY.EASY:
        return Math.floor(Math.random() * Math.floor(31));
      case DIFFICULTY.HARD:
        return Math.floor(Math.random() * Math.floor(101));
      case DIFFICULTY.IMPOSSIBLE:
        return Math.floor(Math.random() * Math.floor(1001));
      default:
        return Math.floor(Math.random() * Math.floor(31));
    }
  };

  const resetGame = () => {
    setHasEnded(false);
    setScore(0);
    setCurrentNumber(getNextNumber(difficulty));
    setTimeRemaining(15);
    interval.current = setInterval(() => {
      setTimeRemaining(t => t - 1);
    }, 1000);
  };

  const handleCheckNumber = submittedAnwser => {
    if (isPrime(currentNumber) === submittedAnwser) {
      setScore(score => score + 1);
      setCurrentNumber(getNextNumber(difficulty));
    } else {
      setHasEnded(true);
    }
  };

  useEffect(() => {
    interval.current = setInterval(() => {
      setTimeRemaining(t => t - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setHasEnded(true);
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (hasEnded) {
      clearInterval(interval.current);
    }
  }, [hasEnded]);
  return (
    <div className={cx("main")}>
      {hasEnded && <GameOver />}
      {hasEnded && timeRemaining !== 0 && crappyFactorial(currentNumber)}
      <div>Difficulty: {difficulty}</div>
      <div>Score:{score}</div>
      <div>Time Remaining: {timeRemaining}</div>
      <div>{currentNumber}</div>
      <div>
        <button onClick={() => handleCheckNumber(true)}>Yes</button>
        <button onClick={() => handleCheckNumber(false)}>No</button>
      </div>
      <div>
        <button onClick={resetGame}>Play Again</button>
      </div>
      <div>
        <select
          onChange={event => {
            setDifficulty(event.target.value);
          }}
        >
          {Object.values(DIFFICULTY).map(key => {
            return <option key={key}>{key}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

export default App;
