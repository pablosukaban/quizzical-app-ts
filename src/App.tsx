import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GameBoard } from './pages/GameBoard';
import { CategoriesList } from './pages/CategoriesList';
import { Home } from './pages/Home';
import { PageNotFound } from './pages/PageNotFount';

const App = () => {
    return (
        <div className="min-h-screen flex justify-center items-center py-6">
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/categories" element={<CategoriesList />} />
                <Route path="/categories/:category" element={<GameBoard />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
};

export default App;
