const errorTypes = {

    idNotFound: "ID_NOT_FOUND",
    passRequired: "PASSWORDS_REQUIRED",
    passNeeded: "PASSWORD_NEEDED",
    notInfo: "COULD_NOT_GET_INFO",
    notSaved: "NOT_SAVED",
    notRead: "COULD_NOT_READ",
    notAnObject: "NOT_AN_OBJECT",
    notAnArray: "NOT_AN_ARRAY",
    noData: "THERE_IS_NO_DATA",
    notAdmin: "YOU_ARE_NOT_ADMIN",
    notFoundByProps: "NOT_FOUND_BY_PROPERTIES",
    failUpdate: "NOT_UPDATED",
    failDelete: "NOT_DELETE",
    failSend: "FAIL_SEND",
    userExists: "USER_ALREADY_EXISTS",
    productExists: "PRODUCT_ALREADY_EXISTS",
    weakPass: "WEAK_PASS",
    wrongPass: "WRONG_PASS",
    userPassNeeded: "USER_AND_PASS_NEEDED",
    needAuth: "NEED_AUTH",
    emptyField: "EMPTY_FIELD",
    alphabetic: "MUST_BE_ALPHABETIC",
    invalidUrl: "URL_INVALID",
    invalidEmail: "EMAIL_INVALID",
    intInvalid: "INT_INVALID",
    invalidNumber: "INVALID_NUMBER",
    dbError: "ERROR_CONNECTING_DATABASE",
    invalidIndex: "INVALID_INDEX",
    orderEmpty: "YOUR_ORDER_CANNOT_BE_EMPTY"

};

export function errorHandler (error, req, res, next) {

    switch (error.type) {

        case errorTypes.notSaved:
            res.status(502)
        break;

        case errorTypes.dbError:
        case errorTypes.notRead:
        case errorTypes.notInfo:
        case errorTypes.failSend:

            res.status(500)

        break;

        case errorTypes.notFoundByProps:
        case errorTypes.idNotFound:

            res.status(404)

        break;

        case errorTypes.notAdmin:
            res.status(403)
        break;

        case errorTypes.needAuth:
            res.status(401)
        break;
        
        case errorTypes.userPassNeeded:
        case errorTypes.productExists:
        case errorTypes.invalidNumber:
        case errorTypes.passRequired:
        case errorTypes.invalidEmail:
        case errorTypes.invalidIndex:
        case errorTypes.notAnObject:
        case errorTypes.notAnArray:
        case errorTypes.passNeeded:
        case errorTypes.failUpdate:
        case errorTypes.failDelete:
        case errorTypes.userExists:
        case errorTypes.emptyField:
        case errorTypes.invalidUrl:
        case errorTypes.intInvalid:
        case errorTypes.orderEmpty:
        case errorTypes.wrongPass:
        case errorTypes.weakPass:

            res.status(400)

        break;

        case errorTypes.noData:
            res.status(200)
        break;

        default:
            res.status(500)
        break;

    };

    res.json({ Error: error.message });

};