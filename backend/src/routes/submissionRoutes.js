const express = require('express');
const router = express.Router();

const {
  submitForm,
  listSubmissions,
  updateSubmissionById,
  deleteSubmissionById,
  searchSubmissionHandler,
  exportSubmissionsCSV
} = require('../controllers/submissionController');

router.post('/', submitForm);
router.get('/', listSubmissions);
router.get('/search', searchSubmissionHandler);
router.get('/export/csv', exportSubmissionsCSV);
router.put('/:id', updateSubmissionById);
router.delete('/:id', deleteSubmissionById);


module.exports = router;
