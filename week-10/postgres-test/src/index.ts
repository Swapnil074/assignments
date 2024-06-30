import { Client } from 'pg'
 
const client = new Client({
  connectionString:"postgresql://mailswapnil0074:uPztNK9Ym5rX@ep-purple-tooth-a5gcr4wz.us-east-2.aws.neon.tech/neondb?sslmode=require"
})

async function createUsersTable() {
    await client.connect()
    const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log(result)
}
async function insertData(){
    try {
        await client.connect() 
        const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username5', 'user5@example.com', 'user5_password');";
        const res = await client.query(insertQuery);
        console.log('Insertion success:', res); 
      } catch (err) {
        console.error('Error during the insertion:', err);
      } finally {
        await client.end();
      }
    }
    
    // insertData();

async function getUser(email: string){
    try{
        await client.connect()
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const res = await client.query(query, values);

        if(res.rows.length>0){
            console.log("user found: " ,res.rows[0])
            return res.rows[0]
        }else{
            console.log("no user found")
            return null
        }
}catch(err){
    console.log(err)
}finally{
    await client.end()
}
}
getUser("user3@example.com")