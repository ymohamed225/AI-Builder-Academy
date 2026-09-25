const db = require('../config/db');

async function trackLead(req, res) {
  try {
    const { email = '', phone = '', source = 'landing' } = req.body;

    const sql = 'INSERT INTO leads (email, phone, source) VALUES (?, ?, ?)';
    const insertId = await db.insert(sql, [email, phone, source]);

    return res.status(201).json({
      status: 'success',
      message: `Lead enregistré avec succès dans la base de données (${db.getActiveDriver().toUpperCase()}).`,
      id: insertId,
      data: req.body
    });
  } catch (err) {
    console.error('[Track Lead Error]', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { trackLead };
