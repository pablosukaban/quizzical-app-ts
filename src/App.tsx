import React, { useEffect, useState } from 'react';
import Button from './components/ButtonCustom';
import GameBoard from './components/GameBoard';

const URL = 'https://opentdb.com/api.php?amount=5&type=multiple';

export type QuestionType = {
    type: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

function App() {
    const [isStarted, setIsStarted] = useState(false);
    const [questionsList, setQuestionsList] = useState<QuestionType[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleStartClick = () => {
        setIsStarted(true);
    };


    useEffect(() => {
        let ignore = false;
        const fetchData = async () => {
            const response = await fetch(URL);
            const data = await response.json();
            if (!ignore) {
                setIsLoaded(true);
                setQuestionsList(data.results);
            }
        };

        fetchData();

        return () => {
            ignore = true;
        };
    }, []);

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
                        onClick={() => handleStartClick()}
                    />
                </div>
            ) : (
                <GameBoard isLoaded={isLoaded} questionList={questionsList} handleRestart={() => setIsStarted(false)}/>
            )}
        </div>
    );
}

export default App;
