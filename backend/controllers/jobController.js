const asyncHandler = require('express-async-handler')

const Job = require('../models/jobModel')

const getJobs = asyncHandler(async (req, res) => {

  try {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    const jobs = await Job.find()
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json(jobs)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // try {
  //   const jobs = await Job.find();
  //   res.status(200).json(jobs)
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
})

const setJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(400)
    throw new Error('Please add the data')
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