import { Route, Routes } from 'react-router-dom';
import Tournament from './pages/Tournament';
import Rules from './pages/Rules';
import './App.scss';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Rules/>} />
      <Route path='/tournament/*' element={<Tournament/>} />
    </Routes>
  )
};

export default App;
