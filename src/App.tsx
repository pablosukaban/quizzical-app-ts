import React, { useState } from 'react';
import Button from './components/ButtonCustom';
import GameBoard from './components/GameBoard';
import { useQuery } from '@tanstack/react-query';

const URL = 'https://the-trivia-api.com/api/questions?limit=5';

export type QuestionType = {
    type: string;
    difficulty: string;
    id: string;
    category: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
};

function App() {
    const [isStarted, setIsStarted] = useState(false);

    const {
        data: questionsList,
        isLoading,
        isError,
    } = useQuery(['questions_list'], () =>
        fetch(URL).then((res) => res.json())
    );

    return (
        <div className={'min-h-screen flex justify-center items-center py-6'}>
            {!isStarted ? (
                <div
                    className={
                        'flex flex-col justify-center items-center gap-8 rounded-xl border-2 border-gray-600 shadow-lg p-20'
                    }
                >
                    <h1 className={'font-semibold text-3xl'}>Quizzical</h1>
                    <p className={'text-xl'}>Описание</p>
                    <Button
                        text={'Начать игру'}
                        onClick={() => setIsStarted(true)}
                    />
                </div>
            ) : (
                <GameBoard
                    isLoading={isLoading}
                    isError={isError}
                    questionList={questionsList}
                    handleRestart={() => setIsStarted(false)}
                />
            )}
        </div>
    );
}

export default App;
