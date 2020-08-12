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
  projectName: {
    type: String,
    required: true
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
