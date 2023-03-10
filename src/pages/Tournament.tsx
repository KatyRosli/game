import { useEffect, useState } from "react";
import Rounds from "../components/Rounds";
import { calculateScore, hasGameEnded, isResultCorrect } from "../RulesHelper";
import { City, PinPosition } from "../types/MapTypes";
import citiesJson from '../data/cities.json';
import GameMap from "../components/GameMap";
import { useNavigate } from "react-router-dom";

const Tournament = () => {
  const navigate = useNavigate()
  const [tournamentStarted, setTournamentStarted] = useState<boolean>(true);
  const [currentCity, setCurrentCity] = useState<City>(citiesJson.cities[0]);
  const [score, setScore] = useState(parseInt(localStorage.getItem('score') ?? '1500'));
  const [round, setRound] = useState(parseInt(localStorage.getItem('round') ?? '1'));
  const [pinPosition, setPinPosition] = useState<PinPosition | null>(null);
  const [correctCityList, setCorrectCityList] = useState<string[]>([])

  useEffect(() => {
    const tournamentStartedFromStorage = localStorage.getItem('tournamentStarted');
    setTournamentStarted(tournamentStartedFromStorage ? JSON.parse(tournamentStartedFromStorage) : false);
    if (!tournamentStarted) {
      navigate("/")
    }
    if (hasGameEnded(score, round)) {
      navigate("/play-again")
    }
  }, [navigate, round, score, tournamentStarted])

  const updatedPinnedPosition = (pinPosition: PinPosition) => {
    setScore(calculateScore(score, pinPosition, currentCity.position))  
    setPinPosition(pinPosition)
    if (isResultCorrect(pinPosition, currentCity.position)) {
      correctCityList.push(currentCity.name)
      setCorrectCityList(correctCityList)
    }
    if (hasGameEnded(score, round)) {
      navigate("/play-again")
    }
  };

  const updateRound = (updatedRound: number, updatedCity: City) => {
    setRound(updatedRound)
    setCurrentCity(updatedCity)
  }

  const resultMessage = () => {
    if(isResultCorrect(pinPosition, currentCity.position)) {
      return (<p>Yes you got it right!</p>)
    } else if (pinPosition != null) {
      return(<p>That's too far, you got it wrong!</p>)
    } else {
      return ''
    }
  }

  return (
    <div>
          {/* Render Map component only if showMap is true */}
          {tournamentStarted && <>
            <GameMap updatedPinnedPosition={updatedPinnedPosition} />
            <Rounds score={score} round={round} updateRound={updateRound} />
            {resultMessage}
          </>}
        </div>
  );
}

export default Tournament;