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
    google : {
        type : String,
        default : ''
    }
});
const User = mongoose.model('User', UserSchema);    //creation de l'objet User pour l'utiliser les 3 bails
module.exports = User; //exporter pour l'utiliser dans d'autre fichier
