const scopeByEntity = (req, _res, next) => {
  req.entityId = req.user?.entityId || 'HQ';
  next();
};

module.exports = { scopeByEntity };
