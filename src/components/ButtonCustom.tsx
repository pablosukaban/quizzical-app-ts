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
            className={
                'rounded border border-white bg-white px-6 py-2 text-black hover:border-gray-200 ' +
                'text-lg font-semibold transition hover:shadow-md active:translate-y-0.5 active:shadow-none'
            }
        >
            {text}
        </button>
    );
};

export default ButtonCustom;
