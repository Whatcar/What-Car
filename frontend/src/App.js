import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './routes/Main';
import Result from './routes/Result';
import Search from './routes/Search';
import './css/Reset.css'
import './css/App.css'
import styled from 'styled-components'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Contents>
          <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/result/:id' element={<Result />} />
          <Route path='/search' element={<Search />} />

        </Routes>
        </Contents>
        
      </BrowserRouter>
    </div>
  );
}

export default App;


const Contents = styled.div`
  margin-top: 7rem;
`;