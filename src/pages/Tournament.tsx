import { useEffect, useState } from "react";
import Rounds from "../components/Rounds";
import { calculateScore, hasGameEnded, isResultCorrect } from "../RulesHelper";
import { City, PinPosition } from "../types/MapTypes";
import citiesJson from '../data/cities.json';
import GameMap from "../components/GameMap";
import { Route, Routes, useNavigate } from "react-router-dom";
import PlayAgain from "./PlayAgain";

const Tournament = () => {
  const navigate = useNavigate()
  const [tournamentStarted, setTournamentStarted] = useState<boolean>(true);
  const [currentCity, setCurrentCity] = useState<City>(citiesJson.cities[0]);
  const [score, setScore] = useState<number>(parseInt(localStorage.getItem('score') ?? '1500'));
  const [round, setRound] = useState(parseInt(localStorage.getItem('round') ?? '1'));
  const [correctCityList, setCorrectCityList] = useState<string[]>([])
  const [pinIsCorrect, setPinIsCorrect] = useState<boolean | null>(null)

  useEffect(() => {
    const correctCityListFromStorage = localStorage.getItem('correctCityList');
    setCorrectCityList(correctCityListFromStorage ? JSON.parse(correctCityListFromStorage) : []);

    const tournamentStartedFromStorage = localStorage.getItem('tournamentStarted');
    setTournamentStarted(tournamentStartedFromStorage ? JSON.parse(tournamentStartedFromStorage) : false);

    if (!tournamentStarted) {
      navigate("/")
    }

    if (hasGameEnded(score, round)) {
      const sendList: string[] = correctCityListFromStorage != null && correctCityList !== JSON.parse(correctCityListFromStorage) 
        ? JSON.parse(correctCityListFromStorage) : correctCityList;
      navigate("/tournament/play-again", {
        state: JSON.stringify({ result: sendList, resetCallback: resetTournament })
      })
    }
  }, [navigate, round, score, tournamentStarted])

  const updatedPinnedPosition = (pinPosition: PinPosition) => {
    setScore(calculateScore(score, pinPosition, currentCity.position))
    if (isResultCorrect(pinPosition, currentCity.position)) {
      correctCityList.push(currentCity.name)
      setCorrectCityList(correctCityList)
      localStorage.setItem('correctCityList', JSON.stringify(correctCityList))
      setPinIsCorrect(true)
      localStorage.setItem('pinIsCorrect', JSON.stringify(true))
    } else {
      setPinIsCorrect(false)
      localStorage.setItem('pinIsCorrect', JSON.stringify(false))
    }
  };

  const updateToNextRound = (updatedRound: number, updatedCity: City) => {
    setRound(updatedRound)
    setCurrentCity(updatedCity)
    setPinIsCorrect(null)
  }

  const resetTournament = () => {
    localStorage.removeItem('round')
    localStorage.removeItem('score')
    localStorage.removeItem('correctCityList')
    setCorrectCityList([] as string[])
    setScore(1500)
    setRound(1)
    setCurrentCity(citiesJson.cities[0])
    setPinIsCorrect(null)
    navigate("/tournament")
  }

  const resultMessage = () => {
    if(pinIsCorrect) {
      return (<p>😃 Yes you got it right!</p>)
    } else if (pinIsCorrect != null) {
      return(<p> ☹️ That's too far, you got it wrong. Try again!</p>)
    } else {
      return ''
    }
  }

  return (
    <aside>
      {/* Render Map component only if showMap is true */}
      {tournamentStarted && <>
        <Rounds score={score} round={round} updateToNextRound={updateToNextRound} pinIsCorrect={pinIsCorrect}/>
        <div className='resultmessage'>
          <div> {resultMessage()} </div>
        </div>
        <GameMap updatedPinnedPosition={updatedPinnedPosition} />
      </>}
      <Routes>
        <Route path='/play-again' element={<PlayAgain resetCallback={resetTournament} />} />
      </Routes>
    </aside>
  );
}

export default Tournament;