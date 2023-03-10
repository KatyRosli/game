import { useEffect, useState } from "react";
import Rounds from "../components/Rounds";
import { calculateScore, isNextGameAllowed } from "../RulesHelper";
import { City, PinPosition } from "../types/MapTypes";
import Rules from "./Rules";
import citiesJson from '../data/cities.json';
import GameMap from "../components/GameMap";
import { useNavigate } from "react-router-dom";

const Tournament = () => {
  const navigate = useNavigate()
  const [tournamentStarted, setTournamentStarted] = useState<boolean>(true);
  const [currentCity, setCurrentCity] = useState<City>(citiesJson.cities[0]);
  const [score, setScore] = useState(parseInt(localStorage.getItem('score') ?? '1500'));
  const [round, setRound] = useState(parseInt(localStorage.getItem('round') ?? '1'));

  useEffect(() => {
    const tournamentStartedFromStorage = localStorage.getItem('tournamentStarted');
    setTournamentStarted(tournamentStartedFromStorage ? JSON.parse(tournamentStartedFromStorage) : false);
    if (!tournamentStarted) {
      navigate("/")
    }
  }, [])

  const updatedPinnedPosition = (pinPosition: PinPosition) => {
    setScore(calculateScore(score, pinPosition, currentCity.position))
    console.log('SCORE: ', score)
  };

  const updateRound = (updatedRound: number, updatedCity: City) => {
    setRound(updatedRound)
    setCurrentCity(updatedCity)
  }

  return (
    <div>
          {/* Render Map component only if showMap is true */}
          {tournamentStarted && <>
            <GameMap updatedPinnedPosition={updatedPinnedPosition} />
            <Rounds score={score} round={round} updateRound={updateRound} />
          </>}
        </div>
  );
}

export default Tournament;