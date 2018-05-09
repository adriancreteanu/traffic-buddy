//imports
import { strings } from "../localization/strings-repository";

// Localized months indexed 0 - 11
let months = [
    strings.january,
    strings.february,
    strings.march,
    strings.april,
    strings.may,
    strings.june,
    strings.july,
    strings.august,
    strings.september,
    strings.october,
    strings.november,
    strings.december
];


class DateHelper {

    static generateCurrentDate() {
        let today = new Date();
        return today.getDate() + " " + months[today.getMonth()].toUpperCase() + " " + today.getFullYear();
    }

    static formatDate(date: Date): String {
        return ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
            date.getFullYear();
    }

    static formatTime(date: Date): String {
        return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    }
}

export default DateHelper;