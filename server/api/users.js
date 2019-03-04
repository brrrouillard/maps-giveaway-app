const router = require("express").Router();

const User = require("../models/User");

// Get all reports
router.get("/", (req, res) => {
  User.find((err, reports) => res.status(200).send(reports));
});

// Add new report
router.post("/", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
  });
  console.log(newUser);
  newUser
    .save()
    .then(() => console.log(`Added user ${newUser.username}`))
    .catch(err => {
      console.log(err);
      res.status(400).send({ msg: "ERROR" });
    })
    .then(() => res.status(200).send({ msg: "OK" }));
});

module.exports = router;
