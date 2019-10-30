const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");


const hash = password => {
  return new Promise((resolve) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, function (err, hash) {
        resolve(hash);
      });
    });
  });
};
const compare = (password, hash) => {
  return new Promise((resolve) => {
    bcrypt.compare(password, hash, (err, res) => {
      resolve(res);
    });
  });
};
const generateToken = (username) => {
  return new Promise((resolve) => {
    const cert = fs.readFileSync(path.resolve(__dirname, "../key/rsa_private_key.pem"));
    jwt.sign({
        username,
      },
      cert, {
        algorithm: "RS256",
      },
      (err, token) => {
        resolve(token);
      },
    )
  })
}
const verifyToken = (token) => {
  return new Promise((resolve) => {
    let cert = fs.readFileSync(path.resolve(__dirname, "../key/rsa_public_key.pem"));
    jwt.verify(token, cert, (err, decoded) => {
      resolve(decoded);
    })
  })
}
module.exports = {
  hash,
  compare,
  generateToken,
  verifyToken,
};