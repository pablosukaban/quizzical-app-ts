import React, { useState } from 'react';
import ButtonCustom from '../components/ButtonCustom';
import { shuffle } from '../utils/shuffle';
import { QuestionComponent } from '../components/QuestionComponent';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Confetti from 'react-confetti';
import { LoadingPage } from '../components/LoadingPage';
import { QuestionType } from '../types';

export const fetchQuiz = async (category: string): Promise<QuestionType[]> => {
    const URL = `https://the-trivia-api.com/api/questions?categories=${category}&limit=5`;
    const response = await fetch(URL);
    const json = await response.json();
    return json;
};

const getFormattedList = (questionList: QuestionType[]) => {
    const result = [];

    for (const singleQuestion of questionList) {
        const upgradedAnswers = [
            ...singleQuestion.incorrectAnswers,
            singleQuestion.correctAnswer,
        ].map((q) => ({
            id: singleQuestion.id,
            value: q,
            pressed: false,
            correct: q === singleQuestion.correctAnswer,
        }));
        const obj = {
            question: singleQuestion.question,
            answers: shuffle(upgradedAnswers),
        };
        result.push(obj);
    }

    return result;
};

export const GameBoard = () => {
    const [gameOver, setGameOver] = useState(false);
    const [count, setCount] = useState(0);
    const [chosenAnswers, setChosenAnswers] = useState<
        { value: string; index: number }[]
    >([]);

    const { category } = useParams();
    if (!category) return <h1>No category?</h1>;

    const {
        data: questionList,
        isLoading,
        isError,
    } = useQuery(['quiz'], () => fetchQuiz(category), {
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <LoadingPage />;
    if (isError) return <h1>Error</h1>;

    const result = getFormattedList(questionList);

    const handleSelect = (value: string, index: number) => {
        const userAnswer = { value: value, index: index };
        if (chosenAnswers.length) {
            const lastAnswer = chosenAnswers[chosenAnswers.length - 1];
            if (index === lastAnswer.index) {
                chosenAnswers.pop();
            }
        }
        setChosenAnswers((prevState) => [...prevState, userAnswer]);
    };

    const handleFinishGame = () => {
        setGameOver(true);

        let c = 0;
        for (const question of questionList) {
            for (const chosen of chosenAnswers) {
                if (question.correctAnswer === chosen.value) {
                    c += 1;
                }
            }
        }
        setCount(c);
    };

    const width = window.innerWidth;
    const height = window.innerHeight;

    return (
        <div
            className={
                'flex flex-col justify-center items-center px-20 py-10  shadow-md hover:shadow-lg rounded-xl max-w-2xl gap-4 transition'
            }
        >
            {count === 5 && <Confetti width={width} height={height} />}
            <div className={'flex flex-col justify-center items-start gap-6 '}>
                {result.map((question, index) => (
                    <QuestionComponent
                        key={question.question}
                        question={question}
                        handleSelect={handleSelect}
                        index={index}
                        gameOver={gameOver}
                    />
                ))}
            </div>
            {!gameOver ? (
                <ButtonCustom
                    text={'Узнать результат'}
                    onClick={handleFinishGame}
                />
            ) : (
                <div className={'flex justify-center items-center gap-4'}>
                    <h1 className="text-lg">
                        Вы набрали: <strong>{count} / 5</strong>
                    </h1>
                    <Link to="/categories">
                        <div className=" text-center rounded hover:shadow border border-white hover:border-gray-200 cursor-pointer py-2 px-3 transition">
                            Завершить
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
};
