const createModuleController = (Model) => ({
  list: async (req, res) => {
    const items = await Model.find({ entityId: req.entityId }).sort({ createdAt: -1 });
    return res.json(items);
  },
  create: async (req, res) => {
    const item = await Model.create({ ...req.body, entityId: req.entityId });
    return res.status(201).json(item);
  },
  update: async (req, res) => {
    const item = await Model.findOneAndUpdate(
      { _id: req.params.id, entityId: req.entityId },
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Record not found' });
    return res.json(item);
  },
  remove: async (req, res) => {
    const item = await Model.findOneAndDelete({ _id: req.params.id, entityId: req.entityId });
    if (!item) return res.status(404).json({ message: 'Record not found' });
    return res.json({ message: 'Deleted' });
  }
});

module.exports = { createModuleController };
