import { encryptToken } from "./jwt_utils.js";

export const createBearer = (item) => `Bearer ${encryptToken(item)}`;