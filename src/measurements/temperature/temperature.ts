export enum TemperatureUnit {
    Celcius = "celcius",
    Fahrenheit = "fahrenheit"
}

export default class Temperature {
    constructor(
        public value: number,
        public unit: TemperatureUnit
    ) { }
}
