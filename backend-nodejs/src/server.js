const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for all origins
app.use(cors());

// Parse JSON and urlencoded payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for attachments
app.use('/attachments', express.static(path.join(__dirname, '../public/attachments')));

// Mount API routes under /api
app.use('/api', apiRoutes);

// Root fallback route
app.get('/', (req, res) => {
  res.json({
    academy: 'AI BUILDER ACADEMY CI API V3 (Node.js & Express)',
    status: 'online',
    driver: db.getActiveDriver().toUpperCase(),
    documentation: 'https://github.com/ymohamed225/AI-Builder-Academy'
  });
});

// Initialize database and start HTTP server
db.initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 AI Builder Academy Node.js API server running on:`);
    console.log(`👉 http://localhost:${PORT}`);
    console.log(`👉 Health check: http://localhost:${PORT}/api/health`);
    console.log(`======================================================\n`);
  });
}).catch(err => {
  console.error('[Fatal Error] Database initialization failed:', err);
});
