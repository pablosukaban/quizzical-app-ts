import React from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { GameBoard } from './pages/GameBoard';
import { CategoriesList } from './pages/CategoriesList';
import { Home } from './pages/Home';
import { PageNotFound } from './pages/PageNotFount';
import { AnimatePresence } from 'framer-motion';

const App = () => {
    const element = useRoutes([
        {
            path: '/',
            index: true,
            element: <Home />,
        },
        {
            path: '/categories',
            element: <CategoriesList />,
        },
        {
            path: '/categories/:category',
            element: <GameBoard />,
        },
        {
            path: '*',
            element: <PageNotFound />,
        },
    ]);

    const location = useLocation();

    if (!element) return null;

    return (
        <div className="flex min-h-screen items-center justify-center py-6">
            <AnimatePresence mode="wait">
                {React.cloneElement(element, { key: location.pathname })}
            </AnimatePresence>
        </div>
    );
};

export default App;
