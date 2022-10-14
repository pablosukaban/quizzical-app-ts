import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const URL = 'https://the-trivia-api.com/api/categories';

type CategoryType = {
    category: string;
    tags: string[];
};

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

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h1>Error! </h1>;

    return (
        data && (
            <div className="border rounded shadow-lg px-12 py-14 hover:border-gray-400 transition">
                <div>
                    <h1 className="text-center text-gray-500 hover:text-gray-700 text-xl capitalize mb-6 font-bold cursor-default transition">
                        Выберите категорию вопросов
                    </h1>
                    <div className="grid grid-cols-5 gap-8">
                        {Object.entries(data).map((item) => {
                            const category = item[0];
                            const tags = item[1];
                            const url =
                                tags.length > 1
                                    ? tags[tags.length - 1]
                                    : tags[0];

                            return (
                                <Link key={category} to={url}>
                                    <div className="border text-center border-gray-400 rounded shadow cursor-pointer py-4 px-2 hover:bg-gray-50 transition">
                                        {category}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
    );
};
