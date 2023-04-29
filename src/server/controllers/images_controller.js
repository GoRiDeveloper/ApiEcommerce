import ErrorCouldNotGet from "../models/errors/error_could_not_get.js";

export function controllerImages (req, res) {

    if (!req.file) throw new ErrorCouldNotGet();

    res.status(201).json({ imgPath: req.file.path });

};