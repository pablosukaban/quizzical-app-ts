export type AnswerType = { value: string; pressed: boolean; correct: boolean };

export type CategoryType = {
    category: string;
    tags: string[];
};

export type QuestionType = {
    type: string;
    difficulty: string;
    id: string;
    category: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
};

export type QuestionComponentProps = {
    question: {
        question: string;
        answers: AnswerType[];
    };
    handleSelect: (value: string, index: number) => void;
    index: number;
    gameOver: boolean;
};

export type SingleAnswerProps = {
    answer: AnswerType;
    index: number;
    handleClick: (value: string) => void;
    gameOver: boolean;
};

export type GameBoardProps = {
    isLoading: boolean;
    isError: boolean;
    questionList: QuestionType[];
    handleRestart: () => void;
};
