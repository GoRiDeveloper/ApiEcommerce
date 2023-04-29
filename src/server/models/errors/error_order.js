export default class ErrorOrder extends Error {

    constructor () {

        super ("Your order cannot be empty.");
        this.type = "YOUR_ORDER_CANNOT_BE_EMPTY";

    };

};