import { Router } from "express";
import { isAuth } from "../middlewares/auth.js";
import { JWT } from "../utils/auth/passport_auth.js";
import {

    controllerGetProductsCart,
    controllerPostProductCart,
    controllerDeleteProductCart

} from "../controllers/shopping_carts_controller.js";

export const SHOPPING_CART_ROUTER = Router();

SHOPPING_CART_ROUTER.get("/", isAuth, JWT, controllerGetProductsCart);
SHOPPING_CART_ROUTER.post("/", isAuth, JWT, controllerPostProductCart);
SHOPPING_CART_ROUTER.delete("/:id", isAuth, JWT, controllerDeleteProductCart);