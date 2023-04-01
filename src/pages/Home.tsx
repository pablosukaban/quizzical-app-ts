import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { homeVariants } from '../variants';

export const Home = () => {
    return (
        <div
            className={
                'flex flex-col items-center justify-center gap-8 rounded border p-20 shadow-md transition-colors hover:shadow-lg'
            }
        >
            <motion.h1
                className={'cursor-default text-3xl font-semibold'}
                variants={homeVariants}
                initial={'hidden'}
                animate={'visible'}
            >
                Quizzical
            </motion.h1>
            <motion.p
                className={'cursor-default text-xl'}
                variants={homeVariants}
                initial={'hidden'}
                animate={'visible'}
                transition={{ delay: 0.4 }}
            >
                Игра-викторина с множеством категорий
            </motion.p>

            <Link to={'/categories'}>
                <motion.div
                    className="cursor-pointer rounded border px-4 py-3 shadow transition-colors hover:border-gray-300"
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
