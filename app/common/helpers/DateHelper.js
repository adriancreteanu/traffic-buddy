//imports

class DateHelper {

    static generateCurrentDate() {
        let today = new Date();
        return today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    }
}

export default DateHelper;