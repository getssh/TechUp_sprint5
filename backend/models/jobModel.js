const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
  company: { type: String, required: [true, 'This filed cant be empty'] },
  logo: { type: String, required: [true, 'This filed cant be empty'] },
  new: { type: Boolean, required: [true, 'This filed cant be empty'] },
  featured: { type: Boolean, required: [true, 'This filed cant be empty'] },
  position: { type: String, required: [true, 'This filed cant be empty'] },
  role: { type: String, required: [true, 'This filed cant be empty'] },
  level: { type: String, required: [true, 'This filed cant be empty'] },
  postedAt: { type: Date, default: Date.now },
  contract: { type: String, required: [true, 'This filed cant be empty'] },
  location: { type: String, required: [true, 'This filed cant be empty'] },
  languages: { type: [String], required: [true, 'This filed cant be empty'] },
  tools: { type: [String], required: [true, 'This filed cant be empty'] }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Job', jobSchema)
