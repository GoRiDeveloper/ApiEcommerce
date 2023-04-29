import { PROD_DAO } from "./persistence/factory.js";
import { getKey, getValue } from "../utils/object_utils.js";
import { CONFIG, DEFAULT_MODE, configId } from "../../config/config.js";
import ErrIDNotFound from "../models/errors/error_id_not_found.js";

export class ShoppingCartDAO {

    #persistence;

    constructor (daoPersistence) {

        this.#persistence = daoPersistence;

    };

    async getShoppingCart (id) {

        const ID = id.trim();

        if (!ID) throw new ErrIDNotFound(ID);

        return await this.#persistence.getOne(id);

    };

    async getCartProducts (shoppingCart) {

        let newProds = [];
        const { products } = shoppingCart;

        for await (const prod of products) {

            let newProd = await PROD_DAO.getProduct(configId(prod));

            newProd.quantity = prod.quantity;

            newProds.push(newProd);

        };

        shoppingCart.products = newProds;

        return shoppingCart;

    };

    async addShoppingCart (shoppingCart) {

        await this.#persistence.save(shoppingCart);

    };

    async addProductToShoppingCart (shoppingCart, productToAdd) {

        const EXISTS = shoppingCart
                            .products
                            .find(
                                prod => 
                                    configId(prod) === configId(productToAdd)
                            );

        let id = configId(shoppingCart);

        if (EXISTS) {

            let fieldsToUpdate, optionsUpdate;

            switch (CONFIG.mode) {

                case "dev":
                case "prod":

                    const NEW_QTY = productToAdd.quantity + EXISTS.quantity;

                    fieldsToUpdate = {
                        "products.$[prod].quantity": NEW_QTY
                    };
                    optionsUpdate = {

                        arrayFilters: [{
                            "prod.id": {
                                $eq: configId(EXISTS)
                            }
                        }]

                    };

                break;

                default:

                    const 

                    NEW_PRODS = [ ...shoppingCart.products ],
                    INDEX     = NEW_PRODS.findIndex(item => item.id === EXISTS.id);

                    EXISTS.quantity = EXISTS.quantity + productToAdd.quantity;
                    NEW_PRODS[INDEX] = EXISTS;

                    fieldsToUpdate = { products: NEW_PRODS };

                break;

            };

            return await this.#persistence
                            .patchOne(

                                id,
                                fieldsToUpdate, 
                                !DEFAULT_MODE && optionsUpdate

                            );
                            
        } else {

            const { products } = shoppingCart;

            products.push(productToAdd);

            switch (CONFIG.mode) {

                case "prod":
                case "dev":

                    return await this.#persistence
                                        .updateOne(
                                            id,
                                            { products }
                                        );
                default:

                    return await this.#persistence
                                        .patchOne(
                                            id,
                                            { products }
                                        );

            };

        };

    };

    async findByShoppingCartProp (prop, error) {

        const

        KEY   = getKey(prop, 0),
        VALUE = getValue(prop, 0),
        QUERY = { [KEY]: VALUE };

        return await this.#persistence.findByProp(QUERY, { filter: false, error });

    };

    async deleteProductFromShoppingCart (shoppingCart, idProd) {

        const EXISTS = shoppingCart
                        .products
                        .find(
                            prod =>
                                configId(prod) === idProd
                        );

        if (!EXISTS) throw new ErrIDNotFound(idProd);

        let id = configId(shoppingCart), fieldsToUpdate;

        switch (CONFIG.mode) {

            case "dev":
            case "prod":

                fieldsToUpdate = { 
                    $pull: {
                        products: { id: configId(EXISTS) }
                    }
                };

                return await this
                                .#persistence
                                .deleteOne(
                                    id,
                                    fieldsToUpdate
                                );

            default:

                const 
                    
                { products } = shoppingCart,
                INDEX = products.findIndex(prod => prod.id === idProd);

                products.splice(INDEX, 1);

                fieldsToUpdate = { products };

                return await this
                                .#persistence
                                .patchOne(
                                    id,
                                    fieldsToUpdate
                                );

            break;

        };

    };

    async emptyShoppingCart (shoppingCart) {

        let id = configId(shoppingCart), fieldsToUpdate;

        switch (CONFIG.mode) {

            case "dev":
            case "prod":

                fieldsToUpdate = { products: [] };

            break;

            default:
            
                const { products } = shoppingCart;
                
                products.length = 0;

                fieldsToUpdate = { products };

            break;

        };

        await this.#persistence
                    .patchOne(
                        id,
                        fieldsToUpdate
                    );

    };

};