import React, { useState } from 'react';

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
            checked = {
                outline: '3px solid #F8BCBC',
                ['pointerEvents']: 'none',
            };

            if (answer.correct) {
                checked = {
                    outline: '3px solid #94D7A2',
                    ['pointerEvents']: 'none',
                };
            }
        } else if (answer.correct) {
            checked = {
                outline: '3px solid #94D7A2',
                ['pointerEvents']: 'none',
            };
        } else {
            checked = {
                color: 'lightgray',
                ['pointerEvents']: 'none',
            };
        }
    }

    return (
        <li
            key={answer.value}
            onClick={() => handleClick(answer.value)}
            className={`text-center outline outline-gray-300 text-gray-700 hover:outline-gray-800 rounded-xl py-1 px-4 cursor-pointer transition-all ${
                answer.pressed && 'outline-gray-600'
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
