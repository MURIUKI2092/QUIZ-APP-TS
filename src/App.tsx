import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import QuestionCard from "./components/Questionard";
import { fetchQuizQuestions, QuestionState, Difficulty } from "./API";
export type AnswerObject = {
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
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // check users answer
      const answer = e.currentTarget.value;

      //check correct answer
      const correct = questions[number].correct_answer === answer;

      // add score if the answer is correct
      if (correct) setScore((user_score) => user_score + 1);
      //save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      // console.log(answerObject, "+++++++");
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // move on the last question if not the last
    const next_question = number + 1;
    if (next_question === total_questions) {
      setGameOver(true);
    } else {
      setNumber(next_question);
    }
  };
  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length == total_questions ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p>Score:{score} </p> : null}

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
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== total_questions - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next
        </button>
      ) : null}
    </div>
  );
};

export default App;
