import { MongoClient } from "mongodb";
import { CONFIG, DEV_MODE } from "../../config.js";
import { buildCnxStrDev } from "../../../server/utils/build_cnx_string.js";
import ErrDB from "../../../server/models/errors/error_db.js";

let cnxStr, mdbClient, mongoDB;

try {

    DEV_MODE
        ? cnxStr = buildCnxStrDev(CONFIG.cnxStrDev, CONFIG.mDBLocalUser, CONFIG.mDBLocalPass)
        : cnxStr = CONFIG.cnxStrProd;

    DEV_MODE
        ? mdbClient = await new MongoClient(cnxStr, { authSource: "admin" }).connect()
        : mdbClient = await new MongoClient(cnxStr).connect();

    if (mdbClient) mongoDB = mdbClient.db(CONFIG.dbName);
    if (!mongoDB) throw new ErrDB("Could don't connect.");
        
} catch (e) {
        
    throw new ErrDB(e);

};

export default mongoDB;