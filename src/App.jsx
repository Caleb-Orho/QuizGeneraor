import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./assets/Components/Home"
import Quiz from "./assets/Components/Quiz"

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/Quiz" element={<Quiz />} />
    </Routes>
  );
};

export default App;
