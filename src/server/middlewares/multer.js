import multer from "multer";

const 

storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "./public/img")
    },
    filename: function (req, file, cb) {
        const FIELD_NAME = `${Date.now()}-img-${file.fieldname}-${file.originalname}`;
        cb(null, FIELD_NAME)
    }

});

export const uploadFile = multer({ storage }).single("picture");