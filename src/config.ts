import 'dotenv/config';
import { Session } from 'express-session';

const requiredEnvVars = ['PORT', 'COOKIE_SECRET'] as const;

for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    throw new Error(
      `${varName} is missing. Add it to your .env file.\n` +
        'Required variables: PORT, COOKIE_SECRET\n' +
        'See the Environment_Variables-Setup file on canvas for setup instructions.',
    );
  }
}

Session.prototype.clearSession = async function clearSession(): Promise<void> {
  return new Promise((resolve, reject) => {
    this.regenerate((err) => {
      if (err) reject(err);
      resolve();
    });
  });
};
