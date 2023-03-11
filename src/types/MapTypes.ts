type City = {
    name: string;
    position: PinPosition
}

type PinPosition = {
    lat: number;
    lng: number; 
}

export type { City, PinPosition }