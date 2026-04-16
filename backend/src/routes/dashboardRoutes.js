const express = require('express');
const { getDashboard } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');
const { scopeByEntity } = require('../middleware/entityScope');

const router = express.Router();

router.get('/', protect, scopeByEntity, getDashboard);

module.exports = router;
