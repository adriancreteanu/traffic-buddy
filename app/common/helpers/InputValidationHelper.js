


class InputValidationHelper {

    static fieldIsEmpty(text: string): boolean {
        return text === "";
    }

    static validateEmailAddress(email: string) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(email);
    }


}




export default InputValidationHelper;