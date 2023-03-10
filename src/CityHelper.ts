// decide if 50km & less add into the Correct city guessed list
const addCity = (correctList: string[], cityName: string) => {
    correctList.push(cityName)
}

export { addCity }