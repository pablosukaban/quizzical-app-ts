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
            className={`cursor-pointer rounded-xl py-1 px-4 text-center text-gray-700 outline outline-gray-300 transition-all hover:outline-gray-800 ${
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
        <div className={'w-full border-b-2 pb-4'}>
            <motion.h1
                className={'cursor-default text-xl font-semibold'}
                variants={questionVariants}
                initial={'hidden'}
                animate={'visible'}
                custom={index * 2}
            >
                {singleQuestion.question}
            </motion.h1>
            <ul
                className={
                    'flex items-baseline justify-start gap-4 pt-2 text-base leading-tight'
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
