const express = require('express');
const { listUsers, updateUserRole } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const { scopeByEntity } = require('../middleware/entityScope');
const { ROLES } = require('../utils/constants');

const router = express.Router();
router.use(protect, scopeByEntity, authorize(ROLES.SUPER_ADMIN, ROLES.COMPLIANCE_OFFICER));

router.get('/', listUsers);
router.patch('/:id/role', updateUserRole);

module.exports = router;
