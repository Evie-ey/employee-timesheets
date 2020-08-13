const express = require('express');
const router = express.Router();
const crypto = require('crypto')
const Employee = require('../models/Employee');
// function to has password
const hashPassword =(password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

// Endpoin to register users
router.post('/register', (req, res) => {
  // Check if employee already exists
  Employee.findOne({email: req.body.email})
  .then(employee => {
    if(employee) {
      res.status(400).json({message: 'This user already exists'})
    } else {
      const newEmployee = new Employee({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword(req.body.password)
      });

      newEmployee.save()
      .then(employee => res.status(201).json(employee));
    }
  })
  // res.redirect('/')
})

// Login user
router.post('/login', (req, res) => {
  Employee.findOne({email: req.body.email})
  .then(employee => {
    if(hashPassword(req.body.password) === employee.password) {
      res.status(200).json({message: 'You have successfully logged in'})
      // res.redirect('/')
    } else {
      res.status(400).json({message: 'Invalid log in credentials'})
    }

  })
  .catch((err) => res.status(400).json({message: 'Please first register to log in'}))
})


module.exports = router;