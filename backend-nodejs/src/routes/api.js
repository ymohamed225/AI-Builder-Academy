const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const healthController = require('../controllers/healthController');
const leadController = require('../controllers/leadController');
const preRegistrationController = require('../controllers/preRegistrationController');
const surveyController = require('../controllers/surveyController');
const campaignController = require('../controllers/campaignController');
const webhookController = require('../controllers/webhookController');

// Multer storage configuration for attachment uploads
const uploadDir = path.join(__dirname, '../../public/attachments');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}_${cleanName}`);
  }
});
const upload = multer({ storage });

// 1. Health check
router.get('/health', healthController.getHealth);

// 2. Leads tracking
router.post('/leads/track', leadController.trackLead);

// 3. Pre-registrations
router.post('/pre-registrations', preRegistrationController.createPreRegistration);
router.get('/pre-registrations/stats', preRegistrationController.getStats);
router.get('/pre-registrations', preRegistrationController.listPreRegistrations);
router.patch('/pre-registrations/:id/status', preRegistrationController.updateStatus);
router.put('/pre-registrations/:id', preRegistrationController.updateNotes);

// 4. Surveys
router.get('/admin/surveys', surveyController.listSurveys);
router.post('/admin/surveys', surveyController.createSurvey);
router.delete('/admin/surveys/:id', surveyController.deleteSurvey);
router.get('/admin/surveys/:id/responses', surveyController.getSurveyResponses);

router.get('/surveys/:param', surveyController.getSurveyBySlugOrId);
router.post('/surveys/:param/submit', surveyController.submitSurveyResponse);

// 5. Messaging Campaigns
router.get('/admin/campaigns', campaignController.listCampaigns);
router.post('/admin/campaigns/send', campaignController.sendCampaign);
router.post('/admin/campaigns/upload-attachment', upload.single('file'), campaignController.uploadAttachment);

// 6. Webhooks
router.post('/webhooks/chariow', webhookController.handleChariowWebhook);

module.exports = router;
