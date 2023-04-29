import ErrAdmin from "../models/errors/error_admin.js";

export function isAdmin (req, res, next) {

    const USER = req.user;

    if (USER.role !== "Admin") throw new ErrAdmin();

    next();

};