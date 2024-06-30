import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    try {
        const query = 'INSERT INTO todos (user_id, title, description, done) VALUES ($1, $2, $3, false) RETURNING *;';
        const values = [userId, title, description];
        const res = await client.query(query, values);
        console.log('insertionSuccess', res);
        return res.rows[0]; // Return the inserted todo
    } catch (err) {
        console.log(err);
    }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    try {
        const query = 'UPDATE todos SET done = true WHERE id = $1 RETURNING *;';
        const values = [todoId];
        const res = await client.query(query, values);
        return res.rows[0]; // Return the updated todo
    } catch (err) {
        console.log(err);
    } finally {
    }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
    export async function getTodos(userId: number) {
        try {
            const query = 'SELECT * FROM todos WHERE user_id = $1;';
            const values = [userId];
            const res = await client.query(query, values);
            console.log('fetchSuccess', res);
            return res.rows; 
        } catch (err) {
            console.log(err);
        } finally {
        }
}