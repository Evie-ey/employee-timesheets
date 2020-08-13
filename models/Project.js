const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ProjectSchema = new schema({
  companyName: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  projectItems: [{name:String, code: String}],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Project = mongoose.model('Project', ProjectSchema)