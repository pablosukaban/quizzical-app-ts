import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { LoadingPage } from '../components/LoadingPage';
import { motion } from 'framer-motion';
import { CategoryType } from '../types';
import { categoriesVariants } from '../variants';

const URL = 'https://the-trivia-api.com/api/categories';

const fetchCategories = async (): Promise<CategoryType> => {
    const response = await fetch(URL);
    return await response.json();
};

export const CategoriesList = () => {
    const { data, isLoading, isError } = useQuery(
        ['questions_list'],
        fetchCategories,
        {
            refetchOnWindowFocus: false,
        }
    );

    if (isLoading) return <LoadingPage />;

    if (isError) return <h1>Error! </h1>;

    return (
        <div className=" rounded shadow-md px-12 py-14 hover:shadow-lg transition">
            <div>
                <h1 className="text-center text-gray-500 hover:text-gray-700 text-xl capitalize mb-6 font-bold cursor-default transition">
                    Выберите категорию вопросов
                </h1>
                <div className="grid grid-cols-5 gap-8">
                    {Object.entries(data).map((item, index) => {
                        const category = item[0];
                        const tags = item[1];
                        const url =
                            tags.length > 1 ? tags[tags.length - 1] : tags[0];

                        return (
                            <Link to={url} key={item[0]}>
                                <motion.div
                                    variants={categoriesVariants}
                                    custom={index}
                                    initial={'hidden'}
                                    animate={'visible'}
                                    key={category}
                                    className=" text-center  rounded shadow cursor-pointer py-4 px-2 hover:bg-gray-50 transition-colors"
                                >
                                    {category}
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
