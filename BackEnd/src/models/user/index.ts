import { IUser } from "../../auth/userModel";

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();
const sql = require('mssql');


export namespace UserFunctions {
    export async function get(body: IUser) {
        const request = new sql.Request();

        request.input('email', sql.VarChar(100), body.email);

        const result = await request.execute('usp_get_User');

        if (result.recordset[0]) {
            const user: IUser = result.recordset[0];
            delete user['password'];
            return { user, token: jwt.sign({ id: user.id, fName: user.firstName, lName: user.lastName }, process.env.jwtSecret, { expiresIn: '72h' }) };
        }
    }
}
