import { usersTable } from "../model/index.js";
import { db } from "../db/index.js";


export async function signUpUser(email, name, hashedPassword, salt) {
  try {
    const [user] = await db
      .insert(usersTable)
      .values({
        email,
        name,
        password: hashedPassword,
        salt,
      })
      .returning({ id: usersTable.id });

    return user;
  } catch (err) {
    console.error("DB Insert Error:", err); // 👈 log the exact reason
    throw err; // rethrow so signup route catches it
  }
}