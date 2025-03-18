CREATE TABLE organizations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,  -- Store hashed passwords (if applicable)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_orgs (
  user_id INTEGER NOT NULL,
  org_id INTEGER NOT NULL,
  role TEXT,  -- Optional: e.g., 'admin', 'member', etc.
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, org_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (org_id) REFERENCES organizations(id)
);

CREATE TABLE api_keys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  org_id INTEGER NOT NULL,
  api_key TEXT NOT NULL UNIQUE,
  description TEXT,  -- Optional: description of the key's usage
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (org_id) REFERENCES organizations(id)
);

CREATE TABLE repositories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  org_id INTEGER NOT NULL,
  name TEXT NOT NULL,        -- Repository name (e.g., "my-repo")
  full_name TEXT,            -- Full repository name (e.g., "org/my-repo")
  url TEXT,                  -- URL to the repository
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(org_id, name),      -- Ensure unique repo names per organization
  FOREIGN KEY (org_id) REFERENCES organizations(id)
);

CREATE TABLE runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  org_id INTEGER NOT NULL,
  repository_id INTEGER NOT NULL,  -- Link to the repository entity
  run_id TEXT NOT NULL,            -- The unique GitHub Actions run ID
  context_info TEXT,               -- JSON string containing GitHub Actions context info
  summary TEXT,                    -- Summary information (could be JSON or plain text)
  results TEXT,                    -- Detailed results (stored as a JSON string)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (org_id) REFERENCES organizations(id),
  FOREIGN KEY (repository_id) REFERENCES repositories(id)
);