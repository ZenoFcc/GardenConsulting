const express = require("express");
const app = express();
var cors = require("cors");
var mongoose = require("mongoose");

var port = process.env.PORT || 8080;

app.use(express.urlencoded({ extends: true}));
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://gardenConsulting:zAT7o8Qe6UOVv0kA@cluster0-2xjgu.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connexion à la db ok");
    }
);

app.listen(port, () => {
    console.log("Server connect to :", port);
});