export function controllerGetUser (req, res) {

    const USER = req.user;
    res.status(200).json(USER);

};

export function controllerPostUser (req, res) {

    const TOKEN = req.user;
    res.set("authorization", TOKEN).status(201).json({ Message: "You have sign up." });

};