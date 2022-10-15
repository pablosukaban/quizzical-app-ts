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
                'bg-white border border-white hover:border-gray-200 text-black px-6 py-2 rounded ' +
                'font-semibold text-lg hover:shadow-md active:shadow-none active:translate-y-0.5 transition'
            }
        >
            {text}
        </button>
    );
};

export default ButtonCustom;
