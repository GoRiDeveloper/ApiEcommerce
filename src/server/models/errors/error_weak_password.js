export default class ErrorWeakPassword extends Error {

    constructor (pass) {

        super (`Your password : ${pass} is very weak`);
        this.type = "WEAK_PASS"

    };

};