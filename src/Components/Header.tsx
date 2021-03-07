import tsLogo from '../images/ts-logo.svg';
import reactLogo from '../images/react.svg';

export const Header = () => {
  return (
    <div className="p-md-4 p-2 mb-4 shadow bg-primary bg-gradient d-flex justify-content-between align-items-center">

      <div className="text-white">
        <h1>Quiz App</h1>
      </div>

      <div className='row gx-2'>
        <div className="col">
          <a title="React JS" className="btn btn-primary" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} alt='React JS' height={24} width={24}></img>
          </a>
        </div>
        <div className="col">
          <a title="TypeScript" className="btn btn-primary" href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
            <img src={tsLogo} alt='TypeScript' height={24} width={24}></img>
          </a>
        </div>
        <div className="col">
          <a title="Bootstrap" className="btn btn-primary" href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-bootstrap" style={{ fontSize: "1.2rem" }}></i>
          </a>
        </div>
        <div className="col">
          <a title="Quiz API" className="btn btn-primary" href="https://opentdb.com/" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-sliders" style={{ fontSize: "1.2rem" }}></i>
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
