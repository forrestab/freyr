export default class Temperature {
    public celcius: number;
    public fahrenheit: number;

    constructor(
        value: number
    ) {
        this.celcius = value;
        this.fahrenheit = (value * 1.8) + 32;
    }
}
