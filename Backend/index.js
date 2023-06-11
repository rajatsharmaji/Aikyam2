import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { connect } from "./db.js";
import * as routes from "./routes/index.js";

const router = routes.default;


const app = express();
const PORT = process.env.PORT || 9002;

app.setMaxListeners(0); // Increase maximum number of listeners to avoid warning

// Middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
// Connect to DB
mongoose.connect("mongodb://127.0.0.1:27017/myLoginRegisterDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected Successfully"))
  .catch((err) => { console.error(err); });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Routes
app.use("/api",router);

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (password === user.password) {
          res.send({ message: "Login Successful", user: user, success: true });
        } else {
          res.send({ message: "Password didn't match", user: null, success: false });
        }
      } else {
        res.send({ message: "User not registered", user: null, success: false });
      }
    });
});

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.send({ message: "User already registered" });
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        });
        newUser.save()
          .then(() => {
            res.send({ message: "Successfully Registered" });
          })
          .catch((err) => {
            res.send(err);
          });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
