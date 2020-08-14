const express = require('express');
const router = express.Router();
const {registerEmployee, loginEmployee} = require('../controllers/employeeController')

// Endpoin to register users
router.post('/register',registerEmployee )

// Login user
router.post('/login', loginEmployee)


module.exports = router;
