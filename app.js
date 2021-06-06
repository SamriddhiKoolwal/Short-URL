const express=require("express");
const bodyParser = require("body-parser");
const shortid = require('shortid');
const ejs = require("ejs");
const mongoose = require('mongoose');
const app=express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/urlDB", {useNewUrlParser: true,useUnifiedTopology: true});
const UrlSchema=new mongoose.Schema({
  full:{
    type:String,
    require:true
  },
  s:{
    type:String,
    require:true,
    default:shortid.generate
  }
});
const Short = mongoose.model('Short', UrlSchema);
const z=new Short({
  full:"abcd",
  s:"sdsdd"
})
z.save();
app.get("/",(req,res)=>{
  res.render("index");
});
app.post("/",(req,res)=>{
  const fullUrl=req.body.url;

  const su=new Short({full:fullUrl,s:shortid.generate()})
  su.save();

  res.render("index",{short_url:su.s});
});
app.get("/:s",(req,res)=>{
  const sp=req.params.s;

  Short.findOne({s:sp}, function(err, s){
    res.redirect(s.full);
    });
  });



app.listen(3000,function(){
    console.log("the port 3000 is starting");
});
