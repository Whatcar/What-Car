import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Main from './routes/Main';
import Result from './routes/Result';
import Search from './routes/Search';
import './css/Reset.css';

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
import { RecoilRoot } from 'recoil';
import WorldcupResult from './routes/WorldcupResult.jsx';
import Destiny from './routes/Destiny.jsx';
import Gallery from './routes/Gallery.jsx';
import SearchDetail from './routes/SearchDetail';

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <ThemeProvider theme={mainTheme}>
        <MUIThemeProvider theme={muiTheme}>
          <RecoilRoot>
            <BrowserRouter>
              <ScrollToTop />
              <Navbar />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/result/:id" element={<Result />} />
                <Route path="/search" element={<Search />} />
                <Route path="/search/detail/:id" element={<SearchDetail />} />
                <Route path="/destiny" element={<Destiny />} />
                <Route path="/mbti/test" element={<MBTItest />} />
                <Route path="/mbti/result/:type" element={<MBTIresult />} />
                <Route path="/worldcup/test" element={<WorldcupTest />} />
                <Route path="/worldcup/result/:id" element={<WorldcupResult />} />
                <Route path="/team" element={<Team />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </RecoilRoot>
        </MUIThemeProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
