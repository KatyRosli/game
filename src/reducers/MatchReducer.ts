import { City, PinPosition } from "../types/MapTypes";

const matchReducer = (state: MatchState, action: MatchAction) => {
    const { type, payload } = action;
  return { ...state, [type]: payload };
}

type MatchState = {
    round: number;
    score: number;
    pinIsCorrect: boolean | null;
    pinPosition: PinPosition;
    correctCityList: string[];
    currentCity: City;
    tournamentStarted: boolean;
}

type MatchAction = {
    type: string;
    payload: Object | null;
}

enum ActionType {
    ROUND = 'round',
    SCORE = 'score',
    PIN_IS_CORRECT = 'pinIsCorrect',
    PIN_POSITION = 'pinPosition',
    CORRECT_CITY_LIST = 'correctCityList',
    CURRENT_CITY = 'currentCity',
    TOURNAMENT_STARTED = 'tournamentStarted'
}

export { matchReducer, ActionType };
export type { MatchState, MatchAction };
