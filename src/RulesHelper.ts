import { PinPosition } from "./types/MapTypes";

const calculateScore = (score: number, pinPosition: PinPosition, currentCityPosition: PinPosition): number => {
    return score - calculateDistance(pinPosition, currentCityPosition);
}

/**
 * Calculates the distance between pinned position and the goal city position
 * 
 * @param pinPosition 
 * @param currentCity the city that is the goal
 * @returns distance in kilometers
 */
const calculateDistance = (pinPosition: PinPosition, currentCityPosition: PinPosition): number => {
    const R = 6371e3;
    const { lat: pinLat, lng: pinLng } = pinPosition;
    const { lat: lat2, lng: lng2 } = currentCityPosition;
    const phi1 = (pinLat * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - pinLat) * Math.PI) / 180;
    const deltaLambda = ((lng2 - pinLng) * Math.PI) / 180;

    const a =
        Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c / 1000);
}

const isNextGameAllowed = (score: number, round: number): boolean => {
    return score >= 0 && round <= 9
}

const hasGameEnded = (score: number, round: number) => {
    return score < 0 || round > 9
}

const isPinCorrect = (pinPosition: PinPosition | null, currentCityPosition: PinPosition): boolean => {
    return pinPosition != null && calculateDistance(pinPosition, currentCityPosition) < 50;
}

export { calculateScore, isNextGameAllowed, hasGameEnded, isPinCorrect }