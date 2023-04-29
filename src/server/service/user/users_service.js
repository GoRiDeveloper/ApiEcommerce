import { User } from "../../models/user_model.js";
import { SHOPPING_CART_SERVICE } from "../../service/shopping_cart/index.js";
import ErrProps from "../../models/errors/error_props.js";

export class UserService {

    #userDao;
    
    constructor (userDao) {

        this.#userDao = userDao;

    };

    async register (user) {

        const 

        NEW_USER   = new User(user),
        USER_ID    = NEW_USER.getId,
        USER_DTO   = await NEW_USER.asDto(),
        USER_ADDED = await this.#userDao.addUser(USER_DTO);

        await SHOPPING_CART_SERVICE.addNewCart(USER_ID);

        return USER_ADDED;

    };

    async login (data) {

        if (!data || !data?.email || !data?.pass)
            throw new ErrProps(data);

        const 
        
        { email, pass } = data,
        AUTH_USER       = await this.#userDao.authUser(email, pass);

        return AUTH_USER;

    };

};