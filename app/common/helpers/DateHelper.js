//imports

class DateHelper {

    static generateCurrentDate() {
        let today = new Date();
        return today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();
    }
}

export default DateHelper;