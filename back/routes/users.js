const express = require("express");
const router = express.Router();
const cors = require("cors");
const User = require("..models/User");
const bcrypt = require("bcryptjs")

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
                success: false,
                status: 400,
                message: "erreur de mail"
            });
            console.log("erreur coté serveur");
        }
        if (user) {
            return res.send({
                success: false,
                status: 400,
                message: "utilisateur déjà existant"
            });
            console.log("utilisateur déjà existant !");
        }
        const salt = bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                const newUser = new User({name, email, hash});
                newUser.save((err, user))
                if (err)
                    res.send({
                        success: false,
                        status: 400,
                        message: "erreur serveur"
                    });
                res.send({
                    success: false,
                    status: 400,
                    message: "utilisateur enregistré"
                })
            })
        })
    })
});
/*        const newUser = new User({name, email, password});
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
})*/

router.post('/login', (req, res) => {
    password = req.body.password;
    email = req.body.email;
    User.findOne({email: email})
        .then(user => {
            if (user) {
/*                const hash = user.password.toString();
                bcrypt.compare(password, hash, function(err, res) {
                    if (res === true) {
                        return user;
                    }
                })*/
                if (password === user.password) {
                    const payload = {
                        _id: user._id,
                        name : user.name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, config.secret, {expiresIn: 86400}); //création du token
                    res.status(200).send({
                        token: token
                    });
                }
                else                                    //sinon ta un mauvais mdp
                    res.status(400).send({
                        success:false,
                        message:"Failed to connect"
                    })
            }
            else if (!user) {                           //sinon ton email n'existe pas
                res.status(400).send({
                    success: false,
                    message: "User doesn't exist"
                })
            }
        })
        .catch(err => {                     //condition d'erreur pour eviter de timeout pendant la requete
            res.status(400).send({
                success:false,
                message:"Error"
            })
        })
});
