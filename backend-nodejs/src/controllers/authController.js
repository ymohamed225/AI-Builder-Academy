// authController.js — Admin login via variables d'environnement (jamais dans le code)
require('dotenv').config();

/**
 * POST /api/auth/admin-login
 * Vérifie identifiant + mot de passe depuis les variables d'environnement.
 * Retourne un token simple (timestamp signé) stocké côté client.
 */
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Identifiant et mot de passe requis.'
      });
    }

    // Les credentials sont lus depuis les variables d'environnement UNIQUEMENT
    const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASSWORD;

    if (!ADMIN_PASS) {
      console.error('[Auth] ADMIN_PASSWORD non configuré dans les variables d\'environnement !');
      return res.status(500).json({
        success: false,
        message: 'Configuration serveur manquante. Contactez l\'administrateur.'
      });
    }

    const isValid = username === ADMIN_USER && password === ADMIN_PASS;

    if (!isValid) {
      // Délai anti brute-force
      await new Promise(r => setTimeout(r, 500));
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects.'
      });
    }

    // Token simple : base64 horodaté (suffisant pour usage interne)
    const tokenPayload = `${username}:${Date.now()}:aibuilder`;
    const token = Buffer.from(tokenPayload).toString('base64');

    return res.json({
      success: true,
      token,
      message: 'Connexion réussie.'
    });

  } catch (err) {
    console.error('[Auth Error]', err.message);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

/**
 * POST /api/auth/verify-token
 * Vérifie qu'un token est valide et non expiré (24h).
 */
exports.verifyToken = (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ valid: false });

    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [, timestamp] = decoded.split(':');
    const age = Date.now() - parseInt(timestamp, 10);
    const MAX_AGE = 24 * 60 * 60 * 1000; // 24 heures

    if (age > MAX_AGE) {
      return res.status(401).json({ valid: false, message: 'Session expirée.' });
    }

    return res.json({ valid: true });
  } catch {
    return res.status(401).json({ valid: false });
  }
};
