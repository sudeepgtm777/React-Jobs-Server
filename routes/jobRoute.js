const express = require('express');
const jobController = require('../controllers/jobController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(jobController.getAllJobs)
  .post(isAuthenticated, jobController.createJob);

router
  .route('/:id')
  .get(jobController.getJob)
  .patch(isAuthenticated, jobController.updateJob)
  .delete(isAuthenticated, jobController.deleteJob);

module.exports = router;
