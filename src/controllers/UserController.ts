import { Request, Response } from 'express';
import { CreateNewUser, GetUserByEmail } from '../validators/UserValidator.js';
import { addUser } from '../models/UserModel.js';
import { argon2 } from 'argon2';
import { parseDatabaseError } from '../utils/db-uitls.js';

async function createNewUser(req: Request, res: Response): Promise<void> {
  const result = CreateNewUser.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { email, password } = result.data;  

  try {
    const passwordHash = await argon2.hash(password);
    const newUser = await addUser(email, passwordHash);
    console.log(newUser);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);

  res.status(200).json({ user: createNewUser });
}
}

async function logIn(req: Request, res: Response): Promise<void> {
  const result = createNewUser.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { email, password } = result.data;

  try {
    const user = await GetUserByEmail(email);
    if (!user) {
      res.sendStatus(403);
      return;
    }

    const { passwordHash } = user;
    if (!(await argon2.verify(passwordHash, password))) {
      res.sendStatus(403);
      return;
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export{ createNewUser, LogIn };