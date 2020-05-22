let mongoose = require('mongoose');         //schema d'organisation de notre base de donnée mongodb
let UserSchema = new mongoose.Schema({
    name: {                                 //name ta capte
        type: String,
        required: true,
        default: ''
    },
    email: {                                //email ta capte
        type: String,
        required: true,
        default: ''
    },
    password: {                             //password ta capte
        type: String,
        required: true,
        default:''
    },
    reddit: {
        type : String,
        default:''
    },
    discord : {
        type : String,
        default:''
    },
    github : {
        type : String,
        default: ''
    },
    slack : {
        type : String,
        default : ''
    },
    dropbox : {
        type : String,
        default : ''
    },
    google : {
        type : String,
        default : ''
    },
    spotify : {
        type : String,
        default : ''
    },
    Area : [{type: String,
        default : ''
    }]
});
const User = mongoose.model('User', UserSchema);    //creation de l'objet User pour l'utiliser les 3 bails
module.exports = User; //exporter pour l'utiliser dans d'autre fichier
