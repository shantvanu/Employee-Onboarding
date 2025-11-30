const { v4: uuidv4 } = require('uuid');
const {
  createSubmission,
  getSubmissions,
  getSubmissionCount,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  searchSubmissions
} = require('../models/submissionModel');
const { validateSubmission } = require('../validation/formValidator');

/**
 * POST /api/submissions
 */
const submitForm = async (req, res, next) => {
  const submissionData = req.body;
  const { isValid, errors } = validateSubmission(submissionData);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    const id = uuidv4();
    const createdAt = new Date().toISOString();

    await createSubmission(id, createdAt, submissionData);

    res.status(201).json({ success: true, id, createdAt });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/submissions
 */
const listSubmissions = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, sortOrder = 'desc' } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    if (page < 1) page = 1;
    if (limit < 1 || limit > 50) limit = 10;

    sortOrder = sortOrder === 'asc' ? 'ASC' : 'DESC';
    const offset = (page - 1) * limit;

    const [items, totalCount] = await Promise.all([
      getSubmissions({ limit, offset, sortOrder }),
      getSubmissionCount()
    ]);

    res.json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      items
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/submissions/:id
 */
const updateSubmissionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const existing = await getSubmissionById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    const { isValid, errors } = validateSubmission(updatedData);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }

    await updateSubmission(id, updatedData);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/submissions/:id
 */
const deleteSubmissionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteSubmission(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/submissions/search?q=
 */
const searchSubmissionHandler = async (req, res, next) => {
  try {
    const { q } = req.query;
    const results = q ? await searchSubmissions(q) : [];
    res.json({ success: true, items: results });
  } catch (err) {
    next(err);
  }
};

/**
 * ✅ CSV EXPORT
 * GET /api/submissions/export/csv
 */
const exportSubmissionsCSV = async (req, res, next) => {
  try {
    const submissions = await searchSubmissions('');

    let csv = 'id,createdAt,data\n';
    submissions.forEach((s) => {
      csv += `${s.id},${s.createdAt},"${JSON.stringify(s.data).replace(/"/g, '""')}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=submissions.csv'
    );

    res.status(200).send(csv);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitForm,
  listSubmissions,
  updateSubmissionById,
  deleteSubmissionById,
  searchSubmissionHandler,
  exportSubmissionsCSV
};
