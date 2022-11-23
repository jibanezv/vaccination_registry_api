const {authJwt} = require("../middleware");
const controller = require("../controllers/drug.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Drugs Routes
    app.post("/api/drugs", [authJwt.verifyToken], controller.registerDrug);
    app.put("/api/drugs/:id", [authJwt.verifyToken], controller.updateDrug);
    app.get("/api/drugs", [authJwt.verifyToken], controller.getDrugs);
    app.delete("/api/drugs/:id", [authJwt.verifyToken], controller.deleteDrug);

};