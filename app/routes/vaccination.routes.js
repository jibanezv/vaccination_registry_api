const {authJwt} = require("../middleware");
const controller = require("../controllers/vaccination.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Vaccinations Routes
    app.post("/api/vaccination", [authJwt.verifyToken], controller.registerVaccination);
    app.put("/api/vaccination/:id", [authJwt.verifyToken], controller.updateVaccination);
    app.get("/api/vaccination", [authJwt.verifyToken], controller.getVaccinations);
    app.delete("/api/vaccination/:id", [authJwt.verifyToken], controller.deleteVaccination);

};