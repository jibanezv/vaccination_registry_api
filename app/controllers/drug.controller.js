const db = require("../models");
const Drug = db.drug;

exports.registerDrug = (req, res) => {
    // Drug already exist?
    Drug.findOne({
        where: {
            name: req.body.name
        }
    }).then(drug => {
        if (drug) {
            res.status(400).send({
                message: "Failed! Drug exists!"
            });
            return;
        } else {
            // Save Drug to Database
            if (req.body.name.length < 1 || req.body.name == "") {
                res.status(400).send({
                    message: "Failed! Must indicate a name for the drug!"
                });
                return;
            } else {
                Drug.create({
                    name: req.body.name,
                    approved: req.body.approved,
                    min_dose: req.body.min_dose,
                    max_dose: req.body.max_dose,
                    available_at: req.body.available_at
                })
                    .then(drug => {
                        res.send({message: "Drug was registered successfully!"});

                    })
                    .catch(err => {
                        res.status(500).send({message: err.message});
                    });
            }
        }
    });
};

exports.updateDrug = (req, res) => {
    // Drug already exist?
    Drug.findOne({
        where: {
            id: req.params.id
        }
    }).then(drug => {
        if (!drug) {
            res.status(400).send({
                message: "Failed! Drug doesn't exists!"
            });
            return;
        } else {
            // Save Drug to Database
            Drug.update({
                    name: req.body.name,
                    approved: req.body.approved,
                    min_dose: req.body.min_dose,
                    max_dose: req.body.max_dose,
                    available_at: req.body.available_at
                },
                {
                    where: {
                        id: req.params.id
                    }
                })
                .then(drug => {
                    res.send({message: "Drug was updated successfully!"});

                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        }
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.getDrugs = (req, res) => {
    // Drugs exist?
    Drug.findAll()
        .then(drugs => {
            if (!drugs) {
                res.status(400).send({
                    message: "Failed! Not drugs found!"
                });
                return;
            } else {
                // Return Drugs
                res.send({message: drugs});
            }
        });
};

exports.deleteDrug = (req, res) => {
    // Drug already exist?
    Drug.findOne({
        where: {
            id: req.params.id
        }
    }).then(drug => {
        if (!drug) {
            res.status(400).send({
                message: "Failed! Drug doesn't exists!"
            });
            return;
        } else {
            // Delete drug from database
            Drug.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(() => {
                    res.send({message: "Drug was deleted successfully!"});

                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        }
    })
};