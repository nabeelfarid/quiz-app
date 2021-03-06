
type QuizStartProps = {
  disabled: boolean;
  onStartQuizHandler: () => void;
};

export const QuizStart: React.FC<QuizStartProps> = ({ disabled, onStartQuizHandler }) => {
  return (
    <div className="my-2 d-flex justify-content-center ">
      <button className="btn btn-warning btn-lg border border-4 rounded-pill " onClick={onStartQuizHandler} disabled={disabled}>Start a New Quiz</button>
    </div>
  );
};
