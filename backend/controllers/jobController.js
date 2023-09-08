const asyncHandler = require('express-async-handler')

const Job = require('../models/jobModel')

const getJobs = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10, title, company, location, sort } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (title) {
      query.position = { $regex: new RegExp(title, 'i') };
    }

  if (company) {
    query.company = { $regex: new RegExp(company, 'i') };
  }

  if (location) {
    query.location = { $regex: new RegExp(location, 'i') };
  }

  const sortOptions = {};

  if (sort) {
    switch (sort) {
      case 'title':
        sortOptions.position = 1;
        break;
      case 'company':
        sortOptions.company = 1;
        break;
      case 'location':
        sortOptions.location = 1;
        break;
      case 'postedAt':
        sortOptions.postedAt = -1;
        break;
      default:
        sortOptions.postedAt = -1;
        break;
    }
  }

  const jobs = await Job.find(query)
    .skip(skip)
    .limit(Number(limit))
    .sort(sortOptions);

  res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

const setJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(400)
    throw new Error('Missed required feiled or Wrong data type')
  }
})

const updateJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

const deleteJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findByIdAndRemove(req.params.id);
    res.status(200).json({id: req.params.id, jobdata: job});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

module.exports = {
  getJobs,
  setJob,
  updateJob,
  deleteJob,
}