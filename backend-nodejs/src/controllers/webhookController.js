const db = require('../config/db');
const crypto = require('crypto');

async function handleChariowWebhook(req, res) {
  try {
    const payload = req.body || {};
    console.log('[Chariow Webhook Received]', payload);

    const signature = req.headers['x-chariow-signature'];
    const secret = process.env.CHARIOW_WEBHOOK_SECRET;

    if (secret && signature) {
      const hmac = crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex');
      if (hmac !== signature) {
        console.warn('[Chariow Webhook] Invalid signature');
        return res.status(401).json({ status: 'unauthorized' });
      }
    }

    const transactionId = payload.transaction_id || payload.id;
    const customerEmail = payload.customer_email || payload.email;
    const customerPhone = payload.customer_phone || payload.phone;
    const customerName = payload.customer_name || payload.name || 'Élève AI Builder';
    const offerCode = (payload.product_code || payload.offer || 'bootcamp').toLowerCase();
    const amount = parseFloat(payload.amount || 0);
    const status = payload.status || 'completed';

    if (!transactionId) {
      return res.status(400).json({ status: 'invalid_payload' });
    }

    // Check if registration exists
    const existing = await db.query('SELECT id FROM registrations WHERE chariow_transaction_id = ?', [transactionId]);

    if (existing.length > 0) {
      await db.query(`UPDATE registrations SET 
        student_name = ?, student_email = ?, student_phone = ?, offer_code = ?, amount_paid = ?, payment_status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE chariow_transaction_id = ?`,
        [customerName, customerEmail, customerPhone, offerCode, amount, status, transactionId]
      );
    } else {
      await db.insert(`INSERT INTO registrations 
        (chariow_transaction_id, student_name, student_email, student_phone, offer_code, amount_paid, payment_status, paid_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [transactionId, customerName, customerEmail, customerPhone, offerCode, amount, status]
      );
    }

    return res.json({
      status: 'success',
      message: 'Paiement Chariow enregistré et inscription validée.'
    });
  } catch (err) {
    console.error('[Chariow Webhook Error]', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { handleChariowWebhook };
