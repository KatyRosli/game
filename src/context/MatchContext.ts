import React, {Dispatch} from 'react';
import { MatchAction, MatchState } from '../reducers/MatchReducer';

interface IContextProps {
  state: MatchState;
  dispatch:Dispatch<MatchAction>
}

const MatchContext = React.createContext({} as IContextProps);

export const useMatchContext = () => {
  return React.useContext(MatchContext);
}

export default MatchContext;