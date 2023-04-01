import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionComponentProps, SingleAnswerProps } from '../types';
import {
    answersVariants,
    contaienrAnswersVariants,
    containerVariants,
} from '../variants';

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
        <motion.li
            key={answer.value}
            onClick={() => handleClick(answer.value)}
            className={`cursor-pointer rounded-xl py-1 px-4 text-center text-gray-700 outline outline-gray-300 transition-colors hover:outline-gray-800 ${
                answer.pressed && 'outline-gray-600'
            } `}
            style={checked}
            variants={answersVariants}
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
        <div className={'w-full border-b-2 pb-2 md:pb-4'}>
            <motion.h1
                className={'cursor-default text-base font-semibold md:text-xl'}
            >
                {singleQuestion.question}
            </motion.h1>
            <motion.ul
                className={
                    'grid grid-cols-2 items-stretch gap-2 pt-2 text-base leading-tight md:grid-cols-4 md:items-start md:gap-4'
                }
                variants={contaienrAnswersVariants}
                initial="hidden"
                animate="show"
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
            </motion.ul>
        </div>
    );
};
