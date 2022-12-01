import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useIsPresent } from 'framer-motion';
import { homeVariants } from '../variants';

export const Home = () => {
    const isPresent = useIsPresent();

    return (
        <div
            className={
                'flex flex-col justify-center items-center gap-8 rounded shadow-md hover:shadow-lg p-20 transition-all'
            }
        >
            <motion.h1
                className={'font-semibold text-3xl cursor-default'}
                variants={homeVariants}
                initial={'hidden'}
                animate={'visible'}
            >
                Quizzical
            </motion.h1>
            <motion.p
                className={'text-xl cursor-default'}
                variants={homeVariants}
                initial={'hidden'}
                animate={'visible'}
                transition={{ delay: 0.4 }}
            >
                Описание
            </motion.p>

            <Link to={'/categories'}>
                <motion.div
                    className="rounded px-4 py-3 shadow border cursor-pointer transition-colors"
                    variants={homeVariants}
                    initial={'hidden'}
                    animate={'visible'}
                    transition={{ delay: 0.7 }}
                >
                    Начать игру
                </motion.div>
            </Link>
        </div>
    );
};
