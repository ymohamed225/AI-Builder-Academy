const db = require('../config/db');

async function getHealth(req, res) {
  try {
    const rows = await db.query('SELECT COUNT(*) as count FROM pre_registrations');
    const totalRegs = parseInt(rows[0]?.count || 0, 10);

    return res.json({
      status: 'ok',
      database_driver: db.getActiveDriver().toUpperCase(),
      database_name: process.env.DB_DATABASE || 'ai_builder_academy',
      academy: 'AI BUILDER ACADEMY CI',
      version: '3.0.0 (Node.js & Express API)',
      pre_registrations_count: totalRegs,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return res.json({
      status: 'ok',
      database_driver: db.getActiveDriver().toUpperCase(),
      academy: 'AI BUILDER ACADEMY CI',
      version: '3.0.0 (Node.js & Express API)',
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = { getHealth };
