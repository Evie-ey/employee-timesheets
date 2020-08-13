require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

// Endpoin to register users
router.post('/register', (req, res) => {
  const salt = bcrypt.genSalt();
  // Check if employee already exists
  Employee.findOne({ email: req.body.email })
    .then(employee => {
      if (employee) {
        res.status(400).json({ message: 'This user already exists' })
      } else {
        const newEmployee = new Employee({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newEmployee.password, salt, (err, hash) => {
            if (err) throw err;
            newEmployee.password = hash;
          });
        });
        newEmployee.save()
          .then(employee => res.status(201).json(employee))
          .catch(err => console.log(err));
      }
    })
  // res.redirect('/')
})

// Login user
router.post('/login', (req, res) => {
  Employee.findOne({ email: req.body.email })
    .then(employee => {
      if (bcrypt.compare(req.body.password, employee.password)) {
        const user = { email: employee.email, password: employee.password }
        const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({ access_token: access_token })
        res.status(200).json({ message: 'You have successfully logged in' })
        // res.redirect('/')
      } else {
        res.status(400).json({ message: 'Invalid log in credentials' })
      }

    })
    .catch((err) => res.status(400).json({ message: 'Please first register to log in' }))
})

const authenticateToken = (req, res, next) => {
  const authHeader = req.Headers['authorization'] //returns 'Bearer TOKEN'
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.st(403);
    next()

  })
}
module.exports = router;
