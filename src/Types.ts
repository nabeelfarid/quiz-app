
export type QuestionEntity = {
    question : string;
    correct_answer : string;
    incorrect_answers : string []
}

export type Question = {
    text : string,
    no: number,
    correctAnswer : string,
    choices : string[],
    chosenAnswer? : string
}

export enum QuizState {
    FirstTime,
    Loading,            
    Started,
    Finished
}