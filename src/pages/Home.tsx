import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export type QuestionType = {
    type: string;
    difficulty: string;
    id: string;
    category: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
};

export const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

export const Home = () => {
    return (
        <div
            className={
                'flex flex-col justify-center items-center gap-8 rounded shadow-md hover:shadow-lg p-20 transition-all'
            }
        >
            <motion.h1
                className={'font-semibold text-3xl cursor-default'}
                variants={variants}
                initial={'hidden'}
                animate={'visible'}
            >
                Quizzical
            </motion.h1>
            <motion.p
                className={'text-xl cursor-default'}
                variants={variants}
                initial={'hidden'}
                animate={'visible'}
                transition={{ delay: 0.4 }}
            >
                Описание
            </motion.p>

            <Link to={'/categories'}>
                <motion.div
                    className="rounded px-4 py-3 shadow border cursor-pointer transition-colors"
                    variants={variants}
                    initial={'hidden'}
                    animate={'visible'}
                    transition={{ delay: 0.7 }}
                >
                    Начать игру
                </motion.div>
            </Link>
        </div>
    );
};
