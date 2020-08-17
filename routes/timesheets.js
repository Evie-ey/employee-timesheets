const express = require('express');
const router = express.Router();

const {getAll, getOne, createTimesheet, updateTimesheet, deleteTimesheet} = require('../controllers/timesheetsController')
const {authenticateToken} = require('../controllers/employeeController')

// Get all timesheets
router.get('/', authenticateToken, getAll);

// Get timesheets by id
router.get('/:id', authenticateToken, getOne);

// Create a new timesheet
router.post('/new-timesheet', authenticateToken, createTimesheet)

// Update timesheets
router.patch('/:id', authenticateToken, updateTimesheet)

// delete timesheets
router.delete('/:id', authenticateToken, deleteTimesheet)


module.exports = router;
