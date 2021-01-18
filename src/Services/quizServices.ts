import { DIFFICULTY, Question, Quiz } from '../Type/types';
import shuffleArray from '../utils';

export const QuizDetails = async (questions: number, category: number, difficulty: DIFFICULTY): Promise<Question[]> => {

    const res = await fetch(`https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${difficulty}&type=multiple`);
    const { results } = await res.json();
    
    const quiz = results.map((questionObj: Quiz) => {
        return {
            question: questionObj.question,
            answer: questionObj.correct_answer,
            option: shuffleArray([...questionObj.incorrect_answers, questionObj.correct_answer])
        }
    })

    return quiz;
}

export const CategoryDetails = async () => {
    const res = await fetch(`https://opentdb.com/api_category.php`);
    const {trivia_categories} = await res.json();
    return trivia_categories;
}