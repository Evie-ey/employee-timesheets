const express = require('express');
const router = express.Router();

const {getAll, getOne, createTimesheet, updateTimesheet, deleteTimesheet} = require('../controllers/timesheetsController')

// Get all timesheets
router.get('/', getAll);

// Get timesheets by id
router.get('/:id', getOne);

// Create a new timesheet
router.post('/new-timesheet', createTimesheet)

// Update timesheets
router.patch('/:id', updateTimesheet)

// delete timesheets
router.delete('/:id', deleteTimesheet)
module.exports = router;
