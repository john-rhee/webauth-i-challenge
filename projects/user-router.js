const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("./user-model.js");

const restricted = require("../restricted-middleware.js");

router.post("/register", (req, res) => {
  let user = req.body;

  // hash the password
  const hash = bcrypt.hashSync(user.password, 14); // the 8 is the number of rounds (2^8) (iterations)

  // override the plain text password with the hash
  user.password = hash;

  Users.add(user)
    .then(saved => {
    req.session.user = saved;
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;
  
    // check that the password
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.user = user;
          res.status(200).json({ message: `Welcome ${user.username}, have a cookie!` });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

//BEFORE CHANGING TO SESSION//
// router.post("/login", (req, res) => {
//   let { username, password } = req.body;

//   // check that the password

//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         // in here with .compare()
//         // change the users-model findBy() to return the password as well
//         res.status(200).json({ message: `Welcome ${user.username}!` });
//       } else {
//         res.status(401).json({ message: "Invalid Credentials" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

router.get("/",restricted, (req, res) => {
    Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get users' });
    });
  });

//BEFORE CHANGING TO SESSION//
// function restricted(req,res,next) {
//     let { username, password } = req.headers;

// if(username && password) {    
//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         next();
//       } else {
//         res.status(401).json({ message: "Invalid Credentials" });
//       }
//     })
//     .catch(err => {
//         res.status(500).json({ message: 'Error' });
//       });
//  } else { res.status(400).json({ message: 'Provide username and password' });}    
// }  

router.get("/logout", (req, res) => {
    if (req.session) {
      req.session.destroy(error => {
        if (error) {
          res.status(500).json({
            message:
              "you can checkout any time you like, but you can never leave!!!!!",
          });
        } else {
          res.status(200).json({ message: "logged out" });
        }
      });
    } else {
      res.status(200).end();
    }
  });

module.exports = router;