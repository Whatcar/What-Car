import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './routes/Main';
import Result from './routes/Result';
import Search from './routes/Search'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route exact path='/result/:id' element={<Result />} />
          <Route exact path='/search' element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
