import React, { useState, useRef, useEffect } from 'react';
import './Quiz.css';
import { data as initialData } from '../assets/data';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const optionArray = [option1, option2, option3, option4];

  useEffect(() => {
    const shuffledQuestions = shuffleArray([...initialData]);
    setQuestions(shuffledQuestions);
    setQuestion(shuffledQuestions[0]);
  }, []);

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setScore(prevScore => prevScore + 1);
      } else {
        e.target.classList.add('wrong');
      }
      setLock(true);
      optionArray[question.ans - 1].current.classList.add('correct');
    }
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setQuestion(questions[nextIndex]);
      setLock(false);
      optionArray.forEach(ref => {
        if (ref.current) {
          ref.current.classList.remove('correct', 'wrong');
        }
      });
    } else {
      setResult(true);
    }
  };

  const reset = () => {
    const shuffledQuestions = shuffleArray([...initialData]);
    setQuestions(shuffledQuestions);
    setIndex(0);
    setQuestion(shuffledQuestions[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    optionArray.forEach(ref => {
      if (ref.current) {
        ref.current.classList.remove('correct', 'wrong');
      }
    });
  };

  if (!question) return null; // Wait until the questions are set

  return (
    <div className='container'>
      <h1>Your Quiz <span role="img" aria-label="quiz">📝</span></h1>
      <hr />
      {!result ? (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
            <li ref={option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
            <li ref={option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
            <li ref={option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
          </ul>
          <button onClick={handleNext} disabled={!lock}>Next</button>
          <div className="index">{index + 1} of {questions.length} questions 🦉</div>
        </>
      ) : (
        <>
          <h2>You Scored 👽 {score} out of {questions.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Quiz;
