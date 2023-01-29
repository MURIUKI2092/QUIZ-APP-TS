import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import QuestionCard from "./components/Questionard";
import { fetchQuizQuestions, QuestionState, Difficulty } from "./API";
type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const total_questions = 10;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  // console.log(questions);
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    try {
      const newQuestions = await fetchQuizQuestions(
        total_questions,
        Difficulty.EASY
      );
      setQuestions(newQuestions);
      setScore(0);
      setNumber(0);
      setUserAnswers([]);
      setLoading(false);
    } catch (e) {
      console.log("An Error Occured", e);
    }
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};
  const nextQuestion = () => {};
  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length == total_questions ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p>Score: </p> : null}

      {loading && <p>Loading Questions....</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={total_questions}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswers={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      <button className="next" onClick={nextQuestion}>
        Next
      </button>
    </div>
  );
};

export default App;
