export function buildCnxStrDev (cnx, user, pass) {

    const

    FIRST_I        = cnx.indexOf("l"),
    FIRST_CNX_STR  = cnx.substring(0, FIRST_I) + user,
    NEW_PASS       = encodeURIComponent(pass),
    SECOND_CNX_STR = `${FIRST_CNX_STR}:${NEW_PASS}@${cnx.substring(FIRST_I)}`;

    return SECOND_CNX_STR;

};