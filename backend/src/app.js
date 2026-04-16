const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const auditRoutes = require('./routes/auditRoutes');
const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes');
const { buildCrudRouter } = require('./routes/crudRoutesFactory');
const { createModuleController } = require('./controllers/moduleController');
const Policy = require('./models/Policy');
const Risk = require('./models/Risk');
const Task = require('./models/Task');
const Audit = require('./models/Audit');
const Training = require('./models/Training');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/audit-logs', auditRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

app.use('/api/policies', buildCrudRouter(createModuleController(Policy)));
app.use('/api/risks', buildCrudRouter(createModuleController(Risk)));
app.use('/api/tasks', buildCrudRouter(createModuleController(Task)));
app.use('/api/audits', buildCrudRouter(createModuleController(Audit)));
app.use('/api/trainings', buildCrudRouter(createModuleController(Training)));

app.use((err, _req, res, _next) => {
  console.error(err);
  return res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
