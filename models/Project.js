const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ProjectSchema = new schema({
  company: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  projectItems: [{type: Schema.Types.ObjectId, ref: 'ProjectItem'}],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Project = mongoose.model('Project', ProjectSchema)