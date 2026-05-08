import dotenv from 'dotenv';
dotenv.config();

import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';
import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';

const PostgresStore = connectPgSimple(session);

const pgPool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL_MODE === 'require' ? { rejectUnauthorized: false } : false,
});

const sessionStorage = new PostgresStore({
  createTableIfMissing: true,
  pool: pgPool,
});

const sessionMiddleware = session({
  store: sessionStorage,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    maxAge: 8 * 60 * 60 * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
  },
  name: 'session',
  resave: false,
  saveUninitialized: false,
});

export { sessionMiddleware };
