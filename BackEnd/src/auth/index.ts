import { IUser } from "./user-model";
import { getTokenAndData, validateUserData } from "./utils";

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();
const sql = require('mssql');
const bcrypt = require('bcrypt')

export namespace AuthFunctions {
    export async function register(body: IUser) {
        if (validateUserData(body, ['email', 'firstName', 'lastName', 'password'])) {
            const request = new sql.Request();
            const encriptedPasssword = await bcrypt.hash(body.password, 10)

            request.input('email', sql.VarChar(100), body.email);
            request.input('first_name', sql.VarChar(50), body.firstName);
            request.input('last_name', sql.VarChar(50), body.lastName);
            request.input('password', sql.VarChar(sql.max), encriptedPasssword);

            const result = await request.execute('usp_insert_User');

            if (result.returnValue && result.returnValue !== -1) {
                body.id = result.returnValue;
            } else if (result.returnValue) {
                body.id = -1
            } else {
                return;
            }
        } else {
            throw new Error("Bad request");
        }

    }

    export async function login(body: IUser) {
        if (validateUserData(body, ['email', 'password'])) {
            const request = new sql.Request();

            request.input('email', sql.VarChar(100), body.email);

            const result = await request.execute('usp_get_User');

            if (result.recordset[0]) {
                const user: IUser = result.recordset[0];
                const compareResult = await bcrypt.compare(body.password, user.password)
                if (compareResult) {
                    delete user['password'];
                    return { user, token: jwt.sign({ id: user.id, fName: user.firstName, lName: user.lastName }, process.env.jwtSecret, { expiresIn: '72h' }) };
                }
            }
        } else {
            throw new Error("Bad request");
        }
    }
}

export namespace SecurityFunctions {
    export async function getCurrentUser(ctx: any) {
        const request = new sql.Request();
        const { token, data } = getTokenAndData(ctx.request.header);

        request.input('id', sql.VarChar(100), data.id);

        const result = await request.execute('usp_get_User');

        if (result.recordset[0]) {
            const user: IUser = result.recordset[0];
            delete user['password'];
            return { user, token };
        }
    }
}
