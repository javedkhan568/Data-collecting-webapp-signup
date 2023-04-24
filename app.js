//jshint esversion : 6
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request"); 
const https = require("https");
const { response } = require("express");
const client = require("@mailchimp/mailchimp_marketing");





 const app = express();
 app.use(express.static("public"));
 app.use(bodyparser.urlencoded({extended:true}));
 app.get("/",  function(req,  res){
 res.sendFile( __dirname  +  "/signup.html");
});


app.post("/" , function (req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
   
   
   
   
    client.setConfig({
        apiKey: "a96ca9e5bbcd277b6bae7ec2088daa7d-us13",
        server: "us13",
      });

     

      const run = async () => {
        const response = await client.lists.batchListMembers("3b1154421b", 
        {  

          members: [{
            email_address :email,
            status : "subscribed",
            merge_fields: {
                   FNAME: firstName,
                   LNAME: lastName 
                 }
          }],
          




        });
        console.log(response);
        
        
      };
      run();
      
      
      if  (response.statusCode ==200 ){
        res.sendFile(__dirname + "/sucess.html");
     } else {
        res.sendFile(__dirname + "/failure.html");
     };
    



      
    });

    
   app.post("/failure" , function(req,res){
    res.redirect("/");

 });
    app.post("/sucess" , function(req,res){
        res.redirect("/");

   });

   
      



app.listen(process.env.PORT || 3000, function(){
console.log ("server is running on port 3000");
});






