import { Route, Routes } from 'react-router-dom';
import Tournament from './pages/Tournament';
import Rules from './pages/Rules';
import './App.scss';
import { useReducer } from 'react';
import { matchReducer, MatchState } from './reducers/MatchReducer';
import citiesJson from './data/cities.json';
import MatchContext from './context/MatchContext';
import PlayAgain from './pages/PlayAgain';
import Footer from './components/Footer';

const App: React.FC = () => {
  const initialState: MatchState = {
    currentCity: citiesJson.cities[0],
    score: parseInt(localStorage.getItem('score') ?? '1500'),
    round: parseInt(localStorage.getItem('round') ?? '1'),
    correctCityList: JSON.parse(localStorage.getItem('correctCityList') ?? '[]'),
    pinIsCorrect: null,
    pinPosition: JSON.parse('{}'),
    tournamentStarted: JSON.parse(localStorage.getItem('tournamentStarted') ?? 'false')
  }

  const [state, dispatch] = useReducer(matchReducer, initialState);

  const providerState = { state, dispatch };

  return (
    <>
    <MatchContext.Provider value={providerState}>
      <Routes>
        <Route path='/' element={<Rules/>} />
        <Route path='/tournament' element={<Tournament/>} />
        <Route path='/play-again' element={<PlayAgain />} />
      </Routes>
    </MatchContext.Provider>
    <Footer />
    </>
  )
};

export default App;
