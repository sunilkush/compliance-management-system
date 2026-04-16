const express = require('express');
const { runAiPrompt } = require('../controllers/aiController');
const { protect, authorize } = require('../middleware/auth');
const { scopeByEntity } = require('../middleware/entityScope');
const { ROLES } = require('../utils/constants');

const router = express.Router();
router.use(protect, scopeByEntity);

router.post(
  '/:feature',
  authorize(
    ROLES.SUPER_ADMIN,
    ROLES.COMPLIANCE_OFFICER,
    ROLES.LEGAL_RISK_MANAGER,
    ROLES.INTERNAL_AUDITOR,
    ROLES.DEPARTMENT_MANAGER,
    ROLES.EMPLOYEE,
    ROLES.EXECUTIVE
  ),
  runAiPrompt
);

module.exports = router;
