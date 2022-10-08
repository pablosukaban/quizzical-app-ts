import React, { useEffect, useState } from 'react';
import Button from './components/ButtonCustom';

const URL = 'https://opentdb.com/api.php?amount=5';

function App() {
    const [isStarted, setIsStarted] = useState(false);

    const handleStartClick = () => {
        setIsStarted(true);
    };

    return (
        <div
            className={
                'min-h-screen flex justify-center items-center bg-dimWhite'
            }
        >
            <div
                className={
                    'flex flex-col justify-center items-center gap-8 rounded-xl border-2 border-primary w-80 h-80 py-4 text-primaryDark'
                }
            >
                {!isStarted ? (
                    <>
                        <h1 className={'font-semibold text-3xl'}>Quizzical</h1>
                        <p className={'text-xl'}>Описание</p>
                        <Button
                            text={'Начать игру'}
                            onClick={() => handleStartClick()}
                        />
                    </>
                ) : (
                    <>
                        <h1>Start?</h1>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
