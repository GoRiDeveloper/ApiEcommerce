import { ORDER_SERVICE } from "../service/orders/index.js";
import { configId } from "../../config/config.js";

export async function controllerGetOrders ({ user }, res) {

    const ORDERS = await ORDER_SERVICE.getPurchaseOrdersFromUser(configId(user));
    res.status(200).json(ORDERS);

};

export async function controllerPostOrder ({ user }, res) {

    const ORDER = await ORDER_SERVICE.createNewOrder(configId(user), user.email);
    res.status(201).json(ORDER);

};