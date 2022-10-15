import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionComponentProps, SingleAnswerProps } from '../types';
import { answersVariants, questionVariants } from '../variants';

const SingleAnswer: React.FC<SingleAnswerProps> = ({
    answer,
    index,
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
        <motion.li
            variants={answersVariants}
            custom={index * 2}
            initial={'hidden'}
            animate={'visible'}
            key={answer.value}
            onClick={() => handleClick(answer.value)}
            className={`text-center outline outline-gray-300 text-gray-700 hover:outline-gray-800 rounded-xl py-1 px-4 cursor-pointer transition-all ${
                answer.pressed && 'outline-gray-600'
            } `}
            style={checked}
        >
            {answer.value}
        </motion.li>
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
            <motion.h1
                className={'font-semibold text-xl cursor-default'}
                variants={questionVariants}
                initial={'hidden'}
                animate={'visible'}
                custom={index * 2}
            >
                {singleQuestion.question}
            </motion.h1>
            <ul
                className={
                    'flex justify-start items-baseline gap-4 text-base leading-tight pt-2'
                }
            >
                {singleQuestion.answers.map((answer, index) => (
                    <SingleAnswer
                        key={answer.value}
                        index={index}
                        answer={answer}
                        handleClick={handleClick}
                        gameOver={gameOver}
                    />
                ))}
            </ul>
        </div>
    );
};
