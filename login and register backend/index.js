import express, { urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/myLoginRegisterDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},).then(()=>console.log("Connected Successfully"))
.catch((err)=>{console.error(err);});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//routes

app.post("/login",(req,res)=>{
    const{email, password}=req.body
    User.findOne({email:email})
    .then((user) => {
        if(user){
           if(password == user.password){
            res.send({message: "Login Successfull",user:user})
           } else{
            res.send({message: "Password didn't match"})
           }
        } else {
        res.send({message: "User not registered"}) 
        }
    })

})

app.post("/register",(req,res)=>{
    const{ name, email, password }=req.body

    //findOne method in mongoosee(use for check if the user has already registered or not )
    User.findOne({email: email})
    .then((user) => {
      if (user) {
         res.send({message: "User already registered"});
      } else {
        const user = new User({
          name: name,
          email: email,
          password: password
        });
        user.save()
        .then( res.send({message: "Successfully Registered"}))
        .catch(err => {
            res.send(err);
          });
      }
    })
    .catch(err => {
      res.send(err);
    });
})

app.listen(9002,()=>{
    console.log("BE started at port 9002")
})
