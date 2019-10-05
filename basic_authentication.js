var raw_input = require('readline-sync').question
express = require("express")
var app = express();
var fs = require("fs");
var body = require("body-parser");
app.use(body.json())

app.post("/post/sign-up",function (req,res){
    var userData = {
        name:req.body.name,
        email:req.body.email,
        mb:req.body.mb,
        password:req.body.password
    }

    var data =fs.readFileSync("registration.json")
    data = data.toString();
    var Data = JSON.parse(data)
    if (req.body.password.length<6 || req.body.password.length>15){
            res.end("wrong password")
        }
    for (index in Data){
        if(Data[index].email===req.body.email){
            return res.send("already exists")
            
        }
    }
    userData.id = Data.length+1;
    Data.push(userData)
    fs.writeFileSync("registration.json",JSON.stringify(Data,null,2))
        res.json(Data);
        res.end();

})
app.get("/get/login/:email/:password")
app.listen(4000, () => console.log('server is listening 4000....'));

