import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    try {
        const query = 'INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING *;';
        const values = [username, password, name];
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error creating user:', err);
        return null;
    }

}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    try {
        const query = 'SELECT * FROM users WHERE id = $1;';
        const values = [userId];
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error getting user:', err);
        return null;
    }

}
