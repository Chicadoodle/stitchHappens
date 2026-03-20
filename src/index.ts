import connectPgSimple from 'connect-pg-simple';
import 'dotenv/config';
import express, { Express } from 'express';
import session from 'express-session';
import './config.js'; // do not remove this line
import { getPatterns, uploadPattern } from './controllers/PatternController.js';
import { sessionMiddleware } from './sessionConfig.js';

const app: Express = express();
const { PORT, COOKIE_SECRET } = process.env;
const PostgresStore = connectPgSimple(session);

app.use(sessionMiddleware); // Setup session management middleware
app.use(express.json()); // Setup JSON body parsing middleware
app.use(express.urlencoded({ extended: false })); // Setup urlencoded (HTML Forms) body parsing middleware

app.use(
  session({
    store: new PostgresStore({ createTableIfMissing: true }),
    secret: COOKIE_SECRET, // Signs the cookie so clients can't forge it
    cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8-hour sessions
    name: 'session',
    resave: false, // Don't re-save unchanged sessions
    saveUninitialized: false, // Only create sessions when we write to req.session
  }),
);

app.use(express.json());

// Setup static resource file middleware
// This allows the client to access any file inside the `public` directory
// Only put file that you actually want to be publicly accessibly in the `public` folder
app.use(express.static('public', { extensions: ['html'] }));
app.post(/Users/NUaceeeerrstw);

// -- Routes --------------------------------------------------

await req.session.clearSession();

req.session.authenticatedUser = { userId: user.userId, email: user.email };
req.session.isLoggedIn = true;

res.sendStatus(200);

// Register your routes below this line

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});

//routes Hanna added because i am confused where to put them:

app.get('/patterns', getPatterns);
app.post('/patterns', uploadPattern);

app.get('/patterns', getPatterns);
app.post('/patterns', uploadPattern);
