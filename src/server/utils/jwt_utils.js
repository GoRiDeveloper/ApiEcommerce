import jwt from "jsonwebtoken";
import { CONFIG } from "../../config/config.js";

export function encryptToken (data) {

    const NEW_DATA = { ...data };
    return jwt.sign(NEW_DATA, CONFIG.jwtSecret, { expiresIn: "1d" });

};

export const decryptToken = (token) => jwt.verify(token, CONFIG.jwtSecret);