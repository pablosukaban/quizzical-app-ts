export const homeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

export const categoriesVariants = {
    hidden: {
        opacity: 0,
    },
    visible: (custom: number) => ({
        opacity: 1,
        transition: {
            delay: custom / 10 + 0.2,
        },
    }),
};

export const answersVariants = {
    hidden: {
        opacity: 0,
    },
    visible: (custom: number) => ({
        opacity: 1,
        transition: {
            delay: custom / 10 + 1,
        },
    }),
};

export const questionVariants = {
    hidden: {
        opacity: 0,
    },
    visible: (custom: number) => ({
        opacity: 1,
        transition: {
            delay: custom / 10 + 0.2,
        },
    }),
};
