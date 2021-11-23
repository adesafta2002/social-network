"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToSqlServer = void 0;
const sql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();
async function connectToSqlServer() {
    const sqlConfig = {
        user: process.env.DB_Username,
        password: process.env.DB_Passowrd,
        database: process.env.DB_Name,
        server: process.env.DB_Server,
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    };
    console.log('Connecting to Database');
    try {
        await sql.connect(sqlConfig);
        console.log('Connected To Database');
    }
    catch (err) {
        console.log(err);
        console.log(`Connection To Database Failed. Error: ${err}`);
        setTimeout(() => {
            connectToSqlServer();
        }, 6000);
    }
}
exports.connectToSqlServer = connectToSqlServer;
