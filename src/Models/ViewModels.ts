
export type VmQuestion = {
    text : string,
    no: number,
    correctAnswer : string,
    choices : string[],
    chosenAnswer? : string
}

export enum QuizState {
    Awaiting,
    Loading,            
    Running,
    Completed,
    Error
}