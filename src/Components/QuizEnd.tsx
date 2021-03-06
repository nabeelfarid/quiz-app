type QuizEndProps = {
  show: boolean;
  score: number;
  totalQuestions: number;
};
export const QuizEnd: React.FC<QuizEndProps> = ({ show, score, totalQuestions }) => {
  return (
    <>
      {show &&
        <div className="my-5 d-flex justify-content-center">
          <div className="p-4 text-center d-grid gap-2 border border-info border-4 rounded bg-light shadow">
            <h4>Your Total Score was: {score}/{totalQuestions}</h4>
            <h5>Well done for completing the quiz 👍</h5>
          </div>
        </div>
      }
    </>
  );
};
