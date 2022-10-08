import React, { useState } from 'react';

export type QuestionComponentProps = {
    question: {
        question: string;
        answers: { value: string; pressed: boolean }[];
    };
    handleSelect: (value: string, index: number) => void;
    index: number;
};

export const QuestionComponent: React.FC<QuestionComponentProps> = ({
    question,
    handleSelect,
    index,
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
                    <li
                        key={answer.value}
                        onClick={() => handleClick(answer.value)}
                        className={`text-center outline outline-gray-400 text-gray-700 hover:outline-gray-800 rounded-xl py-1 px-4 cursor-pointer transition ${
                            answer.pressed &&
                            'bg-gray-800 text-gray-200 outline-none border-none'
                        }`}
                    >
                        {answer.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};
