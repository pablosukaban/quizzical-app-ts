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
                'bg-white border text-black px-6 py-2 rounded ' +
                'font-semibold text-lg shadow-md active:shadow-none active:translate-y-0.5 transition'
            }
        >
            {text}
        </button>
    );
};

export default ButtonCustom;
