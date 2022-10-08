import React from 'react';

const ButtonCustom = ({
    text,
    onClick,
}: {
    text: string;
    onClick: () => void;
}) => {
    return (
        <button
            onClick={onClick}
            className={'bg-primary text-dimWhite px-6 py-4 rounded font-semibold text-lg'}
        >
            {text}
        </button>
    );
};

export default ButtonCustom;
