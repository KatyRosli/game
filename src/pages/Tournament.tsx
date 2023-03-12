import { useEffect, useState } from "react";
import Rounds from "../components/Rounds";
import { hasGameEnded } from "../RulesHelper";
import GameMap from "../components/GameMap";
import { useNavigate } from "react-router-dom";
import { useMatchContext } from "../context/MatchContext";

const Tournament = () => {
  const navigate = useNavigate()
  const [tournamentStarted] = useState<boolean>(JSON.parse(localStorage.getItem('tournamentStarted') ?? JSON.stringify(false)));
  const { state } = useMatchContext();

  useEffect(() => {
    if (!tournamentStarted) {
      navigate("/")
    }

    if (hasGameEnded(state.score, state.round)) {
      navigate("/play-again")
    }
  }, [navigate, state.round, state.score, tournamentStarted]);

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