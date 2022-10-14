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
        <div className={''}>
            <div
                className={
                    'flex flex-col justify-center items-center gap-8 rounded-xl border-2 border-gray-600 shadow-lg p-20'
                }
            >
                <h1 className={'font-semibold text-3xl'}>Quizzical</h1>
                <p className={'text-xl'}>Описание</p>
                <Link to={'/categories'}>
                    <div className="border border-gray-400 rounded px-2 py-4 shadow-xl active:border-black cursor-pointer transition">
                        Начать игру
                    </div>
                </Link>
            </div>
        </div>
    );
};
