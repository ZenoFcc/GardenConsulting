const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');
var mongoose = require('mongoose');

var port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const uri = "mongodb+srv://stage:stage@cluster0-olz9g.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true}) //connection a la db
const connection = mongoose.connection    //creation de l'objet connexion
connection.once('open', () => {
    console.log("Connexion a la db ok")
    }
);


const usersRouter = require('./routes/users')
const google = require('./routes/google')

app.use('/users', usersRouter)
app.use('/google', google)

app.listen(port, () => {
    console.log('Server connect to :',port)
});
