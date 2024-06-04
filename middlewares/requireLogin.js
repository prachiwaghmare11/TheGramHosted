const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys");
const mongoose = require("mongoose");
const USER = mongoose.model("USER");

module.exports = (req, res, next) => {
  const { authorization } = req.headers ? req.headers : null;
  if (!authorization) {
    return res.status(401).json({ error: "You must have logged in" });
  }
  // res.json("ok")
  //console.log("Hello");
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, Jwt_secret, (err, payload) => {
    if (err) {
      res.status(401).json({ error: "You must have logged in" });
    }
    if (payload) {
      const { _id } = payload;
      USER.findById(_id).then((userData) => {
        console.log(userData);
        req.user = userData;
        next();
      });
    }
  });
};
