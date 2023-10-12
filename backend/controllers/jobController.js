const asyncHandler = require('express-async-handler')

const Job = require('../models/jobModel')

const getJobs = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10, position, company, location, sort } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (position) {
      query.position = { $regex: new RegExp(position, 'i') };
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
        case 'position':
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
    const job = await Job.findById(req.params.id)

    if(!job) {
      res.status(400)
      throw new Error('Job not Found')
    }
    await Job.findByIdAndRemove(req.params.id);
    res.status(200).json({id: req.params.id});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

const getJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // const { _id, company, logo, , featured,  } = job;
    res.status(200).json({
      company: job.company,
      logo: job.logo,
      new: job.new,
      featured: job.featured,
      position: job.position,
      role: job.role,
      level: job.level,
      contract: job.contract,
      location: job.location,
      languages: job.languages,
      tools: job.tools,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = {
  getJobs,
  setJob,
  updateJob,
  deleteJob,
  getJob,
}