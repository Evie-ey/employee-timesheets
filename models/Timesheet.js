const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeSheetSchema = new Schema({
  employee: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  projectID: {
    type: String
  },
  hours: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  }

})

module.exports = Timesheet = mongoose.model('timesheets', TimeSheetSchema)
