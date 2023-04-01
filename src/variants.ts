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

export const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, // задержка между появлением элементов списка
        },
    },
};

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export const contaienrAnswersVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5,
        },
    },
};

export const answersVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
};
