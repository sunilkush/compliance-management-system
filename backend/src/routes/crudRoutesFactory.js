const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { scopeByEntity } = require('../middleware/entityScope');
const { ROLES } = require('../utils/constants');

const buildCrudRouter = (controller, writeRoles = [ROLES.SUPER_ADMIN, ROLES.COMPLIANCE_OFFICER, ROLES.DEPARTMENT_MANAGER]) => {
  const router = express.Router();
  router.use(protect, scopeByEntity);
  router.get('/', controller.list);
  router.post('/', authorize(...writeRoles), controller.create);
  router.patch('/:id', authorize(...writeRoles), controller.update);
  router.delete('/:id', authorize(ROLES.SUPER_ADMIN, ROLES.COMPLIANCE_OFFICER), controller.remove);
  return router;
};

module.exports = { buildCrudRouter };
