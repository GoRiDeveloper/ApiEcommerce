export function controllerPostAuth (req, res) {

    const TOKEN = req.user;
    res.set("authorization", TOKEN).status(200).json({ Message: "You have sign in." });
    
};