import React, { useEffect, useState } from 'react';
import InputCard from './Components/InputCard/inputCard';
import QuestionCard from './Components/QuestionCard/questionCard';
import { QuizDetails } from './Services/quizServices';
import { DIFFICULTY, Question } from './Type/types';
import styles from './App.module.css';

function App() {

  let [quiz, setQuiz] = useState<Question[]>([]);
  let [totalQuestion, setTotalQuestion] = useState<number>(5);
  let [category, setCategory] = useState<number>(9);
  let [difficulty, setDifficulty] = useState<DIFFICULTY>(DIFFICULTY.EASY);
  let [submited, setSubmited] = useState<boolean>(false);
  let [score, setScore] = useState(0);
  let [step, setStep] = useState(0);
  let [showResult, setShowResult] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data: Question[] = await QuizDetails(totalQuestion, category, difficulty);
      setQuiz(data)
    }
    fetchData();
  }, [totalQuestion, category, difficulty]);

  const handelSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();

    const currentQuestion: Question = quiz[step];

    if (userAns === currentQuestion.answer) {
      setScore(++score);
    }

    if (step !== quiz.length - 1) {
      setStep(++step);
    }
    else {
      setShowResult(true);
    }
  };

  const handleInputSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setSubmited(true);
  }

  const startAgain = () => {
    window.location.reload();
  }

  if (!quiz.length) {
    return (
      <div className='loader'></div>
    )
  }

  if (showResult) {
    return (
      <div className={styles.container} >
        <h1 className={styles.heading}>Quiz App</h1>
        <div className={styles.card}>
          <h1 className={styles.result}>Result</h1> 
          <div className={styles.score}>
            <h2>Total :</h2>
            <h2>{quiz.length}</h2>
          </div>
          <div className={styles.score}>
            <h2>Your Score :</h2>
            <h2>{score}</h2>
          </div>
          <div className={styles.score}>
            <h2>Percentage :</h2>
            <h2>{(score / quiz.length) * 100}%</h2>
          </div>
          <button className={styles.btn} type='submit' onClick={startAgain}>Start Again</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {submited ?
        <QuestionCard
          question={quiz[step].question}
          answer={quiz[step].answer}
          option={quiz[step].option}
          totalQuestion={quiz.length}
          currentQuestion={step}
          callback={handelSubmit}
        />
        :
        <InputCard
          category={category}
          setCategory={setCategory}
          totalQuestion={totalQuestion}
          setTotalQuestion={setTotalQuestion}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          callback={handleInputSubmit}
        />}
    </div>
  );
}

export default App;
