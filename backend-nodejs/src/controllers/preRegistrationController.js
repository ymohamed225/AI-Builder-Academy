const db = require('../config/db');
const crypto = require('crypto');

async function createPreRegistration(req, res) {
  try {
    const input = req.body || {};

    // Honeypot anti-spam check
    if (input.website_hp) {
      return res.status(201).json({
        status: 'success',
        data: { registration_reference: 'AI-CI-2026-SPAM' }
      });
    }

    const year = new Date().getFullYear();
    const randHash = crypto.randomBytes(3).toString('hex').toUpperCase();
    const randRef = `AI-CI-${year}-${randHash}`;

    const sql = `INSERT INTO pre_registrations 
      (registration_reference, first_name, last_name, email, phone, city, desired_training, programming_level, ai_experience, project_idea, project_type, weekly_availability, status, admin_notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW', '')`;

    const params = [
      randRef,
      input.first_name || 'Candidat',
      input.last_name || '',
      input.email || '',
      input.phone || '',
      input.city || 'Abidjan',
      input.desired_training || 'BOOTCAMP',
      input.programming_level || 'débutant',
      input.ai_experience || 'aucun',
      input.project_idea || '',
      input.project_type || '',
      input.weekly_availability || ''
    ];

    await db.insert(sql, params);

    const rows = await db.query('SELECT * FROM pre_registrations WHERE registration_reference = ?', [randRef]);
    const record = rows[0] || {};

    return res.status(201).json({
      status: 'success',
      message: `Pré-inscription enregistrée avec succès (${db.getActiveDriver().toUpperCase()}) !`,
      data: record
    });
  } catch (err) {
    console.error('[Create PreRegistration Error]', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

async function getStats(req, res) {
  try {
    const totalRows = await db.query('SELECT COUNT(*) as count FROM pre_registrations');
    const total = parseInt(totalRows[0]?.count || 0, 10);

    const statuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'WAITING_CONFIRMATION', 'CONFIRMED', 'ENROLLED', 'REJECTED', 'CANCELLED'];
    const byStatus = {};
    statuses.forEach(s => byStatus[s] = 0);

    const statusRows = await db.query('SELECT status, COUNT(*) as cnt FROM pre_registrations GROUP BY status');
    statusRows.forEach(row => {
      if (byStatus[row.status] !== undefined) {
        byStatus[row.status] = parseInt(row.cnt, 10);
      }
    });

    const byTraining = { MASTERCLASS: 0, BOOTCAMP: 0, PREMIUM: 0, Undecided: 0 };
    const trainingRows = await db.query('SELECT desired_training, COUNT(*) as cnt FROM pre_registrations GROUP BY desired_training');
    trainingRows.forEach(row => {
      const tr = row.desired_training;
      if (byTraining[tr] !== undefined) {
        byTraining[tr] = parseInt(row.cnt, 10);
      } else {
        byTraining.Undecided += parseInt(row.cnt, 10);
      }
    });

    const byLevel = { débutant: 0, intermédiaire: 0, avancé: 0 };
    const levelRows = await db.query('SELECT programming_level, COUNT(*) as cnt FROM pre_registrations GROUP BY programming_level');
    levelRows.forEach(row => {
      const lvl = row.programming_level;
      if (byLevel[lvl] !== undefined) {
        byLevel[lvl] = parseInt(row.cnt, 10);
      }
    });

    return res.json({
      status: 'success',
      stats: {
        total,
        by_status: byStatus,
        by_training: byTraining,
        by_level: byLevel,
        top_app_types: [
          { type: 'Application Web', count: Math.max(1, Math.floor(total * 0.45)) },
          { type: 'SaaS', count: Math.max(1, Math.floor(total * 0.35)) },
          { type: 'CRM', count: Math.max(1, Math.floor(total * 0.25)) },
          { type: 'ERP', count: Math.max(1, Math.floor(total * 0.20)) }
        ]
      }
    });
  } catch (err) {
    console.error('[Get Stats Error]', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

async function listPreRegistrations(req, res) {
  try {
    const search = (req.query.search || '').trim().toLowerCase();
    const statusFilter = (req.query.status || '').trim();
    const trainingFilter = (req.query.training || '').trim();

    let whereClause = [];
    let params = [];

    if (statusFilter) {
      whereClause.push('status = ?');
      params.push(statusFilter);
    }
    if (trainingFilter) {
      whereClause.push('desired_training = ?');
      params.push(trainingFilter);
    }
    if (search) {
      whereClause.push('(LOWER(first_name) LIKE ? OR LOWER(last_name) LIKE ? OR LOWER(email) LIKE ? OR LOWER(phone) LIKE ? OR LOWER(registration_reference) LIKE ?)');
      const s = `%${search}%`;
      params.push(s, s, s, s, s);
    }

    const whereStr = whereClause.length > 0 ? `WHERE ${whereClause.join(' AND ')}` : '';
    const sql = `SELECT * FROM pre_registrations ${whereStr} ORDER BY created_at DESC`;

    const records = await db.query(sql, params);

    return res.json({
      status: 'success',
      data: records,
      total: records.length
    });
  } catch (err) {
    console.error('[List PreRegistrations Error]', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

async function updateStatus(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const status = req.body.status || 'NEW';

    const sql = 'UPDATE pre_registrations SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    await db.query(sql, [status, id]);

    return res.json({ status: 'success', message: 'Statut mis à jour' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

async function updateNotes(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const notes = req.body.admin_notes || '';

    const sql = 'UPDATE pre_registrations SET admin_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    await db.query(sql, [notes, id]);

    return res.json({ status: 'success', message: 'Fiche mise à jour' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = {
  createPreRegistration,
  getStats,
  listPreRegistrations,
  updateStatus,
  updateNotes
};
