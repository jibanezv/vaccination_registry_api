const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            res.send({message: "User was registered successfully!"});

        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            let token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 300 // 5 minutes
            });

            res.status(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};