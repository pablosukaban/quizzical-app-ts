import React, { useEffect, useState } from 'react';
import Button from './components/ButtonCustom';
import GameBoard from './components/GameBoard';

const URL = 'https://the-trivia-api.com/api/questions?limit=5';
//
// {
//     "category": "Music",
//     "id": "622a1c397cc59eab6f950bf6",
//     "correctAnswer": "The Doors",
//     "incorrectAnswers": [
//     "Styx",
//     "The Pussycat Dolls",
//     "Three 6 Mafia"
// ],
//     "question": "Which American rock band released the album 'Morrison Hotel'?",
//     "tags": [
//     "music"
// ],
//     "type": "Multiple Choice",
//     "difficulty": "hard",
//     "regions": []
// },
//

export type QuestionType = {
    type: string;
    difficulty: string,
    id: string;
    category: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
};

function App() {
    const [isStarted, setIsStarted] = useState(false);
    const [questionsList, setQuestionsList] = useState<QuestionType[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let ignore = false;
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                const data = await response.json();
                if (!ignore) {
                    setIsLoaded(true);
                    setQuestionsList(data);
                }
            } catch (err) {
                console.log(err);
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
                        onClick={() => setIsStarted(true)}
                    />
                </div>
            ) : (
                <GameBoard
                    isLoaded={isLoaded}
                    questionList={questionsList}
                    handleRestart={() => setIsStarted(false)}
                />
            )}
        </div>
    );
}

export default App;
