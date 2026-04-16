const express = require('express');
const { listItems, createItem, updateItem, removeItem } = require('../controllers/complianceController');
const { protect, authorize } = require('../middleware/auth');
const { scopeByEntity } = require('../middleware/entityScope');
const { ROLES } = require('../utils/constants');

const router = express.Router();

router.use(protect, scopeByEntity);

router.get('/', listItems);
router.post('/', authorize(ROLES.ADMIN, ROLES.COMPLIANCE_OFFICER, ROLES.CONTROL_OWNER), createItem);
router.patch('/:id', authorize(ROLES.ADMIN, ROLES.COMPLIANCE_OFFICER, ROLES.CONTROL_OWNER, ROLES.AUDITOR), updateItem);
router.delete('/:id', authorize(ROLES.ADMIN, ROLES.COMPLIANCE_OFFICER), removeItem);

module.exports = router;
