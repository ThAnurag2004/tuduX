import {
  loginPostValidationBodySchema,
  signUpPostValidationBodySchema,
} from "../validation/request.validation.js";
import { getUserByEmail } from "../service/user.service.js";
import { createHashedPassword } from "../utils/hash.js";
import { signUpUser } from "../service/signup.service.js";
import { createUserToken } from "../utils/token.js";
import { usersTable } from "../model/user.model.js";
import { eq } from "drizzle-orm";
import {db} from '../db/index.js'

export const userSignup = async function (req, res) {
  try {
    const validationResult =
      await signUpPostValidationBodySchema.safeParseAsync(req.body);

    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error.format() });
    }

    const { name, email, password } = validationResult.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res
        .status(409)
        .json({ error: `User with email ${email} already exists` });
    }

    const { salt, password: hashedPassword } = createHashedPassword(password);

    const user = await signUpUser(email, name, hashedPassword, salt);

    return res.status(200).json({ data: { userId: user.id } });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const userLogin = async function (req, res) {
  const validationResult = await loginPostValidationBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { email, password } = validationResult.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return res
      .status(409)
      .json({ error: `User with email ${email} does not exists` });
  }

  const { password: hash } = await createHashedPassword(password, user.salt);

  if (user.password !== hash) {
    return res.status(409).json({ error: "Please enter correct password" });
  }

  const token = await createUserToken({ id: user.id });

  return res.json({ token });
};

export const getMe = async function (req, res) {
  try {
    
    const [user] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.id, req.user.id));

    console.log(user)

    if(!user){
      return res.status(404).json({message : 'User Not Found Please Login'})
    }

    return res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server error"});
  }
};
