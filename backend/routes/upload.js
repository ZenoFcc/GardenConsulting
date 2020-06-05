const express = require('express');
const router = express.Router();
const User = require('../models/User');
const axios = require('axios');
const cors = require('cors');
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

router.use(cors());

let id;

router.post("/catchId", (req, res) => {
    id = req.body.id;
    if (id) {
        res.status(200).send({
            message : "Good id"
        })
    }
    else
        res.status(400).send();
})

function parseCsv(csv) {
    fs.createReadStream(csv)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log(results);
            // [
            //   { NAME: 'Daffy Duck', AGE: '24' },
            //   { NAME: 'Bugs Bunny', AGE: '22' }
            // ]
        })
}

router.post("/uploadFile", (req, res) => {
    const id = req.body.id
    User.findById(id)

})