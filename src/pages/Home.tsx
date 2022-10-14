import React from 'react';
import { Link } from 'react-router-dom';

export type QuestionType = {
    type: string;
    difficulty: string;
    id: string;
    category: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
};

export const Home = () => {
    return (
        <div
            className={
                'flex flex-col justify-center items-center gap-8 rounded shadow-md hover:shadow-lg p-20 transition-all'
            }
        >
            <h1 className={'font-semibold text-3xl cursor-default'}>
                Quizzical
            </h1>
            <p className={'text-xl cursor-default'}>Описание</p>
            <Link to={'/categories'}>
                <div className="rounded px-4 py-4 shadow active:border-black cursor-pointer transition">
                    Начать игру
                </div>
            </Link>
        </div>
    );
};
