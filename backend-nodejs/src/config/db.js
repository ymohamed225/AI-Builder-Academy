const { Pool } = require('pg');
const mysql = require('mysql2/promise');
require('dotenv').config();

let dbClient = null;
let activeDriver = 'pgsql';

async function initDatabase() {
  const connection = process.env.DB_CONNECTION || 'pgsql';
  const databaseUrl = process.env.DATABASE_URL;

  if (connection === 'pgsql' || connection === 'postgres' || databaseUrl) {
    try {
      const isProduction = process.env.NODE_ENV === 'production' || process.env.DB_SSL === 'true';
      const sslConfig = isProduction ? { rejectUnauthorized: false } : false;

      let poolConfig = {};
      if (databaseUrl) {
        poolConfig = {
          connectionString: databaseUrl,
          ssl: sslConfig,
          max: 20,
          idleTimeoutMillis: 30000
        };
      } else {
        const host = process.env.DB_HOST || '127.0.0.1';
        const port = parseInt(process.env.DB_PORT || 5432, 10);
        const database = process.env.DB_DATABASE || 'ai_builder_academy';
        const user = process.env.DB_USERNAME || 'postgres';
        const password = process.env.DB_PASSWORD || '';

        poolConfig = {
          host,
          port,
          database,
          user,
          password,
          ssl: sslConfig,
          max: 20,
          idleTimeoutMillis: 30000
        };
      }

      const pool = new Pool(poolConfig);
      await pool.query('SELECT 1');
      activeDriver = 'pgsql';
      dbClient = pool;
      console.log(`[DB] Connected successfully to PostgreSQL (${databaseUrl ? 'DATABASE_URL' : process.env.DB_HOST})`);
      return;
    } catch (err) {
      console.warn(`[DB Warning] PostgreSQL connection failed: ${err.message}. Trying fallback MySQL...`);
    }
  }

  // Fallback / Requested MySQL
  try {
    const mysqlPool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT || 3306, 10),
      user: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'ai_builder_academy',
      waitForConnections: true,
      connectionLimit: 10
    });
    await mysqlPool.query('SELECT 1');
    activeDriver = 'mysql';
    dbClient = mysqlPool;
    console.log('[DB] Connected to MySQL');
  } catch (err) {
    console.error(`[DB Error] All database connections failed: ${err.message}`);
    activeDriver = 'none';
  }
}

// Unified query wrapper supporting both pg ($1, $2) and mysql (?)
async function executeQuery(sql, params = []) {
  if (!dbClient) {
    await initDatabase();
  }

  if (activeDriver === 'pgsql') {
    let pgSql = sql;
    let paramIndex = 1;
    pgSql = pgSql.replace(/\?/g, () => `$${paramIndex++}`);

    const res = await dbClient.query(pgSql, params);
    return res.rows;
  } else if (activeDriver === 'mysql') {
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
