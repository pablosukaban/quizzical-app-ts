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
        <div className="rounded border px-12 py-14 shadow-md transition hover:shadow-lg">
            <div>
                <h1 className="mb-6 cursor-default text-center text-xl capitalize text-gray-500 transition hover:text-gray-700">
                    Выберите категорию вопросов
                </h1>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5 lg:gap-8">
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
                                    className=" cursor-pointer  rounded border py-4 px-2 text-center shadow transition-colors hover:border-gray-300"
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
