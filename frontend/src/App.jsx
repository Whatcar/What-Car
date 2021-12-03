import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Main from './routes/Main';
import Result from './routes/Result';
import Search from './routes/Search';
import './css/Reset.css';
import styled from 'styled-components';
import MBTI from './routes/MBTI.jsx';
import Worldcup from './routes/Worldcup.jsx';
import Team from './routes/Team.jsx';
import MBTItest from './routes/MBTItest.jsx';
import NotFound from './routes/NotFound.jsx';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import muiTheme from './css/muiTheme.js';
import GlobalStyles from './css/GlobalStyles.js';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from './css/theme.js';
import WorldcupTest from './routes/WorldcupTest.jsx';
import ScrollToTop from './routes/ScrollTop.jsx';
import MBTIresult from './routes/MBTIresult.jsx';
<<<<<<< HEAD
import { RecoilRoot } from 'recoil';
=======
import WorldcupResult from './routes/WorldcupResult.jsx';
>>>>>>> 4fa017303edb359f07c6aa21472d562fbe741361

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <ThemeProvider theme={mainTheme}>
        <MUIThemeProvider theme={muiTheme}>
<<<<<<< HEAD
          <RecoilRoot>
            <BrowserRouter>
              <ScrollToTop />
              <Navbar />
              <Contents>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/result/:id" element={<Result />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/mbti" element={<MBTI />} />
                  <Route path="/mbti/test" element={<MBTItest />} />
                  <Route path="/mbti/result/:type" element={<MBTIresult />} />
                  <Route path="/worldcup" element={<Worldcup />} />
                  <Route path="/worldcup/test" element={<WorldcupTest />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </Contents>
            </BrowserRouter>
          </RecoilRoot>
=======
          <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <Contents>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/result/:id" element={<Result />} />
                <Route path="/search" element={<Search />} />
                <Route path="/mbti" element={<MBTI />} />
                <Route path="/mbti/test" element={<MBTItest />} />
                <Route path="/mbti/result/:type" element={<MBTIresult />} />
                <Route path="/worldcup" element={<Worldcup />} />
                <Route path="/worldcup/test" element={<WorldcupTest />} />
                <Route path="/worldcup/result/:id" element={<WorldcupResult />} />
                <Route path="/team" element={<Team />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </Contents>
          </BrowserRouter>
>>>>>>> 4fa017303edb359f07c6aa21472d562fbe741361
        </MUIThemeProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

const Contents = styled.div`
  width: 66%;
  margin: 10rem auto;
  @media screen and (max-width: 480px) {
    width: 85%;
    margin: 5rem auto;
  }
`;
