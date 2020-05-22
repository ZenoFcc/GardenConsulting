const express = require('express');
const router = express.Router();
const axios = require('axios');
const cors = require('cors');
const fetch = require('node-fetch');
const User = require('../models/User');
const { URLSearchParams } = require('url');
let checkOlive = "false";
router.use(cors());

let id;

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
        const Redirect_URI = "http://localhost:8080/google/oauth2/redirect";
        const clientID = "19051343415-ksd0n9n2p1sv74htiekb4ctl9fe0mpj1.apps.googleusercontent.com\n";
        const clientSecret = "RtjgBTLQh2BsJjE3bQwxIhT2\n";

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
                res.redirect("http://localhost:8081/Dashboard");
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

function CheckOlivierMail(token) {
    axios({
        method: 'get',
        url: "https://www.googleapis.com/gmail/v1/users/me/messages",
        headers: {
            Authorization: (`Bearer ${token}`),
            accept: 'application/json'
        }
    })
        .then(response => {
            let a = response.data.messages;
            let stock = a[0];
            let stock1 = stock.id;
            axios({
                method: 'get',
                url: "https://www.googleapis.com/gmail/v1/users/me/messages/" + stock1,
                headers: {
                    Authorization: (`Bearer ${token}`),
                    accept: 'application/json'
                }
            })
            .then(response => {
                let t = response.data.payload.headers;
                let dest = JSON.stringify(t);
                check = dest.includes("<olivier0326@gmail.com>")
                if (check === true) {
                    checkOlive = "true";
                    console.log("Ca rentre ici " + checkOlive);
                }
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

function deleteMail(token) {
    axios({
        method: 'get',
        url: "https://www.googleapis.com/gmail/v1/users/me/messages",
        headers: {
            Authorization: (`Bearer ${token}`),
            accept: 'application/json'
        }
    })
        .then(response => {
            let a = response.data.messages;
            console.log(a);
            let stock = a[0];
            let stock1 = stock.id;
            axios({
                method: 'post',
                url: "https://www.googleapis.com/gmail/v1/users/me/messages/" + stock1 + "/trash",
                headers: {
                    Authorization: (`Bearer ${token}`),
                    accept: 'application/json'
                }
            })
            .then(response => {
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

function deleteMailChane(token) {
    CheckOlivierMail(token);
    console.log("my variable " + checkOlive)
    if (checkOlive === "true") {
        deleteMail(token);
        checkOlive = "false"
    } else {
        console.log("No MAIL");
    }
}

function deleteNormal(token) {
    CheckDeleteEmail(token);
    console.log("message test : " + look)
    if (look === "deleted") {
        deleteMail(token);
        look = "not"
        console.log("MAIL DELETED")
    } else {
        console.log("NO MAIL DELETED");
    }
}

const HistoryId = 1434
let tmp;
let look = "not";
function CheckDeleteEmail(token) {
            axios({
                method: 'get',
                url: "https://www.googleapis.com/gmail/v1/users/me/history",
                params : {
                    startHistoryId: HistoryId,
                    historyTypes: "messageDeleted"
                },
                headers: {
                    Authorization: (`Bearer ${token}`),
                    accept: 'application/json'
                }
            })
                .then(response => {
                    let secondId = response.data.history
                    let check = secondId.length
                    if (tmp === undefined){
                        tmp = check;
                    }
                    if (check > tmp) {
                        tmp = check;
                        look = "deleted";
                        console.log("messageDeleted")
                    }
                    else {
                        look = "not";
                        console.log("no message deleted")
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
}

function sendEmail(token) {
    axios({
        method: 'post',
        url: "https://www.googleapis.com/gmail/v1/users/me/messages/send",
        headers: {
            Authorization: (`Bearer ${token}`),
            accept: 'application/json'
        },
        data : {
            "raw": "RnJvbTogQXJlYSA8bWVAZ21haWwuY29tPg0KVG86IEFyZWEgPG9saXZpZXIwMzI2QGdtYWlsLmNvbT4gDQpTdWJqZWN0OiBTYXlpbmcgSGVsbG8gDQoNClRlc3QgQXJlYSwgQ2hpcmFiIGVzdCBncm9zIA=="
        }
    })
    .then(response => {
        console.log("Email Sent")
    })
    .catch((err) => {
        console.log(err)
    })
}

router.post('/recArea', (req, res) => {
    let action = req.body.action;
    let reaction = req.body.reaction;
    const id = req.body.id;
    let a = "Action";
    let b = "Reaction";

    if (action === undefined || reaction === undefined) {
        res.status(400).send({
            message: "err"
        })
    }
    User.findById(id)
        .then(user => {
            const tokenGmail = user.google;
            if (action === a && reaction === b) {
                res.status(400).send({
                    message : "err"
                });
            }
            if (action === "Chirab") {
                 if (reaction === "Gmail") {
                     const Area = "If Olivier Chane send me an email than delete the last email";
                     user.update( { '$addToSet': { 'Area': Area} })
                         .then(res => {
                             console.log(res);
                             console.log("success")
                         })
                         .catch(err => {
                             console.log("nul");
                         })
                     res.status(200).send();
                     setInterval(deleteMailChane, 3000, tokenGmail);
                 }
            }
            if (action === "mailDelete") {
                if (reaction === "Gmail") {
                    const Area = "If i delete an email than delete the last email";
                    user.update( { '$addToSet': { 'Area': Area} })
                        .then(res => {
                            console.log(res);
                            console.log("success")
                        })
                        .catch(err => {
                            console.log("nul");
                        })
                    res.status(200).send();
                    setInterval(deleteNormal, 3000, tokenGmail);
                }
            }
        })
});

module.exports = router;
