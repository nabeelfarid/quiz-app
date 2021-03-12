import { QuestionCard } from './QuestionCard';
import { VmQuestion } from '../Models/ViewModels';

type QuizProps = {
  show: boolean;
  score: number;
  questions: VmQuestion[];
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
          <div className="my-4 d-flex flex-column align-items-center">
            <div className="border border-warning border-4 rounded bg-dark text-white shadow">
              <div className=" mt-3 text-center">
                <h4>Score: {score}</h4>
              </div>
              <QuestionCard
                question={questions[currentQuestionNo]}
                onAnswer={onAnswerHandler}
                totalQuestions={totalQuestions} />
            </div>
            <button className='mt-4 btn btn-warning btn-lg border border-4 rounded-pill' disabled={!(!!questions[currentQuestionNo].chosenAnswer)}
              onClick={onNextQuestionHandler}>Next Question</button>
          </div>
        </>}
    </>
  );
};
