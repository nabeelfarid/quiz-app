import { useState } from 'react';
import './App.css';
import { QuestionCard } from './QuestionCard';
import QuestionnaireService from './QuestionnaireService';
import { QuizState, Question } from './Types';
import logo from "./logo.svg";

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

      {/* <div className="bg-primary">
        <div className="row align-items-center" >

          <div className="col-sm d-flex justify-content-center justify-content-sm-start">
            <div className="p-4 text-white">
              <h3>Quiz App </h3>
            </div>
          </div>

          <div className="col-sm d-flex  justify-content-center justify-content-sm-end">
            <a className="btn btn-primary" href="https://github.com/nabeelfarid/covid19-tracker" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-bootstrap" style={{ fontSize: "2rem" }}></i>
            </a>
            <a className="btn btn-primary" href="https://github.com/nabeelfarid/covid19-tracker" target="_blank" rel="noopener noreferrer">
              <i className="bi-github" style={{ fontSize: "2rem" }}></i>
            </a>

          </div>

        </div>
      </div> */}


      {/* <div className="container d-flex justify-content-center">
        <div className="border shadow ">
          <div> This is score</div>
          <div> This is question</div>
          <div> next</div>
          <div className="d-grid"> <button className="btn btn-primary">Next</button></div>
        </div>
        
      </div> */}


      <div className="container my-2">
        <div className="row">
          {(quizState !== QuizState.Running  ?
            <div className="col-12 my-2 d-flex justify-content-center">
              <button className="btn btn-info btn-lg" onClick={onStartQuizHandler} disabled={quizState === QuizState.Loading}>Start a New Quiz</button>
            </div>
            : null
          )}
          {(quizState === QuizState.Loading ?
            <div className="col-12 my-2 d-flex justify-content-center">
              <div className="spinner-border" style={{ width: "5rem", height: "5rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>

            : null
          )}

          {quizState === QuizState.Running ?
            <div className="col-12 my-2 d-flex justify-content-center">


              <div className="row">
                <div className="col-12 text-center">
                  <h4>Score: {score}</h4>
                  <div />
                </div>
                <div className="col-12 d-flex justify-content-center ">
                  <div>
                    <QuestionCard
                      question={questions[currentQuestionNo]}
                      onAnswer={onAnswerHandler}
                      totalQuestions={TOTAL_QUESTIONS}
                    />
                    <div className='mt-4 d-grid'>
                      <button className='btn btn-primary btn-lg' disabled={!(!!questions[currentQuestionNo].chosenAnswer)}
                        onClick={onNextQuestionHandler}>Next</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : null
          }

          {quizState === QuizState.Completed ?
            <div className="col-12 text-center">
              <h4>You Total Score was: {score}/{TOTAL_QUESTIONS}</h4>
              <h5>Well done for completing the quiz.</h5>
            </div>
            : null
          }

        </div>

      </div>
    </>
  );
}

export default App;
