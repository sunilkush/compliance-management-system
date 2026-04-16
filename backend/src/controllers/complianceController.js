const ComplianceItem = require('../models/ComplianceItem');
const AuditLog = require('../models/AuditLog');

const listItems = async (req, res) => {
  const { type, status } = req.query;
  const query = { entityId: req.entityId };
  if (type) query.type = type;
  if (status) query.status = status;

  const items = await ComplianceItem.find(query)
    .populate('owner', 'name email role')
    .sort({ createdAt: -1 });

  return res.json(items);
};

const createItem = async (req, res) => {
  const payload = { ...req.body, entityId: req.entityId };
  const item = await ComplianceItem.create(payload);

  await AuditLog.create({
    actor: req.user._id,
    actorEmail: req.user.email,
    action: 'CREATE',
    entityType: 'ComplianceItem',
    entityIdRef: item._id.toString(),
    diff: payload,
    entityId: req.entityId
  });

  return res.status(201).json(item);
};

const updateItem = async (req, res) => {
  const item = await ComplianceItem.findOne({ _id: req.params.id, entityId: req.entityId });
  if (!item) return res.status(404).json({ message: 'Item not found' });

  const before = item.toObject();
  Object.assign(item, req.body);
  await item.save();

  await AuditLog.create({
    actor: req.user._id,
    actorEmail: req.user.email,
    action: 'UPDATE',
    entityType: 'ComplianceItem',
    entityIdRef: item._id.toString(),
    diff: { before, after: item.toObject() },
    entityId: req.entityId
  });

  return res.json(item);
};

const removeItem = async (req, res) => {
  const item = await ComplianceItem.findOneAndDelete({ _id: req.params.id, entityId: req.entityId });
  if (!item) return res.status(404).json({ message: 'Item not found' });

  await AuditLog.create({
    actor: req.user._id,
    actorEmail: req.user.email,
    action: 'DELETE',
    entityType: 'ComplianceItem',
    entityIdRef: item._id.toString(),
    diff: item,
    entityId: req.entityId
  });

  return res.json({ message: 'Item deleted' });
};

module.exports = { listItems, createItem, updateItem, removeItem };
