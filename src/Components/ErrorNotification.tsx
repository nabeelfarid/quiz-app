type ErrorNotificationProps = {
  show: boolean;
  errorMsg: any;
};
export const ErrorNotification: React.FC<ErrorNotificationProps> = ({ show, errorMsg }) => {
  return (
    <>
      {show &&
        <div className="my-5 d-flex justify-content-center">
          <div className="p-4 d-grid border border-warning border-4 rounded bg-dark text-white shadow">
            <h4 className='text-danger text-center'>Error! 😟</h4>
            <p>An error occured retrieving Quiz from the server. Make sure you have a valid internet connection and try again.</p>
            <p>Error Message: {errorMsg}</p>
          </div>
        </div>
      }
    </>
  );
};
