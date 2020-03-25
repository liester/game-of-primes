import React, { useEffect, useState, useRef } from "react";
import cx from "classnames";
import "./App.css";
import GameOver from "./GameOver";
import Header from "./Header";
import { DIFFICULTY, crappyFactorial, getNextNumber, isPrime } from "./utils";
import Footer from "./Footer";
import styled from "styled-components";
import ButtonGroup from "./ButtonGroup";
import { Button } from "@material-ui/core";

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Score = styled.div``;

function App() {
  const [currentNumber, setCurrentNumber] = useState(25);
  const [timeRemaining, setTimeRemaining] = useState(110);
  const [score, setScore] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);
  const interval = useRef();

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
      <Header setDifficulty={setDifficulty} difficulty={difficulty} />
      <MainContent>
        {hasEnded && <GameOver />}
        {hasEnded && timeRemaining !== 0 && crappyFactorial(currentNumber)}
        <Score>Score:{score}</Score>
        <div className={`time-remaining`}>{timeRemaining}</div>
        <div>{currentNumber}</div>
        {!hasEnded && (
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCheckNumber(true)}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleCheckNumber(false)}
            >
              No
            </Button>
          </ButtonGroup>
        )}
      </MainContent>
      <Footer hasEnded={hasEnded} resetGame={resetGame} />
    </div>
  );
}

export default App;
