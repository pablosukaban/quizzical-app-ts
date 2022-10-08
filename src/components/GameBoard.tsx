import React, { useMemo, useState } from 'react';
import { QuestionType } from '../App';
import ButtonCustom from './ButtonCustom';
import { shuffle } from '../utils/shuffle';

type GameBoardProps = {
    isLoaded: boolean;
    questionList: QuestionType[];
};

type QuestionComponentProps = {
    question: {
        question: string;
        answers: { value: string; pressed: boolean }[];
    };
};

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question }) => {
    const [singleQuestion, setSingleQuestion] = useState(question);

    const handleClick = (value: string) => {
        // // setSingleQuestion((prevState) => {
        // //     return prevState.answers.map((item) => ({
        // //         ...item,
        // //         pressed: item.value === value,
        // //     }));
        // });

        const temp = {
            ...singleQuestion,
            answers: singleQuestion.answers.map((answer) => ({
                ...answer,
                pressed: answer.value === value,
            })),
        };

        setSingleQuestion(temp);
    };

    return (
        <div className={'border-b-2 pb-4 w-full'}>
            <h1 className={'font-semibold text-xl'}>
                {singleQuestion.question}
            </h1>
            <ul
                className={
                    'flex justify-start items-baseline gap-4 text-base leading-tight pt-2'
                }
            >
                {singleQuestion.answers.map((answer) => (
                    <li
                        key={answer.value}
                        onClick={() => handleClick(answer.value)}
                        className={`text-center border border-gray-400 text-gray-700 hover:border-gray-800 rounded-xl py-1 px-4 cursor-pointer transition ${
                            answer.pressed &&
                            'bg-gray-800 text-gray-200 border-none'
                        }`}
                    >
                        {answer.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const GameBoard: React.FC<GameBoardProps> = ({ isLoaded, questionList }) => {
    if (!isLoaded) return <h1>Loading...</h1>;
    // TODO объединить ответы, перемешать ответы, сделать из ответов объект {ответ, нажат}, слушатель событий
    const result = [];

    for (const singleQuestion of questionList) {
        const upgradedAnswers = [
            ...singleQuestion.incorrect_answers,
            singleQuestion.correct_answer,
        ].map((q) => ({
            value: q,
            pressed: false,
        }));
        const obj = {
            question: singleQuestion.question,
            answers: shuffle(upgradedAnswers),
        };
        result.push(obj);
    }

    return (
        <div
            className={
                'flex flex-col justify-center items-center px-20 py-10 border-2 border-gray-600 rounded-xl max-w-2xl shadow-xl gap-4'
            }
        >
            <div className={'flex flex-col justify-center items-start gap-6 '}>
                {result.map((question) => (
                    <QuestionComponent
                        key={question.question}
                        question={question}
                    />
                ))}
            </div>
            <ButtonCustom
                text={'Завершить'}
                onClick={() => console.log('finished')}
            />
        </div>
    );
};

export default GameBoard;
