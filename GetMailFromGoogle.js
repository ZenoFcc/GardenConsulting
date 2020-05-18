
app.get('/', function(req, res) {
     //REQUEST LIST MAIL

    let API_KEY = "";
    let userId = `thibaut.de.lignerolles%40gmail.com`;
    let url = `https://www.googleapis.com/gmail/v1/users/` + userId + `/messages?includeSpamTrash=true&q=is%3Aunread&key=` + API_KEY;
  
    request(url, function (err, response, body) {  
    if(err){
        res.sendStatus(400);
    } 
    else {
        const obj = JSON.parse(body);
        console.log(obj.messages[0]);

        let i = 0;

        while (obj.messages[i]){
             //REQUEST MAIL

            console.log(obj.messages[i]);
            let mail_id = obj.message[i].id;           

            app.get('/', function(req, res) {
                let url = `https://www.googleapis.com/gmail/v1/users/` + userId + `/messages/` + mail_id + `?format=full&key=` + API_KEY;
                
                request(url, function (err, response, body) {  
                if(err){
                    res.sendStatus(400);                
                } 
                else {

                    const datamail = JSON.parse(body);

                    //PARSING


                    console.log(datamail);
                    res.sendStatus(200);     //FIN REQUETE MAIL         
                }
                })

            });
            i++;
        }
        res.sendStatus(200); //FIN REQUETE MAIL LIST
    }
    })
});
