"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityFunctions = exports.AuthFunctions = void 0;
const utils_1 = require("./utils");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const sql = require('mssql');
const bcrypt = require('bcrypt');
var AuthFunctions;
(function (AuthFunctions) {
    async function register(body) {
        if ((0, utils_1.validateUserData)(body, ['email', 'firstName', 'lastName', 'password'])) {
            const request = new sql.Request();
            const encriptedPasssword = await bcrypt.hash(body.password, 10);
            request.input('email', sql.VarChar(100), body.email);
            request.input('first_name', sql.VarChar(50), body.firstName);
            request.input('last_name', sql.VarChar(50), body.lastName);
            request.input('password', sql.VarChar(sql.max), encriptedPasssword);
            const result = await request.execute('usp_insert_User');
            if (result.returnValue && result.returnValue !== -1) {
                body.id = result.returnValue;
            }
            else if (result.returnValue) {
                body.id = -1;
            }
            else {
                return;
            }
        }
        else {
            throw new Error("Bad request");
        }
    }
    AuthFunctions.register = register;
    async function login(body) {
        if ((0, utils_1.validateUserData)(body, ['email', 'password'])) {
            const request = new sql.Request();
            request.input('email', sql.VarChar(100), body.email);
            const result = await request.execute('usp_get_User');
            if (result.recordset[0]) {
                const user = result.recordset[0];
                const compareResult = await bcrypt.compare(body.password, user.password);
                if (compareResult) {
                    delete user['password'];
                    return { user, token: jwt.sign({ id: user.id, fName: user.firstName, lName: user.lastName }, process.env.jwtSecret, { expiresIn: '72h' }) };
                }
            }
        }
        else {
            throw new Error("Bad request");
        }
    }
    AuthFunctions.login = login;
})(AuthFunctions = exports.AuthFunctions || (exports.AuthFunctions = {}));
var SecurityFunctions;
(function (SecurityFunctions) {
    async function getCurrentUser(ctx) {
        const request = new sql.Request();
        const { token, data } = (0, utils_1.getTokenAndData)(ctx.request.header);
        request.input('id', sql.VarChar(100), data.id);
        const result = await request.execute('usp_get_User');
        if (result.recordset[0]) {
            const user = result.recordset[0];
            delete user['password'];
            return { user, token };
        }
    }
    SecurityFunctions.getCurrentUser = getCurrentUser;
})(SecurityFunctions = exports.SecurityFunctions || (exports.SecurityFunctions = {}));
