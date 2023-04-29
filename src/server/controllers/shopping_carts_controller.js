import { SHOPPING_CART_SERVICE } from "../service/shopping_cart/index.js";
import { configId } from "../../config/config.js";

async function controllerGetProductsCart ({ user }, res) {

    const CART = await SHOPPING_CART_SERVICE
                        .getCartProductsInfo(configId(user));

    res.status(200).json(CART);

};

async function controllerPostProductCart ({ body, user }, res) {

    const 
    
    USER_ID          = configId(user),
    ADD_PROD_TO_CART = await SHOPPING_CART_SERVICE
                                .addNewProdToCart(USER_ID, body);
    
    res.status(201).json(ADD_PROD_TO_CART);

};

async function controllerDeleteProductCart ({ params: { id }, user }, res) {

    const 
    
    USER_ID          = configId(user),
    DELETE_PROD_CART = await SHOPPING_CART_SERVICE
                                .deleteProdToCart(USER_ID, id);

    res.status(200).json(DELETE_PROD_CART);

};

export {

    controllerGetProductsCart,
    controllerPostProductCart,
    controllerDeleteProductCart

};