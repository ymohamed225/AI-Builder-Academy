const db = require('../config/db');
const crypto = require('crypto');

async function listSurveys(req, res) {
  try {
    const rows = await db.query('SELECT * FROM surveys ORDER BY created_at DESC');
    const surveys = rows.map(s => ({
      ...s,
      fields: typeof s.fields_json === 'string' ? JSON.parse(s.fields_json || '[]') : (s.fields_json || []),
      is_active: Boolean(s.is_active)
    }));
    return res.json({ success: true, data: surveys });
  } catch (err) {
    console.error('[List Surveys Error]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function createSurvey(req, res) {
  try {
    const input = req.body || {};
    const title = input.title || 'Sans titre';
    const slugBase = title.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
    const randStr = crypto.randomBytes(3).toString('hex');
    const slug = `${slugBase || 'form'}-${randStr}`;

    const sql = `INSERT INTO surveys (slug, title, description, fields_json, is_active, responses_count)
      VALUES (?, ?, ?, ?, ?, 0)`;

    const fieldsJson = JSON.stringify(input.fields || []);
    const isActive = (input.is_active !== false) ? 1 : 0;

    await db.insert(sql, [slug, title, input.description || '', fieldsJson, isActive]);

    const rows = await db.query('SELECT * FROM surveys WHERE slug = ?', [slug]);
    const newSurvey = rows[0] ? {
      ...rows[0],
      fields: JSON.parse(rows[0].fields_json || '[]'),
      is_active: Boolean(rows[0].is_active)
    } : null;

    return res.status(201).json({
      success: true,
      message: `Formulaire créé avec succès (${db.getActiveDriver().toUpperCase()}) !`,
      data: newSurvey
    });
  } catch (err) {
    console.error('[Create Survey Error]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function deleteSurvey(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    await db.query('DELETE FROM surveys WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Formulaire supprimé.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getSurveyBySlugOrId(req, res) {
  try {
    const param = req.params.param;
    let sql = 'SELECT * FROM surveys WHERE slug = ?';
    let params = [param];

    if (/^\d+$/.test(param)) {
      sql = 'SELECT * FROM surveys WHERE id = ?';
      params = [parseInt(param, 10)];
    }

    const rows = await db.query(sql, params);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Formulaire introuvable.' });
    }

    const survey = {
      ...rows[0],
      fields: typeof rows[0].fields_json === 'string' ? JSON.parse(rows[0].fields_json || '[]') : (rows[0].fields_json || []),
      is_active: Boolean(rows[0].is_active)
    };

    return res.json({ success: true, data: survey });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function submitSurveyResponse(req, res) {
  try {
    const param = req.params.param;
    const input = req.body || {};

    let sql = 'SELECT * FROM surveys WHERE slug = ?';
    let params = [param];
    if (/^\d+$/.test(param)) {
      sql = 'SELECT * FROM surveys WHERE id = ?';
      params = [parseInt(param, 10)];
    }

    const rows = await db.query(sql, params);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Formulaire introuvable.' });
    }

    const survey = rows[0];
    const surveyId = survey.id;

    // Increment responses_count
    await db.query('UPDATE surveys SET responses_count = responses_count + 1 WHERE id = ?', [surveyId]);

    // Insert response
    const insertSql = `INSERT INTO survey_responses (survey_id, respondent_name, respondent_email, answers_json)
      VALUES (?, ?, ?, ?)`;

    await db.insert(insertSql, [
      surveyId,
      input.respondent_name || 'Anonyme',
      input.respondent_email || '',
      JSON.stringify(input.answers || {})
    ]);

    return res.status(201).json({
      success: true,
      message: 'Merci pour votre réponse !',
      data: {
        survey_id: surveyId,
        respondent_name: input.respondent_name || 'Anonyme'
      }
    });
  } catch (err) {
    console.error('[Submit Survey Response Error]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getSurveyResponses(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    const surveyRows = await db.query('SELECT * FROM surveys WHERE id = ?', [id]);
    const survey = surveyRows[0] ? {
      ...surveyRows[0],
      fields: JSON.parse(surveyRows[0].fields_json || '[]'),
      is_active: Boolean(surveyRows[0].is_active)
    } : null;

    const respRows = await db.query('SELECT * FROM survey_responses WHERE survey_id = ? ORDER BY created_at DESC', [id]);
    const responses = respRows.map(r => ({
      ...r,
      answers: typeof r.answers_json === 'string' ? JSON.parse(r.answers_json || '{}') : (r.answers_json || {})
    }));

    return res.json({
      success: true,
      survey,
      data: responses
    });
  } catch (err) {
    console.error('[Get Survey Responses Error]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  listSurveys,
  createSurvey,
  deleteSurvey,
  getSurveyBySlugOrId,
  submitSurveyResponse,
  getSurveyResponses
};
