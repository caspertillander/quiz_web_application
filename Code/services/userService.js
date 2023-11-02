import { sql } from "../database/database.js";

const addUser = async (email, password) => {
  await sql`INSERT INTO users
      (email, password)
        VALUES (${email}, ${password})`;
};

const findUserByEmail = async (email) => {
    const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
    return rows;
};

const isUserAdmin = async (userId) => {
  const rows = await sql`SELECT * FROM users WHERE id = ${userId}`;
  return rows[0].admin;
};

export { addUser , findUserByEmail, isUserAdmin };