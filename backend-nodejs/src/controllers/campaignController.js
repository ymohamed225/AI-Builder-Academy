const db = require('../config/db');

async function listCampaigns(req, res) {
  try {
    const rows = await db.query('SELECT * FROM message_campaigns ORDER BY created_at DESC');
    return res.json({ success: true, data: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function sendCampaign(req, res) {
  try {
    const input = req.body || {};
    const recipientType = input.recipient_type || 'ALL';
    const statusFilter = input.status_filter || '';
    const trainingFilter = input.training_filter || '';
    const customRecipients = input.custom_recipients || '';
    const candidateIds = Array.isArray(input.candidate_ids) ? input.candidate_ids : [];

    let candRows = [];

    if (recipientType === 'CUSTOM' && customRecipients) {
      // Manual email/phone entry separated by commas, semicolons or newlines
      const rawEntries = typeof customRecipients === 'string'
        ? customRecipients.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
        : customRecipients;

      candRows = rawEntries.map((entry, idx) => {
        const isEmail = entry.includes('@');
        return {
          id: `custom_${idx + 1}`,
          first_name: isEmail ? entry.split('@')[0] : 'Destinataire',
          last_name: '',
          email: isEmail ? entry : '',
          phone: !isEmail ? entry : '',
          registration_reference: 'MANUEL',
          desired_training: 'Direct'
        };
      });
    } else if (recipientType === 'CUSTOM' && candidateIds.length > 0) {
      const placeholders = candidateIds.map(() => '?').join(',');
      candRows = await db.query(`SELECT * FROM pre_registrations WHERE id IN (${placeholders})`, candidateIds);
    } else {
      let whereClause = [];
      let params = [];

      if (recipientType === 'STATUS' && statusFilter) {
        whereClause.push('status = ?');
        params.push(statusFilter);
      }
      if (recipientType === 'TRAINING' && trainingFilter) {
        whereClause.push('desired_training = ?');
        params.push(trainingFilter);
      }

      const whereStr = whereClause.length > 0 ? `WHERE ${whereClause.join(' AND ')}` : '';
      candRows = await db.query(`SELECT * FROM pre_registrations ${whereStr}`, params);
    }

    const processedRecipients = candRows.map(c => {
      const firstName = c.first_name || 'Candidat';
      const ref = c.registration_reference || '';
      const training = c.desired_training || '';

      const personalizedBody = (input.body_template || '')
        .replace(/\{first_name\}/g, firstName)
        .replace(/\{last_name\}/g, c.last_name || '')
        .replace(/\{ref\}/g, ref)
        .replace(/\{training\}/g, training);

      let cleanPhone = (c.phone || '').replace(/[^0-9]/g, '');
      if (cleanPhone.length === 10 && !cleanPhone.startsWith('225')) {
        cleanPhone = '225' + cleanPhone;
      }

      let waMsg = encodeURIComponent(personalizedBody);
      if (input.attachment_url) {
        waMsg += encodeURIComponent('\n\n📄 Document joint : ' + input.attachment_url);
      }

      return {
        id: c.id,
        name: `${c.first_name || ''} ${c.last_name || ''}`.trim(),
        email: c.email || '',
        phone: c.phone || '',
        clean_phone: cleanPhone,
        whatsapp_link: `https://wa.me/${cleanPhone}?text=${waMsg}`,
        personalized_body: personalizedBody
      };
    });

    const sqlCamp = `INSERT INTO message_campaigns 
      (title, channel, recipient_type, subject, body_template, attachment_url, attachment_name, is_scheduled, scheduled_at, sent_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const isScheduled = input.is_scheduled ? 1 : 0;
    const scheduledAt = input.scheduled_at ? new Date(input.scheduled_at).toISOString().slice(0, 19).replace('T', ' ') : null;

    await db.insert(sqlCamp, [
      input.title || 'Sans titre',
      input.channel || 'WHATSAPP',
      recipientType,
      input.subject || '',
      input.body_template || '',
      input.attachment_url || '',
      input.attachment_name || '',
      isScheduled,
      scheduledAt,
      processedRecipients.length
    ]);

    return res.status(201).json({
      success: true,
      message: `Campagne enregistrée dans la base (${db.getActiveDriver().toUpperCase()}). ${processedRecipients.length} destinataire(s) cibles.`,
      recipients: processedRecipients
    });
  } catch (err) {
    console.error('[Send Campaign Error]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function uploadAttachment(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Aucun fichier fourni' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/attachments/${req.file.filename}`;
    return res.json({
      success: true,
      file_name: req.file.originalname,
      file_url: fileUrl
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  listCampaigns,
  sendCampaign,
  uploadAttachment
};
