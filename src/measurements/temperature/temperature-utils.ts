import Temperature, { TemperatureUnit } from "./temperature";

export function toFahrenheit(field: Temperature): number {
    if (field.unit === TemperatureUnit.Fahrenheit) {
        return field.value;
    }

    return (field.value * 1.8) + 32;
}

export function toCelcius(field: Temperature): number {
    if (field.unit === TemperatureUnit.Celcius) {
        return field.value;
    }

    return (field.value - 32) * 1.8;
}
