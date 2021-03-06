import { Question } from './Types';

type QuestionCardProps = {
  question: Question,
  onAnswer: (chosenAnswer: string) => void,
  totalQuestions: number
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, totalQuestions }) => {

  const getButtonColorClass = (buttonAnswer: string) => {
    
    console.log('[getButtonColorClass] #', question.no);
    console.log('chosen answer', question.chosenAnswer);
    console.log('corect answer', question.correctAnswer);
    console.log('button answer', buttonAnswer);
    
    if (question.chosenAnswer) {
      if (question.chosenAnswer === buttonAnswer) {
        if(question.chosenAnswer === question.correctAnswer) {
          return 'btn-success'
        }
        else {
          return 'btn-danger'
        }
      }
      else if (buttonAnswer === question.correctAnswer) {
        return 'btn-success'
      }
    }
    return 'btn-primary'
  }

  return (
    <div className='border shadow p-4 '>

      <h5>Question: {question.no + 1} / {totalQuestions} </h5>

      <div className="mb-2" dangerouslySetInnerHTML={{ __html: question.text }}></div>

      <div className="d-grid gap-2">
        {question.choices.map((obj) => (

          <button key={obj} className={`btn ${getButtonColorClass(obj)}`}
            value={obj}
            disabled={!!question.chosenAnswer}
            onClick={(e) => onAnswer(e.currentTarget.value)}
            dangerouslySetInnerHTML={{ __html: obj }} >
          </button>

        ))}
      </div>

    </div>
  );
};
