"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://mailswapnil0074:uPztNK9Ym5rX@ep-purple-tooth-a5gcr4wz.us-east-2.aws.neon.tech/neondb?sslmode=require"
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log(result);
    });
}
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username5', 'user5@example.com', 'user5_password');";
            const res = yield client.query(insertQuery);
            console.log('Insertion success:', res);
        }
        catch (err) {
            console.error('Error during the insertion:', err);
        }
        finally {
            yield client.end();
        }
    });
}
// insertData();
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = 'SELECT * FROM users WHERE email = $1';
            const values = [email];
            const res = yield client.query(query, values);
            if (res.rows.length > 0) {
                console.log("user found: ", res.rows[0]);
                return res.rows[0];
            }
            else {
                console.log("no user found");
                return null;
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            yield client.end();
        }
    });
}
getUser("user3@example.com");
