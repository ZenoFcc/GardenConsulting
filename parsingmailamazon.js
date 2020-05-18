const fs = require('fs')

fs.readFile('./amazonmail', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})

Object.factureAmazon = {
    Price = 0,
    Name = "",
    ID = "",
    Date = ""
};

function setprice (price){
    factureAmazon.Price = price.substring(36);
    console.log("Price found: " + factureAmazon.Price);
    return (true);
};

function setdate (date) {
    factureAmazon.Date = date.substring(13);
    console.log("Date found: " + factureAmazon.Date);
    return (true);
};

function setname () {
    
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('file.in')
  });
  
  lineReader.on('line', function (line) {
    if (line.includes("Montant total de la commande :"))
        setprice(line);
    if (line.includes("Effectuée le "))
        setdate(line);
    /*if (line.includes("Montant total de la commande :"))
        setname(line);*/

    console.log('Line from file:', line);
  });

//Chercher Prix (Ligne ou se trouve "Montant total de la commande :")

//Chercher Nom (ligne après ou se trouve "Effectuée le 9 avril 2020")

//Chercher Date (ligne ou se trouve "Effectuée le 9 avril 2020")