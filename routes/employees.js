const express = require('express');
const router = express.Router();

const Employee = require('../models/Employee');

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
        password: req.body.password
      });

      newEmployee.save()
      .then(employee => res.status(201).json(employee));
    }
  })
})


module.exports = router;