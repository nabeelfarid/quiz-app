import tsLogo from '../images/ts-logo.svg';
import reactLogo from '../images/react.svg';

export const Header = () => {
  return (
    <div className="p-md-3 p-2 mb-4 shadow bg-dark bg-gradient d-flex justify-content-between align-items-center text-white">

      <div className="">
        <h1>Quiz App</h1>
      </div>

      <div className='row gx-3 align-items-center'>
        <div className="col">
          <a title="React JS" className="" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} alt='React JS' height={25} width={25}></img>
          </a>
        </div>
        <div className="col">
          <a title="TypeScript" className="" href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
            <img src={tsLogo} alt='TypeScript' height={25} width={25}></img>
          </a>
        </div>
        <div className="col">
          <a title="Bootstrap" className="text-white" href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-bootstrap" style={{ fontSize: "1.5rem" }}></i>
          </a>
        </div>
        <div className="col">
          <a title="Quiz API" className="text-white" href="https://opentdb.com/" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-sliders" style={{ fontSize: "1.5rem" }}></i>
          </a>
        </div>
        <div className="col">
          <a title="Github Repo" className="text-white" href="https://github.com/nabeelfarid/quiz-app" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-github" style={{ fontSize: "1.5rem" }}></i>
          </a>
        </div>
      </div>
    </div>
  );

};
