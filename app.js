const express = require("express");
const path=require("path");
const fs = require("fs");
const mongoose=require('mongoose');
const bodyparser =require("body-parser")
const { stringify } = require("querystring");
const app =express();
mongoose.connect('mongodb://localhost/Wander',{useNewUrlParser:true})
const port=96;

var contactSchema=new mongoose.Schema({   
    name:String,
    gender:String,
    email:String,
    number:String
});
var Contact = mongoose.model('Contact', contactSchema);
app.use('/static', express.static('static'));
app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));
app.get('/', (req,res)=>{
    const param={  }
    res.status(200).render('home.pug',param);
});
app.get('/about', (req,res)=>{
    const param={  }
    res.status(200).render('about.pug',param);
});
app.get('/contact', (req,res)=>{
    const param={  }
    res.status(200).render('contact.pug');
});
app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(() => {
        res.send("this has been saved")
    }).catch(()=>{
        res.status(400).send("item was not send to database")
    })
})
app.listen(port, ()=>{
    console.log(`the application is now working on port ${port}`)
});