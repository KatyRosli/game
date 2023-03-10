import { Route, Routes } from 'react-router-dom';
import Tournament from './pages/Tournament';
import Rules from './pages/Rules';
import PlayAgain from './pages/PlayAgain';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Rules/>} />
      <Route path='/tournament' element={<Tournament/>} />
      <Route path='/play-again' element={<PlayAgain/>} />
    </Routes>
  )
};

export default App;
