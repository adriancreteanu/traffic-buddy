


class InputValidationHelper {

    static fieldIsEmpty(text: string): boolean {
        return text === "";
    }

    static validateEmailAddress(email: string) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(email);
    }

    static validatePlateNumber(plateNumber: string) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(plateNumber);
    }

    static extractLocationFromUsername(username: string) {
        // Calculate user location in database
        var location = username.substring(0, 2);

        // Verification for Bucharest
        if (!isNaN(location.charAt(1))) {
            location = username.charAt(0);
        }

        return location;
    }

}

export default InputValidationHelper;