const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const url = "mongodb://127.0.0.1:27017/cognidaEcommDB";
mongoose.connect(url);

const handleLogin = async (req, res) => {
  const schema = new mongoose.Schema({
    email: String,
    password: String,
  });

  const model = mongoose.models["users"] || mongoose.model("users", schema);

  const user = await model.find({ email: { $eq: `${req.body.email}` } });
  if (user[0]) {
    const match = await bcrypt.compare(req.body.password, user[0].password);

    if (match) {
      console.log("ACCESS TOKEN ASSIGNED");
      const accessToken = jwt.sign(
        {
          'email': req.body.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
        );

        res.status(200);
        res.json({'jwt': accessToken});
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

module.exports = handleLogin;
