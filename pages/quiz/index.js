import { useEffect, useState } from 'react'

import Question from '../../components/question'
import { decodedString } from '../../utils/string'

import styles from '../../styles/Quiz.module.css'

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1)

  const answerMapping = {
    True: '✅',
    False: '❌'
  }
  
  useEffect(() => {
    fetchQuestions()
  }, [])


  function fetchQuestions() {
    fetch('https://opentdb.com/api.php?amount=10&type=boolean')
      .then(response => response.json())
      .then(data => setQuestions(data.results));
  }

  function answerQuestion(answer) {
    const newAnswers = { ...answers }
    newAnswers[currentQuestionIndex] = answer
    setAnswers(newAnswers)

    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  function restartQuiz() {
    fetchQuestions()
    setCurrentQuestionIndex(-1)
  }

  function getScore() {
    return Object.entries(answers).filter(([questionIndex, answer]) => answer === answerMapping[questions[questionIndex].correct_answer]).length
  }

  function getLayout() {
    if (currentQuestionIndex === -1) {
      return (
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Quiz time!</h2>
          <p className={styles.description}>Please answer the following 10 questions and see how you score!</p>
          <button className={styles.action} onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Start</button>
        </div>
      )
    } else if (currentQuestionIndex === questions.length) {
      return (
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Quiz complete</h2>
          <p className={styles.description}>{getScore()} out of 10 questions were correctly answered.</p>
          <div className={styles.questions}>
          {
            Object.entries(answers).map(([questionIndex, answer]) => {
              return (
                <div key={questionIndex}>
                  <p className={styles.question}>
                    <b>
                      {
                        `${answer === answerMapping[questions[questionIndex].correct_answer] ? '✅' : '❌'} ` +
                        `Question ${parseInt(questionIndex) + 1}`
                      }
                    </b>
                    {
                      `: ${decodedString(questions[questionIndex].question)}`
                    }
                    <br />
                    {
                      `Your answer: ${answer} ` +
                      `Correct answer: ${answerMapping[questions[questionIndex].correct_answer]}`
                    }
                  </p>
                </div>
              )
            })
          }
          </div>

          <button className={styles.action} onClick={restartQuiz}>Restart</button>
        </div>
      )
    } else {
      return <Question
        number={currentQuestionIndex + 1}
        question={questions[currentQuestionIndex].question}
        answerQuestion={answerQuestion}
      />
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.quiz}>
        {getLayout()}
      </div>
    </div>
  )
}
