import { useEffect, useState } from "react";
import Rounds from "../components/Rounds";
import { calculateScore, hasGameEnded, isPinCorrect } from "../RulesHelper";
import GameMap from "../components/GameMap";
import { useNavigate } from "react-router-dom";
import { useMatchContext } from "../context/MatchContext";
import { ActionType } from "../reducers/MatchReducer";

const Tournament = () => {
  const navigate = useNavigate()
  const [tournamentStarted] = useState<boolean>(JSON.parse(localStorage.getItem('tournamentStarted') ?? JSON.stringify(false)));
  const { state, dispatch } = useMatchContext();

  useEffect(() => {
    if (!tournamentStarted) {
      navigate("/")
    }

    if (hasGameEnded(state.score, state.round)) {
      navigate("/play-again")
    }
  }, [navigate, state.round, state.score, tournamentStarted])

  useEffect(() => {
    if (Object.keys(state.pinPosition).length !== 0) {
      const newScore = calculateScore(state.score, state.pinPosition, state.currentCity.position);
      dispatch({ type: ActionType.SCORE, payload: newScore });
      localStorage.setItem('score', JSON.stringify(newScore));
      if (isPinCorrect(state.pinPosition, state.currentCity.position)) {
        state.correctCityList.push(state.currentCity.name)
        localStorage.setItem('correctCityList', JSON.stringify(state.correctCityList))
        localStorage.setItem('pinIsCorrect', JSON.stringify(true))
        dispatch({ type: ActionType.CORRECT_CITY_LIST, payload: state.correctCityList });
        dispatch({ type: ActionType.PIN_IS_CORRECT, payload: true });
      } else {
        dispatch({ type: ActionType.PIN_IS_CORRECT, payload: false });
        localStorage.setItem('pinIsCorrect', JSON.stringify(false))
      }
    }
  }, [dispatch, state.correctCityList, state.currentCity.name, state.currentCity.position, state.pinPosition, state.score])

  const resultMessage = () => {
    if(state.pinIsCorrect) {
      return (<p>😃 Yes you got it right!</p>)
    } else if (state.pinIsCorrect != null) {
      return(<p> ☹️ That's too far, you got it wrong. Try again!</p>)
    } else {
      return ''
    }
  }

  return (
    <aside>
      {/* Render Map component only if showMap is true */}
      {tournamentStarted && <>
        <Rounds />
        <div className='resultmessage'>
          <div> {resultMessage()} </div>
        </div>
        <GameMap />
      </>}
    </aside>
  );
}

export default Tournament;