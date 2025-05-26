const express = require("express");
const app = express();
let port = 8080;
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(session(
    {secret:"mysecretcode",
    resave:false,
    saveUninitialized:true,
}));
app.use(flash());
app.get("/test",(req,res)=>{
    res.send("test successful");
});

app.get("/register",(req,res)=>{
    let {name = "anonyomous"} = req.query;
    req.session.name = name;
    if(name === "anonyomous"){
        req.flash("error","user not registered");
    }else{
        req.flash("success","user registered successfully");
    }
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.locals.smsg = req.flash("success");
    res.locals.emsg = req.flash("error");
    res.render("page.ejs",{name:req.session.name});
});

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`no. of times req sent ${req.session.count}`);
// });

app.listen(port,()=>{
    console.log("listening...");
});