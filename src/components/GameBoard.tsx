import React, { useMemo, useRef, useState } from 'react';
import { QuestionType } from '../App';
import ButtonCustom from './ButtonCustom';
import { shuffle } from '../utils/shuffle';
import { QuestionComponent } from './QuestionComponent';

export type GameBoardProps = {
    isLoaded: boolean;
    questionList: QuestionType[];
    handleRestart: () => void;
};

const GameBoard: React.FC<GameBoardProps> = ({
    isLoaded,
    questionList,
    handleRestart,
}) => {
    const [gameOver, setGameOver] = useState(false);
    const [count, setCount] = useState(0);
    const [chosenAnswers, setChosenAnswers] = useState<
        { value: string; index: number }[]
    >([]);
    const result = [];

    for (const singleQuestion of questionList) {
        const upgradedAnswers = [
            ...singleQuestion.incorrect_answers,
            singleQuestion.correct_answer,
        ].map((q) => ({
            value: q,
            pressed: false,
        }));
        const obj = {
            question: singleQuestion.question,
            answers: shuffle(upgradedAnswers),
        };
        result.push(obj);
    }

    const handleFinishGame = () => {
        setGameOver(true);
        let c = 0;
        for (let i = 0; i < questionList.length - 1; i++) {
            for (let j = 0; j < chosenAnswers.length - 1; j++) {
                if (questionList[i].correct_answer === chosenAnswers[j].value) {
                    c += 1;
                }
            }
        }
        console.log(count);
        setCount(c);
    };

    const handleSelect = (value: string, index: number) => {
        const userAnswer = { value: value, index: index };
        if (chosenAnswers.length) {
            const lastAnswer = chosenAnswers[chosenAnswers.length - 1];
            if (index === lastAnswer.index) {
                chosenAnswers.pop();
            }
        }
        chosenAnswers.push(userAnswer);
    };

    if (!isLoaded) return <h1>Loading...</h1>;
    return (
        <div
            className={
                'flex flex-col justify-center items-center px-20 py-10 border-2 border-gray-600 rounded-xl max-w-2xl shadow-xl gap-4'
            }
        >
            <div className={'flex flex-col justify-center items-start gap-6 '}>
                {result.map((question, index) => (
                    <QuestionComponent
                        key={question.question}
                        question={question}
                        handleSelect={handleSelect}
                        index={index}
                    />
                ))}
            </div>
            {!gameOver ? (
                <ButtonCustom
                    text={'Завершить'}
                    onClick={() => handleFinishGame()}
                />
            ) : (
                <div
                    className={
                        'flex flex-col justify-center items-center gap-4'
                    }
                >
                    <h1>
                        Вы набрали: <span className={'font-bold'}>{count}</span>
                    </h1>
                    <ButtonCustom
                        text={'Начать заново'}
                        onClick={handleRestart}
                    />
                </div>
            )}
        </div>
    );
};

export default GameBoard;
