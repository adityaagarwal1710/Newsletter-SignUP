//fshint esversion:6

const express=require("express");
const app=  express();
const bodyParser=require("body-parser");
const https=require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");

})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

    var firstName=req.body.fn;
    var lastName=req.body.ln;
    var email=req.body.e;

    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);
const url ="https://us2.api.mailchimp.com/3.0/lists/eea4cc151b"
const options = {
  method: "POST",
  auth: "aditya:af2e5d2ccfef3bf0a071e3ee6ed2ef56-us2"
}; 


const request=https.request(url,options,function(response){

        if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
        }
        else{
        res.sendFile(__dirname+"/failure.html");
        }
    response.on("data",function(data){
        console.log(JSON.parse(data));
        
    });
    });

    request.write(jsonData);
    request.end();


});

//uniqueId
//eea4cc151b
//apiKey
//af2e5d2ccfef3bf0a071e3ee6ed2ef56-us2

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Port creted on 3000 and is running");
})