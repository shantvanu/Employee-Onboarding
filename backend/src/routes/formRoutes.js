// src/routes/formRoutes.js
const express = require('express');
const router = express.Router();

const { getFormSchema } = require('../controllers/formController');

router.get('/', getFormSchema);

module.exports = router;
