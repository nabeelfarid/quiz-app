
import { Header } from './Components/Header';
import { QuizStart } from './Components/QuizStart';
import { QuizLoading } from './Components/QuizLoading';
import { Quiz } from './Components/Quiz';
import { QuizEnd } from './Components/QuizEnd';

import { useState } from 'react';
import QuestionnaireService from './Services/QuestionnaireService';
import { QuizState, Question } from './Types';

const App: React.FC = () => {

  const [quizState, setQuizState] = useState(QuizState.Awaiting);
  const [questions, setQuestions] = useState([] as Question[]);
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
  const [score, setScore] = useState(0);

  const TOTAL_QUESTIONS = 5;

  // No need to use UseEffect as we will prepare the quiz on button click event handler
  async function PrepareNewQuiz() {
    setQuizState(QuizState.Loading);
    let questions = await QuestionnaireService.GetQuestions(TOTAL_QUESTIONS);
    setQuestions(questions);
    setQuizState(QuizState.Running);
    setCurrentQuestionNo(0);
    setScore(0);

  }

  const onStartQuizHandler = () => {
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
      setQuizState(QuizState.Completed);
    }
  }


  return (
    <>
      <Header />

      <div className="container">

        <QuizStart disabled={quizState === QuizState.Loading} onStartQuizHandler={onStartQuizHandler} />
        
        <QuizLoading show={quizState === QuizState.Loading} />

        <Quiz
          show={quizState === QuizState.Running}
          score={score}
          questions={questions}
          currentQuestionNo={currentQuestionNo}
          totalQuestions={TOTAL_QUESTIONS}
          onAnswerHandler={onAnswerHandler}
          onNextQuestionHandler={onNextQuestionHandler}/>

        <QuizEnd
          show={quizState === QuizState.Completed}
          score={score}
          totalQuestions={TOTAL_QUESTIONS} />

      </div>
    </>
  );
}

export default App;
