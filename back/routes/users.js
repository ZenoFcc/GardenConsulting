const express = require("express");
const router = express.Router();
const cors = require("cors");
const User = require("..models/User");
const jwt = require("jsonwebtoken");

router.use(cors());

router.post("/register", (req, res) => {
    const name = req.body.name;
    let email = req.body.email;
    const password = req.body.password;

    if (!name) {
        return res.send({
            success: false
        })
    }
    if (!email) {
        return res.send({
            success: false
        })
    }
    if (!password) {
        return res.send({
            success: false
        })
    }

    email = email.toLowerCase();
    user.findOne({email: email}, (err, user) => {
        if (err) {
            return res.send({
                success:false,
                status:400,
                message:"erreur de mail"
            });
            console.log("erreur coté serveur");
        }
        if (user) {
            return res.send({
                success:false,
                status:400,
                message:"utilisateur déjà existant"
            });
            console.log("utilisateur déjà existant !");
        }
        const newUser = new User({name, email, password});
        newUser.save((err, user) => {
            if (err)
                res.send({
                    success:false,
                    status:400,
                    message:"erreur serveur"
                });
            res.send({
                success:false,
                status:400,
                message: "utilisateur enregistré"
            })
        })
    })
})

router.post("/login", (req, res) => {
    password = req.body.password;
    email = req.body.email;
    User.findOne({email: email})
        .then(user => {
            if (user) {
                if (password === user.password) {
                    const payload = {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }
                }
            }
        })
})

module.exports = router;