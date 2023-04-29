import { VALIDATIONS } from "../models/validations/index.js";
import ErrOrder from "../models/errors/error_order.js";

export class OrderDTO {

    constructor ({ id, date, idUser, products }) {

        VALIDATIONS.emptyField({ id });
        VALIDATIONS.emptyField({ date });
        VALIDATIONS.emptyField({ idUser });
        VALIDATIONS.arrayValidation(products);

        if (products.length < 1) throw new ErrOrder();

        this.id       = id;
        this.date     = date;
        this.idUser   = idUser;
        this.products = products;

    };

};