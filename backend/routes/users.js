const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
var config = require('./config');

router.use(cors());

router.post('/register',(req, res) => {
    const name = req.body.name;         //recuperation  du name input
    let email = req.body.email;         //recuperation de l'email
    const password = req.body.password;     //recuperation du password

    if (!name) {                            //check si il y a un nom
        return res.send({
            success: false
        })
    }
    if (!email) {                           //check si il y a un email
        return res.send({
            success: false
        })
    }
    if (!password) {                        //check si il y a un password
        return res.send({
            success: false
        })
    }

    email = email.toLowerCase();            //mettre en lowercase l'email
    User.findOne({email: email}, (err, user) => {           //utilisationj de la fonction FindOne pour trouver si l'email est deja existant
        if (err) {                                          //catch une err
            return res.send({
                success:false,
                status:400,
                message:'pas reussi a chercher email'
            });
            console.log("server error damn");
        }
        if (user) {                                         //si findOne trouve un email, on renvoie utilisateur deja existant
            return res.send({
                success:false,
                status:400,
                message:'utilisateur deja existant'
            });
            console.log("user already exist");
        }
        const newUser = new User({name, email, password});          //on stock les info dans NewUser
        newUser.save((err, user)=> {                        //la fonction save permet de sauvegarder les donnée dans la base de donné
            if (err)
                res.send({
                    success:false,
                    status:400,
                    message: 'Error du server'
                });
            res.send({
                success:true,
                status:200,
                message:'enregistré'
            })
        })
    })
});

router.post('/login', (req, res) => {           //route vers le login
    password = req.body.password;               //recuperation de l'input password
    email = req.body.email;                     //recuperaton de l'input email
    User.findOne({email: email})                //findOne permet de trouver le PREMIER email dans la db
        .then(user => {                 //promesse si ca marche
            if (user) {                         //si il trouve
                if (password === user.password) {   //comparaison pour voir si le mdp est e//création du contenu des information dans le token
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

router.get('/UserPage', (req, res) => {
    var decode = jwt.verify(req.headers['x-access-token'], config.secret);
    User.findOne({
        _id: decode._id,
        prenom : decode.prenom,
        nom : decode.nom,
        email: decode.email

    })
        .then(user => {
            if (user) {
                res.json(user)
            }
            else {
                res.status(400).send({message : "User doesn't exist"});
            }
        })
        .catch(err => {
            res.status(400).send({message : "error from the server"});
        })
})

router.post('/showArea', (req, res) => {
    const id = req.body.id;
    console.log(id);
        User.findById(id)
        .then(user => {
            console.log(user.Area);
            res.send(user.Area);
        })
            .catch(err => console.log(err))

})

module.exports = router;


