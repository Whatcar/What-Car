import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Main from './routes/Main';
import Result from './routes/Result';
import Search from './routes/Search';
import './css/Reset.css';
import './css/App.css';
import styled from 'styled-components';
import MBTI from './routes/MBTI';
import Worldcup from './routes/Worldcup';
import Team from './routes/Team';
import MBTItest from './routes/MBTItest.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Contents>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/result/:id" element={<Result />} />
            <Route path="/search" element={<Search />} />
            <Route path="/mbti" element={<MBTI />} />
            <Route path="/mbti/:pageNum" element={<MBTItest />} />
            <Route path="/worldcup" element={<Worldcup />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </Contents>
      </BrowserRouter>
    </div>
  );
}

export default App;

const Contents = styled.div`
  width: 66%;
  margin: 10rem auto;
  @media screen and (max-width: 480px) {
    width: 85%;
  }
`;
