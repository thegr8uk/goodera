CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email_address text NOT NULL UNIQUE,
  password text NOT NULL,
  mobile_number text NOT NULL,
  role text NOT NULL,
  otp text NOT NULL,
  otp_generated_at text NOT NULL,
  active integer NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE job (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  active integer NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE userjob (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userid integer NOT NULL,
  jobid integer NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO job (company, location, description, active) VALUES 
('Goodera', 'Bangalore', 'Node JS Developer', 1);
INSERT INTO job (company, location, description, active) VALUES 
('Google', 'Bangalore', 'Java Developer', 1);
INSERT INTO job (company, location, description, active) VALUES 
('Amazon', 'Bangalore', 'Java Developer', 1);
INSERT INTO job (company, location, description, active) VALUES 
('Meta', 'UK', 'Java Developer', 1);
INSERT INTO job (company, location, description, active) VALUES 
('IBM', 'Bangalore', 'Python Developer', 1);
INSERT INTO job (company, location, description, active) VALUES 
('Google', 'Bangalore', 'Java Developer', 1);