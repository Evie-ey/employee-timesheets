const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ProjectItemSchema = new schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ProjectItem = mongoose.model('ProjectItem', ProjectItemSchema)