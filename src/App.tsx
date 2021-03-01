import { useState } from 'react';
import './App.css';
import QuestionnaireService from './QuestionnaireService';
import { QuizState, Question } from './Types';

const App: React.FC = () => {

  const [quizState, setQuizState] = useState(QuizState.FirstTime);
  const [questions, setQuestions] = useState([] as Question[]);
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
  const [score, setScore] = useState(0);

  const TOTAL_QUESTIONS = 5;

  async function PrepareNewQuiz() {
    setQuizState(QuizState.Loading);
    let questions = await QuestionnaireService.GetQuestions(TOTAL_QUESTIONS);
    setQuestions(questions);
    setQuizState(QuizState.Started);
    setCurrentQuestionNo(0);
    setScore(0);

  }

  const startQuizHandler = () => {
    PrepareNewQuiz();
  }

  const onAnswerHandler = (chosenAnswer: string) => {
    setQuestions(prevQs => {
      const newQs = [...prevQs]
      newQs[currentQuestionNo].chosenAnswer = chosenAnswer;
      return newQs;
    })

    if (chosenAnswer === questions[currentQuestionNo].correctAnswer) {
      setScore(score + 1);
    }
  }

  const onNextQuestionHandler = () => {
    if (currentQuestionNo < questions.length - 1) {
      setCurrentQuestionNo(currentQuestionNo + 1);
    }
    else {
      setQuizState(QuizState.Finished);
    }
  }


  return (
    <div>
      <h3> Quiz App Using React and TypeScript </h3>
      { (quizState === QuizState.FirstTime ?
        <button onClick={startQuizHandler}>Start a New Quiz</button> : null
      )}
      { (quizState === QuizState.Loading ?
        <span>Loading ...</span> : null
      )}
      { quizState === QuizState.Started ?
        <>
          <h4>Score: {score}</h4>
          <QuestionCard
            question={questions[currentQuestionNo]}
            onAnswer={onAnswerHandler}
            totalQuestions={TOTAL_QUESTIONS}
          />
          <button disabled={!(!!questions[currentQuestionNo].chosenAnswer)}
            onClick={onNextQuestionHandler}>Next</button>
        </>
        : null
      }

      { quizState === QuizState.Finished ?
        <>
          <h4>Final Score: {score}/{TOTAL_QUESTIONS}</h4>
          <div>Well done for completing the quiz.</div>
          <button onClick={startQuizHandler}>Have Another Go? </button>
        </>
        : null
      }

    </div>
  );
}

type QuestionCardProps = {
  question: Question,
  onAnswer: (chosenAnswer: string) => void,
  totalQuestions: number
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, totalQuestions }) => {
  return (
    <div>
      <h5>Question: {question.no + 1} / {totalQuestions} </h5>
      <div dangerouslySetInnerHTML={{ __html: question.text }}></div>
      <span>chosen: {question.chosenAnswer}</span>
      {
        question.choices.map((obj, index) => (
          <div key={index}>
            <button value={obj} disabled={!!question.chosenAnswer} onClick={(e) => onAnswer(e.currentTarget.value)}>{obj}</button>

          </div>
        ))}

    </div>
  )
}

export default App;
