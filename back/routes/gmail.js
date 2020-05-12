const express = require('express');
const router = express.Router();
const axios = require('axios');
const cors = require('cors');
const User = require('../models/User');
router.use(cors());

router.post('/catchId', (req, res) => {
    id = req.body.id;
    if (id) {
        res.status(200).send({
            message : "Good id"
        })
    }
    else {
        res.status(400).send();
    }
})

router.get('/oauth2/redirect', async (req, res) => {
    const { query } = req;
    const { code } = query;
    console.log("----" + code);
    const Redirect_URI = "http://localhost:4000/google/oauth2/redirect";
    const clientID = "";
    const clientSecret = "";

    axios({
        method: 'post',
        url: "https://oauth2.googleapis.com/token",
        data: {
            grant_type:'authorization_code',
            code:code,
            redirect_uri:Redirect_URI,
            client_id:clientID,
            client_secret:clientSecret
        },
        headers: {
            accept: 'application/x-www-form-urlencoded'
        }
    }).then((response) => {
        const accessToken = response.data.access_token;
        console.log("--- access ->" + accessToken);
        User.update({ _id:id}, {google : accessToken}, function(err, doc) {
            if (err)
                res.status(400).send({message : "sorry"});
            res.redirect("http://localhost:3000/Home");
        });
    }).catch((error) => console.log(error));

});

router.post('/checkTokken', (req, res) => {
    let i_d = req.body.id;
    if (!i_d) {
        res.status(400).send({
            message : "no tokken"
        })
    }
    User.findById(i_d)
        .then(user => {
            if (user.google) {
                res.status(200).send({
                    message : "CONTENT EXIST"
                })
            }
            if (!user.google) {
                res.status(400).send({
                    message : "dont exist tah la peuta"
                })
            }

        })
        .catch(err => console.log(err))

})