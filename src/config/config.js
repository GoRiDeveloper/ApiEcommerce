import { config } from "dotenv";
import ErrCouldNotGet from "../server/models/errors/error_could_not_get.js";

config({ path: ".env" });

const 

CONFIG = {

    mode:              process.env.MODE,
    port:              parseInt(process.env.PORT),
    cnxStrDev:         process.env.CNX_STR_LOCAL,
    cnxStrProd:        process.env.CNX_STR_REMOTE,
    mDBLocalUser:      process.env.USER_ADMIN_MDB_LOCAL,
    mDBLocalPass:      process.env.PASS_ADMIN_MDB_LOCAL,
    dbName:            process.env.DB_NAME,
    jwtSecret:         process.env.JWT_SECRET,
    salt:              parseInt(process.env.SALT),
    adminEmail:        process.env.ADMIN_EMAIL,
    configEmail: {

        service: "gmail",
        port: 587,
        auth: {

            user:      process.env.ADMIN_EMAIL,
            pass:      process.env.PASS_EMAIL

        }

    },
    collections: {

        admin:         process.env.COLLECTION_ADMIN,
        users:         process.env.COLLECTION_USERS,
        products:      process.env.COLLECTION_PRODUCTS,
        shoppingCarts: process.env.COLLECTION_SHOPPING_CARTS,
        orders:        process.env.COLLECTION_ORDERS

    },
    files: {

        admin:         process.env.FILE_ADMIN,
        users:         process.env.FILE_USERS,
        products:      process.env.FILE_PRODUCTS,
        shoppingCarts: process.env.FILE_SHOPPING_CARTS,
        orders:        process.env.FILE_ORDERS

    }

},    

DEFAULT_MODE = (

    (CONFIG.mode !== "prod") && 
    (CONFIG.mode !== "dev")
    
),
DEV_MODE = CONFIG.mode === "dev";

function configId (element) {

    if (!element) throw new ErrCouldNotGet();
    if (!DEFAULT_MODE && Object.keys(element).includes("_id")) 
        return element._id;

    return element.id;

};

export {

    CONFIG, 
    DEV_MODE,
    DEFAULT_MODE,
    configId

};