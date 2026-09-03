import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root health check endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Brindha Cloud Kitchen API Services',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    kitchen: 'Brindha Cloud Kitchen',
    uptime: process.uptime(),
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware (only for /api routes)
app.use('/api/*', notFound);
app.use(errorHandler);

const PORT = process.env.BACKEND_PORT || 5000;

// Only listen if executed directly as a standalone backend server
if (process.env.AIS_STANDALONE_BACKEND === 'true') {
  app.listen(PORT, () => {
    console.log(`🚀 Brindha Cloud Kitchen Server running on port ${PORT}`);
  });
}

export default app;
