import express from 'express';
import expensesRoutes from './expensesRoutes.js';
import categoriesRoutes from './categoriesRoutes.js';
import recurringRoutes from './recurringRoutes.js';
import splitsRoutes from './splitsRoutes.js';
import statsRoutes from './statsRoutes.js';
import { db } from '../data/store.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// Payment methods
router.get('/payment-methods', (req, res) => {
  res.json({ success: true, data: db.getPaymentMethods() });
});

// Reset demo data endpoint
router.post('/reset', (req, res) => {
  const data = db.resetData();
  res.json({ success: true, message: 'Data reset to initial state', data });
});

// Sub-routes
router.use('/expenses', expensesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/recurring', recurringRoutes);
router.use('/splits', splitsRoutes);
router.use('/stats', statsRoutes);

export default router;
