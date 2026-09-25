const { Pool } = require('pg');
const mysql = require('mysql2/promise');
require('dotenv').config();

let dbClient = null;
let activeDriver = 'pgsql';

async function initDatabase() {
  const connection = process.env.DB_CONNECTION || 'pgsql';
  const host = process.env.DB_HOST || '127.0.0.1';
  const port = process.env.DB_PORT || (connection === 'pgsql' ? 5432 : 3306);
  const database = process.env.DB_DATABASE || 'ai_builder_academy';
  const user = process.env.DB_USERNAME || 'postgres';
  const password = process.env.DB_PASSWORD || '';

  if (connection === 'pgsql' || connection === 'postgres') {
    try {
      const pool = new Pool({
        host,
        port: parseInt(port, 10),
        database,
        user,
        password,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        max: 20,
        idleTimeoutMillis: 30000
      });
      
      // Test query
      await pool.query('SELECT 1');
      activeDriver = 'pgsql';
      dbClient = pool;
      console.log(`[DB] Connected to PostgreSQL (${host}:${port}/${database})`);
      return;
    } catch (err) {
      console.warn(`[DB Warning] PostgreSQL connection failed: ${err.message}. Trying fallback MySQL...`);
    }
  }

  // Fallback / Requested MySQL
  try {
    const mysqlPool = mysql.createPool({
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
      database: 'ai_builder_academy',
      waitForConnections: true,
      connectionLimit: 10
    });
    await mysqlPool.query('SELECT 1');
    activeDriver = 'mysql';
    dbClient = mysqlPool;
    console.log('[DB] Connected to MySQL (127.0.0.1:3306/ai_builder_academy)');
  } catch (err) {
    console.error(`[DB Error] All database connections failed: ${err.message}`);
    // Return dummy client to prevent crash
    activeDriver = 'none';
  }
}

// Unified query wrapper supporting both pg ($1, $2) and mysql (?)
async function executeQuery(sql, params = []) {
  if (!dbClient) {
    await initDatabase();
  }

  if (activeDriver === 'pgsql') {
    // If query uses MySQL ? placeholders, convert to $1, $2...
    let pgSql = sql;
    let paramIndex = 1;
    pgSql = pgSql.replace(/\?/g, () => `$${paramIndex++}`);

    const res = await dbClient.query(pgSql, params);
    return res.rows;
  } else if (activeDriver === 'mysql') {
    // If query uses $1, $2, convert to ?
    let mysqlSql = sql.replace(/\$\d+/g, '?');
    const [rows] = await dbClient.query(mysqlSql, params);
    return rows;
  } else {
    throw new Error('Database client not initialized.');
  }
}

// Unified execute statement returning inserted ID or affected rows
async function executeInsert(sql, params = []) {
  if (!dbClient) {
    await initDatabase();
  }

  if (activeDriver === 'pgsql') {
    let pgSql = sql;
    let paramIndex = 1;
    pgSql = pgSql.replace(/\?/g, () => `$${paramIndex++}`);
    if (!pgSql.toUpperCase().includes('RETURNING')) {
      pgSql += ' RETURNING id';
    }
    const res = await dbClient.query(pgSql, params);
    return res.rows[0]?.id || null;
  } else if (activeDriver === 'mysql') {
    let mysqlSql = sql.replace(/\$\d+/g, '?');
    const [result] = await dbClient.query(mysqlSql, params);
    return result.insertId;
  }
  return null;
}

function getActiveDriver() {
  return activeDriver;
}

module.exports = {
  initDatabase,
  query: executeQuery,
  insert: executeInsert,
  getActiveDriver
};
