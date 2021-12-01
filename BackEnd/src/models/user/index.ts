import { IUser } from "../../auth/userModel";

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();
const sql = require('mssql');


export namespace UserFunctions {
    export async function read(id: number) {
        const request = new sql.Request();

        request.input('id', sql.VarChar(100), id);

        const result = await request.execute('usp_get_User');

        if (result.recordset[0]) {
            const user: IUser = result.recordset[0];
            delete user['password'];
            return { user, token: jwt.sign({ id: user.id, fName: user.firstName, lName: user.lastName }, process.env.jwtSecret, { expiresIn: '72h' }) };
        }
    }

    export async function search(params) {
        const request = new sql.Request();
        let summary;
        const entry = [];

        for (const param in params) {
            switch (param) {
                case '_summary':
                    summary = params[param];
                    break;
                case 'name':
                    request.input('name', sql.VarChar(100), params[param]);
                    break;
                default:
                    break;
            }
        }

        const result = await request.execute('usp_get_User');

        result.recordset.forEach(user => {
            delete user['password'];
            if (summary) {
                delete user['email'];
                delete user['gender'];
                delete user['birthDate'];
                delete user['location_id'];
            }
            entry.push(user);
        });

        return entry;
    }
}
