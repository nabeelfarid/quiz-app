export const Header = () => {
  return (
    <div className="p-md-4 p-2 mb-4 shadow bg-primary bg-gradient d-flex justify-content-between align-items-center">

      <div className="text-white">
        <h1>Quiz App</h1>
      </div>

      <div className='row gx-2'>
        <div className="col">
          <a title="Quiz API" className="btn btn-primary" href="https://opentdb.com/" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-sliders" style={{ fontSize: "1.2rem" }}></i>
          </a>
        </div>
        <div className="col">
          <a title="Bootstrap" className="btn btn-primary" href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-bootstrap" style={{ fontSize: "1.2rem" }}></i>
          </a>
        </div>
        <div className="col">
          <a title="Github Repo" className="btn btn-primary" href="https://github.com/nabeelfarid/quiz-app" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-github" style={{ fontSize: "1.2rem" }}></i>
          </a>
        </div>
      </div>
    </div>
  );

};
