"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFunctions = void 0;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const sql = require('mssql');
var UserFunctions;
(function (UserFunctions) {
    async function get(body) {
        const request = new sql.Request();
        request.input('email', sql.VarChar(100), body.email);
        const result = await request.execute('usp_get_User');
        if (result.recordset[0]) {
            const user = result.recordset[0];
            delete user['password'];
            return { user, token: jwt.sign({ id: user.id, fName: user.firstName, lName: user.lastName }, process.env.jwtSecret, { expiresIn: '72h' }) };
        }
    }
    UserFunctions.get = get;
})(UserFunctions = exports.UserFunctions || (exports.UserFunctions = {}));
