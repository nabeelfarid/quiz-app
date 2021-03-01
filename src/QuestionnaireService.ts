import axios from "axios";
import { Question, QuestionEntity } from "./Types";



const GetQuestions = async (noOfQuestions : number) : Promise<Question[]> =>  {
    let res = await axios.get(`https://opentdb.com/api.php?amount=${noOfQuestions}&type=multiple`);
    console.log('api', res.data.results);
    let questions = (res.data.results as QuestionEntity[]).map<Question>((question, index) => (
        {
         text: question.question,
         no : index,
         correctAnswer: question.correct_answer,
         choices: [...question.incorrect_answers,question.correct_answer].sort(()=>Math.random() - 0.5)
    }
    ));
    console.log("questions", questions)
    return questions;
}

const QuestionnaireService = {
    GetQuestions : GetQuestions
}

export default QuestionnaireService;