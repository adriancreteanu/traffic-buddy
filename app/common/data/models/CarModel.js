export default class UserProfileModel {

    brand: string;
    model: string;
    fabricationYear: number;
    engine: number;
    doors: number;
    fuel: string;
    horsepower: number;
    coupeType: string;


    constructor(carObject) {
        const car = carObject;
        if (car) {
            this.brand = car.brand;
            this.model = car.model;
            this.fabricationYear = car.fabricationYear;
            this.engine = car.engine;
            this.doors = car.doors;
            this.fuel = car.fuel;
            this.horsepower = car.horsepower;
            this.coupeType = car.coupeType;
        }

    }
}