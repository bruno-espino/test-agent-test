import { Resource } from "sst";
import { Pool } from "pg";
import { handler } from "../core/handler";

const pool = new Pool({
    user: Resource.DB.username,
    password: Resource.DB.password,
    database: Resource.DB.database,
    host: Resource.DB.host,
    port: Resource.DB.port,
});

export const main = handler(async (event, context) => {

  try {
    const client = await pool.connect();
    // Run the migration SQL
    await client.query(`
      CREATE TABLE IF NOT EXISTS organizations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS user_orgs (
        user_id INTEGER NOT NULL,
        org_id INTEGER NOT NULL,
        role TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, org_id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (org_id) REFERENCES organizations(id)
      );

      CREATE TABLE IF NOT EXISTS api_keys (
        id SERIAL PRIMARY KEY,
        org_id INTEGER NOT NULL,
        api_key TEXT NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (org_id) REFERENCES organizations(id)
      );

      CREATE TABLE IF NOT EXISTS repositories (
        id SERIAL PRIMARY KEY,
        org_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        full_name TEXT,
        url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(org_id, name),
        FOREIGN KEY (org_id) REFERENCES organizations(id)
      );

      CREATE TABLE IF NOT EXISTS runs (
        id SERIAL PRIMARY KEY,
        org_id INTEGER NOT NULL,
        repository_id INTEGER NOT NULL,
        run_id TEXT NOT NULL,
        context_info TEXT,
        summary jsonb,
        results jsonb,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (org_id) REFERENCES organizations(id),
        FOREIGN KEY (repository_id) REFERENCES repositories(id)
      );
    `);

    await client.end();
    return JSON.stringify({ message: 'Migration completed successfully!' })
  } catch (error) {
    return JSON.stringify({ error: 'Migration failed', details: error instanceof Error ? error.message : String(error) });
  }
});