type QuizLoadingProps = {
  show: boolean;
};

export const QuizLoading: React.FC<QuizLoadingProps> = ({ show }) => {
  return (
    <>
      {show &&
        <div className="my-5 d-flex justify-content-center">
          <div className="spinner-border text-danger" style={{ width: "5rem", height: "5rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    </>
  );
};
