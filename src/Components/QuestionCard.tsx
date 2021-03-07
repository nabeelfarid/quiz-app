import { VmQuestion } from '../Models/ViewModels';

type QuestionCardProps = {
  question: VmQuestion,
  onAnswer: (chosenAnswer: string) => void,
  totalQuestions: number
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, totalQuestions }) => {

  const getButtonColorClass = (buttonAnswer: string) => {
    
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

const getEmoji = () => {
  if (question.chosenAnswer){
    return question.chosenAnswer === question.correctAnswer? '✅ ': '❌'
  }
}

  return (
    <div className='p-4 '>

      <h5>Question: {question.no + 1} / {totalQuestions} {getEmoji()} </h5>

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


