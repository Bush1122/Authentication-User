const express = require('express');
const app =express();
const UserModel =require('./model/user')
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken');

const cookieParser = require (`cookie-parser`);
const path = require('path')

app.set("view engine" ,"ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get("/" ,function(req,res){
    res.render('index')
})

app.get("/login" ,function(req,res){
    res.render('login')
})

app.post("/login" , async function(req,res){
    let user = await UserModel.findOne({email: req.body.email})
    if(!user){return res.send("something wrong")}
     else{
        bcrypt.compare(req.body.password , user.password, function (err , result){
            if(!result){
                console.log("Wellcome to over home page" );
            }else{

                console.log("try again" );
            }
           

        })
       
        res.redirect('/')
     }
})






app.post("/create" ,  function(req,res){
    let {name , username ,email , password } = req.body


    bcrypt.genSalt(10,function( err ,salt){
        bcrypt.hash("password" , salt , async function( err,hash){
            let createuser = await UserModel.create({

                name,
                username,
                email,
                password: hash ,
            })
            let token =jwt .sign({email: "smileforbushi@gmail.com"} , "BushraYousaf");
            res.cookie("token" ,token )
            res.send('createuser')
           
        })
    })

   
})

app.get("/logout" , function(req ,res){
    res.cookie('token' , '');
    res.redirect("/")

})



app.listen(3000);

