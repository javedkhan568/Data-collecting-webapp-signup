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



// fc2e2d6ba23c28e6d147f646278b58f4-us13 apikey
// audiance id or list id 3b1154421b.


// const express = require("express");
// const bodyParser = require("body-parser");
// const request = require("request");
// const client = require("@mailchimp/mailchimp_marketing");
 
// const app = express();
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
 
// //this line keep the CSS for the signup.html working somehow
// //I am using Bootstrap 5
// app.use(express.static(__dirname));
 
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/signup.html");
// })
 
// app.post("/", function(req, res) {
 
//   var firstName = req.body.firstName;
//   var lastName = req.body.lastName;
//   var email = req.body.email;
 
//   client.setConfig({
//     apiKey: "YOUR APIKEY",
//     server: "YOUR Server , the part after  '-' in your APIKEY ",
//   });
 
//   const run = async () => {
//     const response = await client.lists.batchListMembers("YOUR LIST ID",           {
//       members: [{
//         email_address :email,
//         status : "subscribed",
//         merge_fields: {
//                FNAME: firstName,
//                LNAME: lastName
//              }
//       }],
//     });
//     console.log(response);
//   };
//   run();
// })
 
 
// app.listen(3000, function() {
//   console.log("server is up and running on port 3000.");
// })




