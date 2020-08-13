const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeSheetSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  Project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
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
