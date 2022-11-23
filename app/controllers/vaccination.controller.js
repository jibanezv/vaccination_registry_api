const db = require("../models");
const Vaccination = db.vaccination;
const Drug = db.drug;
const moment = require('moment');

exports.registerVaccination = (req, res) => {
    // Vaccination already exist?
    Vaccination.findOne({
        where: {
            name: req.body.name, drug_id: req.body.drug_id, dose: req.body.dose
        }
    }).then(vaccination => {
        if (vaccination) {
            res.status(400).send({
                message: "Failed! Vaccination registry exists!"
            });
            return;
        } else {
            Drug.findOne({
                where: {
                    id: req.body.drug_id
                }
            }).then(drug => {
                // Validating drug existence
                if (!drug) {
                    res.status(400).send({
                        message: "Failed! Drug doesn't exists!"
                    });
                    return;
                } else {
                    // Validating dose
                    if (drug.max_dose < req.body.dose || req.body.dose < 1) {
                        res.status(400).send({
                            message: "Failed! Dose over limits!"
                        });
                        return;
                    } else {
                        // Drug is approved?
                        if (!drug.approved) {
                            res.status(400).send({
                                message: "Failed! Drug isn't approved yet!"
                            });
                            return;
                        } else {
                            // Validating vaccination date format
                            let vacDate = req.body.date.split(" ");
                            let resultDate = moment(vacDate[0], 'YYYY/MM/DD', true).isValid();
                            let resultHour = moment(vacDate[1], 'HH:mm:ss', true).isValid();
                            let dateParsed = new Date(req.body.date);

                            if (resultDate == false || resultHour == false) {
                                res.status(400).send({
                                    message: 'Failed! invalid date format. Must be: YYYY/MM/DD HH:mm:ss'
                                });
                                return;
                            } else {
                                // Validating date vs available_at
                                if (drug.available_at > dateParsed) {
                                    res.status(400).send({
                                        message: "Failed! Date is lower than approved!"
                                    });
                                    return;
                                } else {
                                    if (req.body.name.length < 1 || req.body.name == "") {
                                        res.status(400).send({
                                            message: "Failed! Must indicate a name for the patient!"
                                        });
                                        return;
                                    } else {
                                        // Save Vaccination Date to Database
                                        Vaccination.create({
                                            name: req.body.name,
                                            drug_id: req.body.drug_id,
                                            dose: req.body.dose,
                                            date: req.body.date
                                        }).then(vaccination => {
                                            res.send({message: vaccination});

                                        }).catch(err => {
                                            res.status(500).send({message: err.message});
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }).catch(err => {
                res.status(500).send({message: err.message});
            });
        }
    });
};

exports.updateVaccination = (req, res) => {
    // Vaccination already exist?
    Vaccination.findOne({
        where: {
            id: req.params.id
        }
    }).then(vaccination => {
        if (!vaccination) {
            res.status(400).send({
                message: "Failed! Vaccination registry exists!"
            });
            return;
        } else {
            Drug.findOne({
                where: {
                    id: req.body.drug_id
                }
            }).then(drug => {
                // Validating drug existence
                if (!drug) {
                    res.status(400).send({
                        message: "Failed! Drug doesn't exists!"
                    });
                    return;
                } else {
                    // Validating dose
                    if (drug.max_dose < req.body.dose || req.body.dose < 1) {
                        res.status(400).send({
                            message: "Failed! Dose over limits!"
                        });
                        return;
                    } else {
                        // Drug is approved?
                        if (!drug.approved) {
                            res.status(400).send({
                                message: "Failed! Drug isn't approved yet!"
                            });
                            return;
                        } else {
                            // Validating vaccination date format
                            let vacDate = req.body.date.split(" ");
                            let resultDate = moment(vacDate[0], 'YYYY/MM/DD', true).isValid();
                            let resultHour = moment(vacDate[1], 'HH:mm:ss', true).isValid();
                            let dateParsed = new Date(req.body.date);

                            if (resultDate == false || resultHour == false) {
                                res.status(400).send({
                                    message: 'Failed! invalid date format. Must be: YYYY/MM/DD HH:mm:ss'
                                });
                                return;
                            } else {
                                // Validating date vs available_at
                                if (drug.available_at > dateParsed) {
                                    res.status(400).send({
                                        message: "Failed! Date is lower than approved!"
                                    });
                                    return;
                                } else {
                                    // Validating patient name
                                    if (req.body.name.length < 1 || req.body.name == "") {
                                        res.status(400).send({
                                            message: "Failed! Must indicate a name for the patient!"
                                        });
                                        return;
                                    } else {
                                        // Update vaccination in database
                                        Vaccination.update({
                                                name: req.body.name,
                                                drug_id: req.body.drug_id,
                                                dose: req.body.dose,
                                                date: req.body.date
                                            },
                                            {
                                                where: {
                                                    id: req.params.id
                                                }
                                            })
                                            .then(vaccination => {
                                                res.send({message: "Vaccination was updated successfully!"});

                                            })
                                            .catch(err => {
                                                res.status(500).send({message: err.message});
                                            });
                                    }
                                }
                            }
                        }
                    }
                }
            }).catch(err => {
                res.status(500).send({message: err.message});
            });
        }
    });
};

exports.getVaccinations = (req, res) => {
    // Vaccinations exist?
    Vaccination.findAll()
        .then(vaccinations => {
            if (!vaccinations) {
                res.status(400).send({
                    message: "Failed! Not drugs found!"
                });
                return;
            } else {
                // Return Vaccinations
                res.send({message: vaccinations});
            }
        });
};

exports.deleteVaccination = (req, res) => {
    // Vaccination already exist?
    Vaccination.findOne({
        where: {
            id: req.params.id
        }
    }).then(vaccination => {
        if (!vaccination) {
            res.status(400).send({
                message: "Failed! Vaccination doesn't exists!"
            });
            return;
        } else {
            // Delete drug from database
            Vaccination.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(() => {
                    res.send({message: "Vaccination was deleted successfully!"});

                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        }
    })
};