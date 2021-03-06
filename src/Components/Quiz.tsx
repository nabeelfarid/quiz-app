import { QuestionCard } from './QuestionCard';
import { Question } from '../Types';

type QuizProps = {
  show: boolean;
  score: number;
  questions: Question[];
  currentQuestionNo: number;
  totalQuestions: number;
  onAnswerHandler: (chosenAnswer: string) => void;
  onNextQuestionHandler: () => void;
};

export const Quiz: React.FC<QuizProps> = ({
  show, score, questions, currentQuestionNo,
  totalQuestions, onAnswerHandler, onNextQuestionHandler }) => {

  return (
    <>
      {show &&
        <>
          <div className="my-4 d-flex justify-content-center">
            <div className="border border-info border-4 rounded bg-light">
              <div className=" mt-3 text-center">
                <h4>Score: {score}</h4>
              </div>
              <QuestionCard
                question={questions[currentQuestionNo]}
                onAnswer={onAnswerHandler}
                totalQuestions={totalQuestions} />
            </div>
          </div>

          <div className='mt-4 text-center'>
            <button className='btn btn-warning btn-lg' disabled={!(!!questions[currentQuestionNo].chosenAnswer)}
              onClick={onNextQuestionHandler}>Next Question</button>
          </div>
        </>}
    </>
  );
};
