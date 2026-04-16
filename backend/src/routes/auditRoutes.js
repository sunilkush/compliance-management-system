const express = require('express');
const { getAuditLogs } = require('../controllers/auditController');
const { protect, authorize } = require('../middleware/auth');
const { scopeByEntity } = require('../middleware/entityScope');
const { ROLES } = require('../utils/constants');

const router = express.Router();

router.get('/', protect, scopeByEntity, authorize(ROLES.ADMIN, ROLES.COMPLIANCE_OFFICER, ROLES.AUDITOR), getAuditLogs);

module.exports = router;
