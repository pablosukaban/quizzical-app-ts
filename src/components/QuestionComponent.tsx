import React, { useEffect, useState } from 'react';

type AnswerType = { value: string; pressed: boolean; correct: boolean };

type QuestionComponentProps = {
    question: {
        question: string;
        answers: AnswerType[];
    };
    handleSelect: (value: string, index: number) => void;
    index: number;
    gameOver: boolean;
};

type SingleAnswerProps = {
    answer: AnswerType;
    handleClick: (value: string) => void;
    gameOver: boolean;
};

const SingleAnswer: React.FC<SingleAnswerProps> = ({
    answer,
    handleClick,
    gameOver,
}) => {
    let checked = {};
    if (gameOver) {
        if (answer.pressed) {
            if (answer.correct) {
                checked = {
                    backgroundColor: '#94D7A2',
                    color: 'black',
                    ['pointer-events']: 'none',
                };
            } else {
                checked = {
                    backgroundColor: '#F8BCBC',
                    color: 'black',
                    ['pointer-events']: 'none',
                };
            }
        } else {
            checked = {
                color: 'rgb(107,114,128)',
                outline: '2px solid rgb(209, 213, 219)',
                ['pointer-events']: 'none',
            };
        }
    }

    return (
        <li
            key={answer.value}
            onClick={() => handleClick(answer.value)}
            className={`text-center outline outline-gray-300 text-gray-700 hover:outline-gray-800 rounded-xl py-1 px-4 cursor-pointer transition ${
                answer.pressed &&
                'bg-gray-600 text-gray-200 outline-none border-none'
            } `}
            style={checked}
        >
            {answer.value}
        </li>
    );
};

export const QuestionComponent: React.FC<QuestionComponentProps> = ({
    question,
    handleSelect,
    index,
    gameOver,
}) => {
    const [singleQuestion, setSingleQuestion] = useState(question);

    const handleClick = (value: string) => {
        const temp = {
            ...singleQuestion,
            answers: singleQuestion.answers.map((answer) => ({
                ...answer,
                pressed: answer.value === value,
            })),
        };

        setSingleQuestion(temp);
        handleSelect(value, index);
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
                    <SingleAnswer
                        key={answer.value}
                        answer={answer}
                        handleClick={handleClick}
                        gameOver={gameOver}
                    />
                ))}
            </ul>
        </div>
    );
};
